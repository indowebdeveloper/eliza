import {
    cleanJsonResponse,
    composeContext,
    elizaLogger,
    embed,
    extractAttributes,
    generateText,
    ModelClass,
    parseJSONObjectFromText,
    Service,
    ServiceType,
    stringToUuid,
    truncateToCompleteSentence,
    type IAgentRuntime,
} from "@elizaos/core";
import { Profile, Scraper } from "agent-twitter-client";
import { twitterPostTemplate } from "../templates/tweets";
import { ChainCatcherResponse, fetchChainCatcher } from "../utils/chainCatcher";
export const DEFAULT_MAX_TWEET_LENGTH = 280;

// import { sampleProvider } from "../providers/sampleProvider"; // TODO: Uncomment this line to use the sampleProvider

// declare module "@elizaos/core" {
//     export enum ServiceType {
//         NEOCORTEX_NEWS_FEED = "neocortex_news_feed",
//     }
// }
// The SampleService is a simple service that logs "Hello world" every 15 minutes.
export class NewsPullerService extends Service {
    private runtime: IAgentRuntime | null = null;
    private intervalId: NodeJS.Timeout | null = null;
    private intervalIds: { id: string; timeout: NodeJS.Timeout }[] = [];
    private tasksCount: { id: string; count: number }[] = [];
    private NEWS_POST_LIMIT;
    private DEFAULT_INTERVAL = 60 * 60 * 1000; // 1hr / 60 minutes
    private twitterClient: { id: string; client: any }[] = [];
    private me: Profile;
    private profiles: {
        id: string;
        me: Profile;
    }[] = [];
    private processingNews = false;

    static get serviceType(): ServiceType {
        return ServiceType.NEOCORTEX_NEWS_FEED;
    }

    private static isInitialized = false;

    async initialize(runtime: IAgentRuntime): Promise<void> {
        // Verify if the service is already initialized
        // if (NewsPullerService.isInitialized) {
        //     return;
        // }
        const intv = Number(runtime.getSetting("NEWS_PULLER_INTERVAL"));
        this.NEWS_POST_LIMIT = Number(
            runtime.getSetting("NEWS_POST_LIMIT") || 3
        );
        this.DEFAULT_INTERVAL = (intv ? intv : 60) * 60 * 1000;
        this.runtime = runtime;
        // init twitter
        await this.twitterLogin();
        // Start the periodic task
        await this.startPeriodicTask();
        //NewsPullerService.isInitialized = true;
        console.log(
            `NewsPullerService : initialized and started periodic task (interval: ${this.DEFAULT_INTERVAL} ms || ${intv})`
        );
    }

    private static activeTaskCount = 0;

    private async startPeriodicTask(): Promise<void> {
        // Verify if a task is already active
        //if (NewsPullerService.activeTaskCount > 0) {
        const taskCountIdx = this.tasksCount.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        const intervalIdsIdx = this.intervalIds.findIndex(
            (item) => item.id === this.runtime.agentId
        );

        const taskCount = this.tasksCount[taskCountIdx];
        const intervalId = this.intervalIds[intervalIdsIdx];
        if (taskCount?.count > 0) {
            console.log(
                "NewsPullerService: Periodic task already running, skipping"
            );
            return;
        }

        // Clear any existing interval
        if (intervalId?.timeout) {
            clearInterval(intervalId?.timeout);
        }

        //NewsPullerService.activeTaskCount++;
        this.tasksCount.push({
            id: this.runtime.agentId,
            count: 1,
        });
        console.log(
            `NewsService: Starting periodic task (active tasks for: ${this.runtime.agentId})`
        );

        // Initial call immediately
        await this.fetchSample();

        // Set up periodic calls
        const inter = setInterval(async () => {
            await this.fetchSample();
        }, this.DEFAULT_INTERVAL);
        this.intervalIds.push({
            id: this.runtime.agentId,
            timeout: inter,
        });
    }

    private async twitterLogin() {
        // saved client
        const tClient = this.twitterClient.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        if (tClient) {
            return;
        }
        // initiate the twitter login
        const twitterClient =
            this.runtime.clients?.twitter?.client?.twitterClient;
        this.twitterClient.push({
            id: this.runtime.agentId,
            client: twitterClient || new Scraper(),
        });
        const tcIndex = this.twitterClient.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        let retries = 3;
        console.log(
            `NEWS|LOGGING IN TWITTER CLIENT: ${this.runtime.getSetting(
                "TWITTER_USERNAME"
            )}`
        );
        if (!twitterClient) {
            const username = this.runtime.getSetting("TWITTER_USERNAME");
            const password = this.runtime.getSetting("TWITTER_PASSWORD");
            const email = this.runtime.getSetting("TWITTER_EMAIL");
            const twitter2faSecret =
                this.runtime.getSetting("TWITTER_2FA_SECRET");

            if (!username || !password) {
                elizaLogger.error(
                    "Twitter credentials not configured in environment"
                );
                return false;
            }

            const cachedCookies = await this.getCachedCookies(username);
            if (cachedCookies) {
                elizaLogger.info("Using cached cookies");
                await this.setCookiesFromArray(cachedCookies);
            }
            // Login with credentials
            // await this.twitterClient.login(
            //     username,
            //     password,
            //     email,
            //     twitter2faSecret
            // );
            // if (!(await this.twitterClient.isLoggedIn())) {
            //     elizaLogger.error("Failed to login to Twitter");
            //     return false;
            // }

            while (retries > 0) {
                try {
                    if (
                        await this.twitterClient[tcIndex]?.client?.isLoggedIn()
                    ) {
                        // cookies are valid, no login required
                        elizaLogger.info("Successfully logged in.");
                        break;
                    } else {
                        await this.twitterClient[tcIndex]?.client?.login(
                            username,
                            password,
                            email,
                            twitter2faSecret
                        );
                        if (
                            await this.twitterClient[
                                tcIndex
                            ]?.client?.isLoggedIn()
                        ) {
                            // fresh login, store new cookies
                            elizaLogger.info("Successfully logged in.");
                            elizaLogger.info("Caching cookies");
                            await this.cacheCookies(
                                username,
                                await this.twitterClient[
                                    tcIndex
                                ]?.client?.getCookies()
                            );
                            break;
                        }
                    }
                } catch (error) {
                    elizaLogger.error(`Login attempt failed: ${error.message}`);
                }

                retries--;
                elizaLogger.error(
                    `Failed to login to Twitter. Retrying... (${retries} attempts left)`
                );

                if (retries === 0) {
                    elizaLogger.error(
                        "Max retries reached. Exiting login process."
                    );
                    throw new Error(
                        "Twitter login failed after maximum retries."
                    );
                }

                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
            //this.me = await this.twitterClient[tcIndex]?.client?.me();
            const me = await this.twitterClient[tcIndex]?.client?.me();
            this.profiles.push({
                id: this.runtime.agentId,
                me,
            });
        } else {
            console.log(
                `TWITTER CLIENT ALREADY INITIALIZED, cant login ${this.runtime.getSetting(
                    "TWITTER_USERNAME"
                )}`
            );
        }
    }
    private async fetchSample(): Promise<void> {
        if (!this.runtime) {
            console.log("NewsPullerService: Runtime not initialized");
            return;
        }
        // if (this.processingNews) {
        //     console.log("NewsPullerService: Already processing news");
        // }
        //this.processingNews = true;

        try {
            // fetch several times
            const chainCatcher: ChainCatcherResponse =
                await fetchChainCatcher();
            const cacheManager = this.runtime.cacheManager;
            //const articles: ChainCatcherItem[] = [];
            let tweetId;
            let tempNews = "";
            let count = 0;
            let ittr = 0;

            for (const article of chainCatcher.data.list) {
                const cached = await cacheManager.get(
                    `cryptoNews_${stringToUuid(this.runtime.character.name)}_${
                        article.id
                    }`
                );
                if (!cached) {
                    // new acrticle
                    // console.log(
                    //     `NEW ARTICLE : ${article.title} # ${article.id}`
                    // );
                    // means it's not cached, then we push it to the articles
                    //articles.push(article);
                    // cache it
                    await cacheManager.set(
                        `cryptoNews_${stringToUuid(
                            this.runtime.character.name
                        )}_${article.id}`,
                        article
                    );
                    const embedding = await embed(
                        this.runtime,
                        article.description
                    );
                    //console.log("embedding", embedding);
                    // put the news to knowledge as well

                    await this.runtime.ragKnowledgeManager.createKnowledge({
                        id: stringToUuid(
                            `cryptoNews_${stringToUuid(
                                this.runtime.character.name
                            )}_${article.id}`
                        ),
                        agentId: this.runtime.agentId,
                        content: {
                            text: article.description,
                            metadata: {
                                isMain: true,
                                isShared: true,
                            },
                        },
                        embedding: new Float32Array(embedding),
                    });

                    // combine news
                    tempNews += `- ${article.title}\n${article.description}\nTime: ${article.releaseTime}\n\n`;
                    count++;
                    // post the tweet
                    if (
                        (count === 2 ||
                            article.id ===
                                chainCatcher.data.list[
                                    chainCatcher.data.list.length - 1
                                ].id) &&
                        ittr < this.NEWS_POST_LIMIT
                    ) {
                        const tweetR = await this.generateTweet(
                            article.description,
                            tweetId
                        );
                        if (tweetR.success) {
                            tweetId = tweetR.id;
                        }
                        tempNews = "";
                        count = 0;
                        ittr++;
                    }
                } else {
                    console.log(
                        `ARTICLE ${article.id} is already cached, skipping`
                    );
                }
            }
            this.processingNews = false;

            // const cryptoNews: SerperNewsResponse =
            //     await fetchSerperNews("crypto");
            // const suiNews: SerperNewsResponse = await fetchSerperNews("$SUI");
            // if (articles.length > 0) {
            //     output = `# NEWS for ${this.runtime.character.name}\n\n`;
            //     // output += `The News have this format:\n\n`;
            //     // output += `
            //     // - Title <--- Title of the news\n
            //     // Description <--- Content of the news\n
            //     // Timestamp <--- the time of the news\n\n
            //     // `;

            //     articles.forEach((article) => {
            //         output += `- ${article.title}\n${article.description}\nTime: ${article.releaseTime}\n\n`;
            //     });

            //     // cryptoNews.news.forEach((article) => {
            //     //     output += `- ${article.title}\n${article.snippet}\n\n`;
            //     // });
            //     // suiNews.news.forEach((article) => {
            //     //     output += `- ${article.title}\n${article.snippet}\n\n`;
            //     // });
            //     output += `# ADDITIONAL_NOTES: if there's any decimal numbers you should convert the decimal separator into comma instead of dot\n\n# END NEWS\n\n`;
            // }

            // elizaLogger.log(output);

            // return output;
        } catch (error) {
            console.error("Error in fetching news provider:", error);
            this.processingNews = false;
            return;
        }

        // try {
        //     // Example of using the sampleProvider
        //     // Create dummy memory and state objects for the provider
        //     // const dummyMemory: Memory = {
        //     //     id: stringToUuid("sample-service-trigger"),
        //     //     userId: this.runtime.agentId,
        //     //     agentId: this.runtime.agentId,
        //     //     roomId: this.runtime.agentId,
        //     //     content: { text: "Periodic sample fetch" },
        //     //     createdAt: Date.now(),
        //     // };

        //     // const dummyState: State = {
        //     //     userId: this.runtime.agentId,
        //     //     bio: "",
        //     //     lore: "",
        //     //     messageDirections: "",
        //     //     postDirections: "",
        //     //     roomId: this.runtime.agentId,
        //     //     actors: "",
        //     //     recentMessages: "",
        //     //     recentMessagesData: [],
        //     // };
        //     // await sampleProvider.get(this.runtime, dummyMemory, dummyState);

        //     // hello world log example
        //     console.log("SampleService: Hello world");

        //     console.log(
        //         "SampleService: Successfully fetched and processed sample"
        //     );
        // } catch (error) {
        //     console.log("SampleService: Error fetching sample:", error);
        // }
    }

    private async generateTweet(text: any, tweetId?: string) {
        elizaLogger.log("NewsPuller : Generating tweet");
        const profileIdx = this.profiles.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        const profile = this.profiles[profileIdx].me;
        console.log("DEBUG PROFILE: ", profile);

        if (!this.runtime) {
            console.log("NewsPullerService: Twitter Runtime not initialized");
            return;
        }

        //console.log("NewsPullerService: Twitter client", twitterClient);
        try {
            const roomId = stringToUuid(
                "twitter_generate_room-" + profile.username
            );
            await this.runtime.ensureUserExists(
                this.runtime.agentId,
                profile.username,
                this.runtime.character.name,
                "twitter"
            );

            const maxTweetLength = Number(DEFAULT_MAX_TWEET_LENGTH);
            const state = await this.runtime.composeState(
                {
                    userId: this.runtime.agentId,
                    roomId: roomId,
                    agentId: this.runtime.agentId,
                    content: {
                        text: "",
                    },
                },
                {
                    twitterUserName: profile.username,
                    maxTweetLength,
                    news: text,
                }
            );

            const context = composeContext({
                state,
                template: twitterPostTemplate,
            });
            // console.log("PROMPT", context);
            //elizaLogger.debug("generate post prompt:\n" + context);

            const response = await generateText({
                runtime: this.runtime,
                context,
                modelClass: ModelClass.MEDIUM,
            });

            const rawTweetContent = cleanJsonResponse(response);

            // First attempt to clean content
            let tweetTextForPosting = null;
            let mediaData = null;

            // Try parsing as JSON first
            const parsedResponse = parseJSONObjectFromText(rawTweetContent);
            if (parsedResponse?.text) {
                tweetTextForPosting = parsedResponse.text;
            }

            // if (
            //     parsedResponse?.attachments &&
            //     parsedResponse?.attachments.length > 0
            // ) {
            //     mediaData = await fetchMediaData(parsedResponse.attachments);
            // }

            // Try extracting text attribute
            if (!tweetTextForPosting) {
                const parsingText = extractAttributes(rawTweetContent, [
                    "text",
                ]).text;
                if (parsingText) {
                    tweetTextForPosting = truncateToCompleteSentence(
                        extractAttributes(rawTweetContent, ["text"]).text,
                        maxTweetLength
                    );
                }
            }

            // Use the raw text
            if (!tweetTextForPosting) {
                tweetTextForPosting = rawTweetContent;
            }

            // Truncate the content to the maximum tweet length specified in the environment settings, ensuring the truncation respects sentence boundaries.
            if (maxTweetLength) {
                tweetTextForPosting = truncateToCompleteSentence(
                    tweetTextForPosting,
                    maxTweetLength
                );
            }

            const removeQuotes = (str: string) =>
                str.replace(/^['"](.*)['"]$/, "$1");

            const fixNewLines = (str: string) => str.replaceAll(/\\n/g, "\n\n"); //ensures double spaces

            // Final cleaning
            tweetTextForPosting = removeQuotes(
                fixNewLines(tweetTextForPosting)
            );

            try {
                console.log(
                    `NEWS PULLER: would have posted tweet: ${tweetTextForPosting} | Length: ${tweetTextForPosting.length}`
                );
                return await this.postTweet(tweetTextForPosting, tweetId); // return the tweet ID
            } catch (err) {
                console.error("NEWS_PULLER: ERROR posting tweet:", err);
            }
            return;
            // if (this.isDryRun) {
            //     elizaLogger.info(
            //         `Dry run: would have posted tweet: ${tweetTextForPosting}`
            //     );
            //     return;
            // }

            // try {
            //     if (this.approvalRequired) {
            //         // Send for approval instead of posting directly
            //         elizaLogger.log(
            //             `Sending Tweet For Approval:\n ${tweetTextForPosting}`
            //         );
            //         await this.sendForApproval(
            //             tweetTextForPosting,
            //             roomId,
            //             rawTweetContent
            //         );
            //         elizaLogger.log("Tweet sent for approval");
            //     } else {
            //         elizaLogger.log(
            //             `Posting new tweet:\n ${tweetTextForPosting}`
            //         );
            //         this.postTweet(
            //             this.runtime,
            //             this.client,
            //             tweetTextForPosting,
            //             roomId,
            //             rawTweetContent,
            //             this.twitterUsername,
            //             mediaData
            //         );
            //     }
            // } catch (error) {
            //     elizaLogger.error("Error sending tweet:", error);
            // }
        } catch (error) {
            console.error("NEWS_PULLER: ERROR generating new tweet:", error);
        }
    }

    private async postTweet(
        content: string,
        tweetId: string
    ): Promise<{ success: boolean; id: string }> {
        try {
            // Send the tweet
            elizaLogger.log("Attempting to send tweet:", content);
            const tcIndex = this.twitterClient.findIndex(
                (item) => item.id === this.runtime.agentId
            );
            try {
                if (content.length > DEFAULT_MAX_TWEET_LENGTH) {
                    const noteTweetResult = await this.twitterClient[
                        tcIndex
                    ]?.client?.sendNoteTweet(content, tweetId);
                    if (
                        noteTweetResult.errors &&
                        noteTweetResult.errors.length > 0
                    ) {
                        // Note Tweet failed due to authorization. Falling back to standard Tweet.
                        return await this.sendTweet(content, tweetId);
                    }
                    return {
                        success: true,
                        id: noteTweetResult?.data?.notetweet_create
                            ?.tweet_results?.result?.rest_id,
                    }; // return the ID of the tweet
                }
                return await this.sendTweet(content, tweetId);
            } catch (error) {
                throw new Error(`Note Tweet failed: ${error}`);
            }
        } catch (error) {
            // Log the full error details
            elizaLogger.error("Error posting tweet:", {
                message: error.message,
                stack: error.stack,
                name: error.name,
                cause: error.cause,
            });
            return {
                success: false,
                id: null,
            };
        }
    }

    private async sendTweet(content: string, tweetId: string | null) {
        const tcIndex = this.twitterClient.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        const result = await this.twitterClient[tcIndex]?.client?.sendTweet(
            content,
            tweetId
        );

        const body = await result.json();
        //console.dir(body, { depth: null, colors: true });

        // Check for Twitter API errors
        if (body.errors) {
            const error = body.errors[0];
            elizaLogger.error(
                `Twitter API error (${error.code}): ${error.message}`
            );
            return {
                success: false,
                id: null,
            };
        }

        // Check for successful tweet creation
        if (!body?.data?.create_tweet?.tweet_results?.result) {
            elizaLogger.error(
                "Failed to post tweet: No tweet result in response"
            );
            return {
                success: false,
                id: null,
            };
        }
        return {
            success: true,
            id: body?.data?.create_tweet?.tweet_results?.result?.rest_id,
        }; // return the ID of the tweet
        //return body?.data?.create_tweet?.tweet_results?.result?.rest_id; // returns the ID of the tweet
        //return true;
    }

    async getCachedCookies(username: string) {
        return await this.runtime.cacheManager.get<any[]>(
            `twitter/${username}/cookies`
        );
    }

    async cacheCookies(username: string, cookies: any[]) {
        await this.runtime.cacheManager.set(
            `twitter/${username}/cookies`,
            cookies
        );
    }

    async setCookiesFromArray(cookiesArray: any[]) {
        const cookieStrings = cookiesArray.map(
            (cookie) =>
                `${cookie.key}=${cookie.value}; Domain=${cookie.domain}; Path=${
                    cookie.path
                }; ${cookie.secure ? "Secure" : ""}; ${
                    cookie.httpOnly ? "HttpOnly" : ""
                }; SameSite=${cookie.sameSite || "Lax"}`
        );
        const tcIndex = this.twitterClient.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        await this.twitterClient[tcIndex]?.client?.setCookies(cookieStrings);
    }

    // Method to stop the service
    stop(): void {
        const intervalIdsIdx = this.intervalIds.findIndex(
            (item) => item.id === this.runtime.agentId
        );
        const taskCountIdx = this.tasksCount.findIndex(
            (item) => item.id == this.runtime.agentId
        );
        const intervalId = this.intervalIds[intervalIdsIdx];
        //const taskCount = this.tasksCount[taskCountIdx];
        if (intervalId?.timeout) {
            clearInterval(intervalId?.timeout);
            //this.intervalId = null;
            this.intervalIds.splice(intervalIdsIdx, 1);
            this.tasksCount.splice(taskCountIdx, 1);
            //NewsPullerService.activeTaskCount--;
            console.log(
                `NewsPullerService stopped for agent: ${this.runtime.agentId}`
            );
        }
        //NewsPullerService.isInitialized = false;
    }

    // Method to manually trigger a sample fetch (for testing)
    async forceFetch(): Promise<void> {
        await this.fetchSample();
    }
}

export default NewsPullerService;
