import { OpenAIStream, StreamingTextResponse, convertToCoreMessages, streamText, tool, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';
import { getPrecipationMap, getImages, getVideos, getNews } from '@/components/tools';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { get } from 'http';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

export async function POST(req: Request) {
    const { messages, model, provider } = await req.json()
    const lastMessage = messages[messages.length - 1];
    messages.forEach((message, index) => {
        if (message.toolInvocations && index !== messages.length - 1) {
            delete message.toolInvocations;
        }
    });

    

    if (provider === 'openai') {
        const result = await streamText({
            model: openai(model),
            messages: convertToCoreMessages(messages),
            system: "use follow up questions on every message to keep the conversation going.",
            tools: {
                precipationMap: tool({
                    description: "Get the current precipitation map",
                    parameters: z.object({}),
                    execute: async () => {
                        return await getPrecipationMap();
                    }
                }),
                images: tool({
                    description: "Get any images from pexels, but dont search for any rude terms",
                    parameters: z.object({ query: z.string() }),
                    execute: async (params) => {
                        return await getImages(params.query);
                    }
                }),
                videos: tool({
                    description: "Get any videos from pexels, but dont search for any rude terms",
                    parameters: z.object({ query: z.string() }),
                    execute: async (params) => {
                        return await getVideos(params.query);
                    }
                }),
                searchNews: tool({
                    description: "Search News Search and filter news by text, date, location, language, and more.The API returns a list of news articles matching the given criteria.You can set as many filtering parameters as you like, but you have to set at least one, e.g.text or language.",
                    parameters: z.object({
                        query: z.string().describe("The text to match in the news content (at least 3 characters). By default all query terms are expected, you can use an uppercase OR to search for any terms, e.g. tesla OR ford"),
                        source_country: z.string().optional().describe("A comma-separated list of ISO 3166 country codes from which the news should originate."),
                        language: z.string().describe("The ISO 6391 language code of the news."),
                        from: z.string().optional().describe("Date to search from in YYYY-MM-DD format"),
                        to: z.string().optional().describe("Date to search to in YYYY-MM-DD format"),
                        news_sources: z.array(z.string()).optional().describe("A comma-separated list of news sources from which the news should originate."),
                        authors: z.array(z.string()).optional().describe("A comma-separated list of author names. Only news from any of the given authors will be returned."),
                        entities: z.array(z.string()).optional().describe("A comma-separated list of entities to search for in the news content. Only news containing any of the given entities will be returned, f.e. to get Location Ireland, you can use LOC:Ireland, or to get Organization Apple, you can use ORG:Apple, or to get Person Elon Musk, you can use PER:Elon Musk"),
                        number: z.number().optional().default(5).describe("The number of news to return in range [1,100]"),
                    }),
                    execute: async (params) => {
                        return await getNews(params);
                    }
                })
            },
        });

        return result.toAIStreamResponse();
    } else if (provider === 'groq') {
        const groq = createOpenAI({
            baseURL: 'https://api.groq.com/openai/v1',
            apiKey: process.env.GROQ_CLOUD_API_KEY
        });

        const result = await streamText({
            model: groq(model),
            messages: convertToCoreMessages(messages),
            tools: {
                precipationMap: tool({
                    description: "Get the current precipitation map",
                    parameters: z.object({}),
                    execute: async () => {
                        return await getPrecipationMap();
                    }
                }),
                images: tool({
                    description: "Get any images from pexels, but dont search for any rude terms",
                    parameters: z.object({ query: z.string() }),
                    execute: async (params) => {
                        return await getImages(params.query);
                    }
                }),
                videos: tool({
                    description: "Get any videos from pexels, but dont search for any rude terms",
                    parameters: z.object({ query: z.string() }),
                    execute: async (params) => {
                        return await getVideos(params.query);
                    }
                }),
                searchNews: tool({
                    description: "Search News Search and filter news by text, date, location, language, and more.The API returns a list of news articles matching the given criteria.You can set as many filtering parameters as you like, but you have to set at least one, e.g.text or language.",
                    parameters: z.object({
                        query: z.string().describe("The text to match in the news content (at least 3 characters). By default all query terms are expected, you can use an uppercase OR to search for any terms, e.g. tesla OR ford"),
                        source_country: z.string().optional().describe("A comma-separated list of ISO 3166 country codes from which the news should originate."),
                        language: z.string().describe("The ISO 6391 language code of the news."),
                        from: z.string().optional().describe("Date to search from in YYYY-MM-DD format"),
                        to: z.string().optional().describe("Date to search to in YYYY-MM-DD format"),
                        news_sources: z.array(z.string()).optional().describe("A comma-separated list of news sources from which the news should originate."),
                        authors: z.array(z.string()).optional().describe("A comma-separated list of author names. Only news from any of the given authors will be returned."),
                        entities: z.array(z.string()).optional().describe("A comma-separated list of entities to search for in the news content. Only news containing any of the given entities will be returned, f.e. to get Location Ireland, you can use LOC:Ireland, or to get Organization Apple, you can use ORG:Apple, or to get Person Elon Musk, you can use PER:Elon Musk"),
                        number: z.number().optional().default(5).describe("The number of news to return in range [1,100]"),
                    }),
                    execute: async (params) => {
                        return await getNews(params);
                    }
                }),
                displayNewsArticles: tool({
                    description: "Display news articles in a card format",
                    parameters: z.array(z.string()).describe("The news articles to site in a card format"),
                    execute: async (params) => {
                        return params;
                    }
                }),
            },
        });

        return result.toAIStreamResponse();
    } else {
        return new Response('Invalid provider', { status: 400 });
    }
}