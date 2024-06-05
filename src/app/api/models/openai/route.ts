"use server";

export async function GET() {
    try {
        const data = [
            {
                "id": "gpt-4o",
                "provider": "openai",
                "name": "GPT-4o",
                "capabilities": {
                    "image_input": true,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": true,
                }
            },
            {
                "id": "gpt-4-turbo",
                "provider": "openai",
                "name": "GPT-4 Turbo",
                "capabilities": {
                    "image_input": true,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": true,
                }
            },
            {
                "id": "gpt-4",
                "provider": "openai",
                "name": "GPT-4",
                "capabilities": {
                    "image_input": false,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": true,
                }
            },
            {
                "id": "gpt-3.5-turbo",
                "provider": "openai",
                "name": "GPT-3.5 Turbo",
                "capabilities": {
                    "image_input": false,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": true,
                }
            }
        ]

        return Response.json(data)

    } catch (error) {
        console.error(error);
        return Response.error();
    }
}