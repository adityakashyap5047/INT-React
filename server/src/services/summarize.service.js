import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeText = async (text) => {
    if (!text || text.length < 50) {
        const error = new Error("Extracted text is too short to summarize.");
        error.statusCode = 400;
        throw error;
    }

    const prompt = `
        You are a helpful assistant.
        Summarize the following webpage content into:
            - 6 to 10 bullet points
            - simple English
            - include key ideas only
            - no unnecessary filler

        CONTENT:
            ${text}
    `;

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
        { role: "system", content: "You summarize website content clearly." },
        { role: "user", content: prompt },
        ],
        temperature: 0.4,
    });

    return response.choices?.[0]?.message?.content?.trim() || "No summary generated.";
};
