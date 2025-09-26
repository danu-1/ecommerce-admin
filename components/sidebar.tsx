"use client";

import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings,
  Palette,
  Tag,
  Ruler,
  Layers,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  storeId: string;
}

const routes = [
  {
    href: `/[storeId]`,
    label: "Overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    href: `/[storeId]/billboards`,
    label: "Billboards",
    icon: Store,
    active: false,
  },
  {
    href: `/[storeId]/categories`,
    label: "Categories",
    icon: Layers,
    active: false,
  },
  {
    href: `/[storeId]/sizes`,
    label: "Sizes",
    icon: Ruler,
    active: false,
  },
  {
    href: `/[storeId]/colors`,
    label: "Colors",
    icon: Palette,
    active: false,
  },
  {
    href: `/[storeId]/products`,
    label: "Products",
    icon: ShoppingBag,
    active: false,
  },
  {
    href: `/[storeId]/orders`,
    label: "Orders",
    icon: CreditCard,
    active: false,
  },
  {
    href: `/[storeId]/settings`,
    label: "Settings",
    icon: Settings,
    active: false,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ storeId }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-50">
      <div className="flex-1 space-y-4 p-4">
        <nav className="space-y-2">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === `/${storeId}` && route.href === `/[storeId]` || 
                            pathname.includes(route.href.replace("[storeId]", storeId)) && route.href !== `/[storeId]`;
            
            return (
              <Link
                key={route.href}
                href={route.href.replace("[storeId]", storeId)}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
                  isActive 
                    ? "bg-gray-900 text-white hover:bg-gray-900" 
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

