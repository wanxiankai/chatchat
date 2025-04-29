import { getUserPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // 在生产构建阶段跳过数据库操作
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
        return NextResponse.json({ code: 0 });
    }
    
    const {prisma, userId} = await getUserPrisma();
    const body = await request.json();
    const { id, ...data } = body;
    
    try {
        await prisma.chat.update({
            data,
            where: { id, userId: userId }  // 修正字段名从 userid 改为 userId
        });
        
        return NextResponse.json({ code: 0 });
    } catch (error) {
        console.error('Error updating chat:', error);
        return NextResponse.json({ code: 1, message: '更新聊天失败' }, { status: 500 });
    }
}