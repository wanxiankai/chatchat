import OpenAI from "openai";

const openaiClient = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: process.env.GROK_BASE_URL
});

export default openaiClient;