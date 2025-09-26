import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BillboardForm } from "@/components/billboard-form";
import { Separator } from "@/components/ui/separator";

export default async function BillboardPage({ 
    params 
}: { 
    params: { storeId: string; billboardId: string } 
}) {
    const { userId } = auth();
    if (!userId) redirect("/");

    const store = await prisma.store.findFirst({ 
        where: { id: params.storeId, userId } 
    });
    
    if (!store) redirect("/");

    const billboard = await prisma.billboard.findFirst({
        where: { 
            id: params.billboardId,
            storeId: params.storeId 
        }
    });

    if (!billboard) redirect(`/${params.storeId}/billboards`);

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Billboard</h2>
                <p className="text-muted-foreground">
                    Update billboard information
                </p>
            </div>
            <Separator />
            <BillboardForm 
                storeId={params.storeId} 
                initialData={billboard}
            />
        </div>
    );
}

