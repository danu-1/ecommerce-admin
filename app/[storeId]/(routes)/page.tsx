import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package, ShoppingCart } from "lucide-react";

export default async function StoreDashboard({ params }: { params: { storeId: string } }) {
    const { userId } = auth();
    if (!userId) redirect("/");

    const store = await prisma.store.findFirst({ where: { id: params.storeId, userId } });
    if (!store) redirect("/");

    // Get dashboard data
    const [
        totalRevenue,
        salesCount,
        stockCount,
        paidOrders
    ] = await Promise.all([
        prisma.order.findMany({
            where: { storeId: params.storeId, isPaid: true },
            include: { orderItems: true }
        }),
        prisma.order.count({
            where: { storeId: params.storeId }
        }),
        prisma.product.count({
            where: { storeId: params.storeId, isArchived: false }
        }),
        prisma.order.count({
            where: { storeId: params.storeId, isPaid: true }
        })
    ]);

    const totalRevenueAmount = totalRevenue.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + Number(item.product.price) * item.quantity;
        }, 0);
        return total + orderTotal;
    }, 0);

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Overview of your store
                </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenueAmount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{paidOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stockCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{salesCount}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}



