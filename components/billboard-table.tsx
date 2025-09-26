"use client";

import { Billboard } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { AlertModal } from "@/components/modals/alert-modal";

interface BillboardTableProps {
    data: Billboard[];
}

export const BillboardTable: React.FC<BillboardTableProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [billboardId, setBillboardId] = useState("");
    const router = useRouter();

    const onDelete = async () => {
        try {
            setLoading(true);
            
            // Extract storeId from the current path
            const pathParts = window.location.pathname.split('/');
            const storeId = pathParts[1];
            
            const response = await fetch(`/api/${storeId}/billboards/${billboardId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete billboard");
            }

            toast.success("Billboard deleted");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Label
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Date
                            </th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((billboard) => (
                            <tr key={billboard.id} className="border-b">
                                <td className="h-12 px-4 align-middle font-medium">
                                    {billboard.label}
                                </td>
                                <td className="h-12 px-4 align-middle text-muted-foreground">
                                    {new Date(billboard.createdAt).toLocaleDateString()}
                                </td>
                                <td className="h-12 px-4 align-middle text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/billboards/${billboard.id}`}>
                                                    Update
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setBillboardId(billboard.id);
                                                    setOpen(true);
                                                }}
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

