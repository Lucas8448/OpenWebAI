import { OpenAIStream, StreamingTextResponse, convertToCoreMessages, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';

export async function POST(req: Request) {
    const { messages, model, provider } = await req.json()

    if (provider === 'openai') {
        const result = await streamText({
            model: openai(model),
            messages: convertToCoreMessages(messages)
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