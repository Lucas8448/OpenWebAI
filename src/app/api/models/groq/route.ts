"use server";

export async function GET() {
    try {
        const data = [
            {
                "id": "llama3-8b-8192",
                "provider": "groq",
                "name": "Llama3-8B",
                "capabilities": {
                    "image_input": false,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": false,
                }
            },
            {
                "id": "llama3-70b-8192",
                "provider": "groq",
                "name": "Llama3-70B",
                "capabilities": {
                    "image_input": false,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": false,
                }
            },
            {
                "id": "mixtral-8x7b-32768",
                "provider": "groq",
                "name": "Mixtral-8x7B",
                "capabilities": {
                    "image_input": false,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": false,
                }
            },
            {
                "id": "gemma-7b-it",
                "provider": "groq",
                "name": "Gemma-7B-IT",
                "capabilities": {
                    "image_input": false,
                    "object_generation": true,
                    "tool_usage": true,
                    "tool_streaming": false,
                }
            }
        ]

        return Response.json(data)

    } catch (error) {
        console.error(error);
        return Response.error();
    }
}