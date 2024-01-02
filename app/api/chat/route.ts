import { sleep } from "@/common/util";
import client from "@/lib/openai";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { messages, model } = (await request.json()) as MessageRequestBody;
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            // 接入Azure openAI 代码实现
            // const events = client.listChatCompletions(model, 
            //     [{role: 'system', content:"You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown."},...messages],
            //     { maxTokens: 1024 });
            // for await (const event of events) {
            //     for (const choice of event.choices) {
            //         const delta = choice.delta?.content;
            //         if (delta) {
            //             console.log(`Chatbot: ${delta}`);
            //             controller.enqueue(encoder.encode(delta))
            //         }
            //     }
            // }
            // controller.close();

            // 模拟代码实现
            const messageText = messages[messages.length -1].content;
            for (let i = 0; i < messageText.length; i++) {
                await sleep(100)
                controller.enqueue(encoder.encode(messageText[i]))
            }
            controller.close();
        }
    });
    return new Response(stream)
}