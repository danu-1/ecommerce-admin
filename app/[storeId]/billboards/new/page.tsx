import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BillboardForm } from "@/components/billboard-form";
import { Separator } from "@/components/ui/separator";

export default async function NewBillboardPage({ 
    params 
}: { 
    params: { storeId: string } 
}) {
    const { userId } = auth();
    if (!userId) redirect("/");

    const store = await prisma.store.findFirst({ 
        where: { id: params.storeId, userId } 
    });
    
    if (!store) redirect("/");

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create Billboard</h2>
                <p className="text-muted-foreground">
                    Add a new billboard for your store
                </p>
            </div>
            <Separator />
            <BillboardForm storeId={params.storeId} />
        </div>
    );
}

