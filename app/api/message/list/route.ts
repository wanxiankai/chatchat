import { getUserPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // 在生产构建阶段跳过数据库操作
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
        return NextResponse.json({ code: 0, data: { list: [] } });
    }
    
    const chatId = request.nextUrl.searchParams.get('chatId')
    if (!chatId) {
        return NextResponse.json({ code: -1, message: '缺少聊天ID' }, { status: 400 });
    }
    
    try {
        const { prisma, userId } = await getUserPrisma();
        
        // 首先验证该聊天是否属于当前用户
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                userId: userId
            },
            select: { id: true }
        });
        
        if (!chat) {
            return NextResponse.json({ code: -1, message: '无权访问该聊天' }, { status: 403 });
        }
        
        const list = await prisma.message.findMany({
            where: { chatId },
            orderBy: {
                createTime: "asc"
            }
        });
        
        return NextResponse.json({ code: 0, data: { list } });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ code: 1, message: '获取消息列表失败' }, { status: 500 });
    }
}