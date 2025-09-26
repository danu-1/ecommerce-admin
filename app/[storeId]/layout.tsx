import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function StoreLayout({ 
    children, 
    params 
}: { 
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const { userId } = auth();
    if (!userId) redirect("/");

    const store = await prisma.store.findFirst({ 
        where: { id: params.storeId, userId } 
    });
    
    if (!store) redirect("/");

    return (
        <div className="min-h-screen">
            <Navbar storeName={store.name} storeId={store.id} />
            <div className="flex">
                <Sidebar storeId={store.id} />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}



