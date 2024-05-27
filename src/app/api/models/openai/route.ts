export async function GET() {
    try {
        const openaiResponse = await fetch('https://api.openai.com/v1/engines', {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        if (!openaiResponse.ok) {
            throw new Error();
        }

        const data = await openaiResponse.json();
        return Response.json(data)
    } catch (error) {
        console.error(error);
        return Response.error();
    }
}