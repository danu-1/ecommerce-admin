import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BillboardForm } from "@/components/billboard-form";
import { BillboardTable } from "@/components/billboard-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function BillboardsPage({ 
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

    const billboards = await prisma.billboard.findMany({
        where: { storeId: params.storeId },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Billboards</h2>
                    <p className="text-muted-foreground">
                        Manage billboards for your store
                    </p>
                </div>
                <Link href={`/${params.storeId}/billboards/new`}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                </Link>
            </div>
            
            <BillboardTable data={billboards} />
        </div>
    );
}

