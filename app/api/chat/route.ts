import geminiai from "@/lib/gemini";
import openaiClient from "@/lib/openai";
import { Message, MessageRequestBody } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

// Define an interface for the structure of model-specific logic
interface ModelStreamer {
    formatMessages: (messages: Message[]) => any;
    callApi: (formattedMessages: any, model: string) => Promise<AsyncIterable<any>>;
    extractText: (chunk: any) => string | null | undefined;
}

// Map model names to their specific streaming logic implementations
const modelStreamers: Record<string, ModelStreamer> = {
    'gemini-2.0-flash': {
        formatMessages: (messages) => messages.map(message => ({
            role: message.role === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }]
        })),
        callApi: async (formattedMessages, model) => {
            const response = await geminiai.models.generateContentStream({
                model,
                contents: formattedMessages,
            });
            // The Gemini SDK already returns an AsyncIterable compatible stream
            return response; 
        },
        extractText: (chunk) => chunk.text // Gemini chunk structure
    },
    'grok-2-vision-1212': {
        formatMessages: (messages) => messages.map(message => ({
            role: message.role,
            content: message.content,
        })),
        callApi: async (formattedMessages, model) => {
            const completion = await openaiClient.chat.completions.create({
                model,
                messages: formattedMessages,
                stream: true,
                temperature: 0.7,
            });
            // The OpenAI SDK returns an AsyncIterable stream
            return completion;
        },
        extractText: (chunk) => chunk.choices?.[0]?.delta?.content // OpenAI chunk structure
    },
    // Add configurations for other models here in the future
    // 'another-model': { ... } 
};

export async function POST(request: NextRequest) {
    const { messages, model } = (await request.json()) as MessageRequestBody;
    const encoder = new TextEncoder();

    // Find the appropriate streamer configuration for the requested model
    const streamer = modelStreamers[model];

    if (!streamer) {
        return NextResponse.json({ error: `Model ${model} not supported.` }, { status: 400 });
    }

    try {
        // Format messages using the model-specific function
        const formattedMessages = streamer.formatMessages(messages);

        // Create a readable stream
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // Call the appropriate API using the model-specific function
                    const apiResponseStream = await streamer.callApi(formattedMessages, model);

                    // Process each chunk as it arrives
                    for await (const chunk of apiResponseStream) {
                        // Extract text using the model-specific function
                        const text = streamer.extractText(chunk);
                        if (text) {
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                    // Close the stream when done
                    controller.close();
                } catch (error) {
                    console.error(`Error streaming from model ${model}:`, error);
                    controller.error(error); // Propagate the error to the stream
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

    } catch (error) {
        console.error("Error processing chat request:", error);
        return NextResponse.json({ error: "Internal server error processing chat request." }, { status: 500 });
    }
}