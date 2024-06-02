import { OpenAIStream, StreamingTextResponse, convertToCoreMessages, streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';
import { getPrecipationMap, getImages } from '@/components/tools';
import { z } from 'zod';

export async function POST(req: Request) {
    const { messages, model, provider } = await req.json()

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
                })
            },
        });

        return result.toAIStreamResponse();
    } else if (provider === 'groq') {
        const groq = createOpenAI({
            baseURL: 'https://api.groq.com/openai/v1',
            apiKey: process.env.GROQ_CLOUD_API_KEY,
        });

        const result = await streamText({
            model: groq(model),
            messages: convertToCoreMessages(messages)
        });

        return result.toAIStreamResponse();
    } else {
        return new Response('Invalid provider', { status: 400 });
    }
}