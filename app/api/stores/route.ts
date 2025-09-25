import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name } = body as { name?: string };
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const store = await prisma.store.create({
            data: { name, userId },
        });

        return NextResponse.json(store);
    } catch (error) {
        console.error("[STORES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}



