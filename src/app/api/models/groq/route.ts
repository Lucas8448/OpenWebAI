export async function GET() {
    try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/models', {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_CLOUD_API_KEY}`,
            },
        });

        if (!groqResponse.ok) {
            throw new Error('Failed to fetch data from Groq API');
        }

        const data = await groqResponse.json();
        return Response.json(data)

    } catch (error) {
        console.error(error);
        return Response.error();
    }
}