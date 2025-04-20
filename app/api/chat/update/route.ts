import { getUserPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const {prisma, userId} = await getUserPrisma()
    const body = await request.json()
    const { id, ...data } = body;
    await prisma.chat.update({
        data,
        where: { id, userid:userId }
    })

    return NextResponse.json({ code: 0 })
}