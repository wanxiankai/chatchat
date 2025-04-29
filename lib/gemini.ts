import { GoogleGenAI } from "@google/genai"; // Correct package based on latest docs

const geminiai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    timeout: 60000 // 添加60秒超时
});

export default geminiai;