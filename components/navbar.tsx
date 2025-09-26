"use client";

import { Store, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { StoreCreateModal } from "@/components/store-switcher";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  storeName: string;
  storeId: string;
}

export const Navbar: React.FC<NavbarProps> = ({ storeName, storeId }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <span className="font-bold text-xl">{storeName}</span>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="text-sm font-normal"
            >
              <Store className="mr-2 h-4 w-4" />
              Switch Store
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
      
      <StoreCreateModal 
        open={open} 
        onOpenChange={setOpen} 
        onCreated={(id) => router.push(`/${id}`)} 
      />
    </>
  );
};

