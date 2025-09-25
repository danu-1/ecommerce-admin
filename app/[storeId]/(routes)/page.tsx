import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function StoreDashboard({ params }: { params: { storeId: string } }) {
    const { userId } = auth();
    if (!userId) redirect("/");

    const store = await prisma.store.findFirst({ where: { id: params.storeId, userId } });
    if (!store) redirect("/");

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold">{store.name}</h1>
            <p className="text-sm text-muted-foreground">Welcome to your store dashboard.</p>
        </div>
    );
}



