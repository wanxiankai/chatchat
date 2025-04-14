import geminiai from "@/lib/gemini";

import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { messages, model } = (await request.json()) as MessageRequestBody;
    const encoder = new TextEncoder();
    
    // Convert messages array to Gemini format
    const geminiMessages = messages.map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{text: message.content}]
    }));
    
    // Create a readable stream that will receive chunks from Gemini API
    const stream = new ReadableStream({
        async start(controller) {
            try {
                // Start the streaming request to Gemini
                const response = await geminiai.models.generateContentStream({
                    model: "gemini-2.0-flash",
                    contents: geminiMessages,
                });
                
                // Process each chunk as it arrives
                for await (const chunk of response) {
                    if (chunk.text) {
                        controller.enqueue(encoder.encode(chunk.text));
                    }
                }
                
                // Close the stream when done
                controller.close();
            } catch (error) {
                console.error("Error streaming from Gemini:", error);
                controller.error(error);
            }
        }
    });
    
    // Return the stream as the response
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}