import { getUserPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const { prisma, userId } = await getUserPrisma();
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ code: -1 })
    }
    
    // No need to delete messages manually due to onDelete: Cascade
    await prisma.chat.delete({
        where: { 
            id, 
            userid: userId 
        }
    });
    
    return NextResponse.json({ code: 0 })
}