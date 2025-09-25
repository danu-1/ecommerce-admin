"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { StoreCreateModal } from "@/components/store-switcher";
import { useRouter } from "next/navigation";

export default function Home() {
    const { isSignedIn, user } = useUser();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    return (
      <div className="p-4">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          
          {isSignedIn ? (
            // Authenticated user content
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg">Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p>
              <UserButton afterSignOutUrl="/" />
              <Button onClick={() => setOpen(true)}>Create store</Button>
              <StoreCreateModal open={open} onOpenChange={setOpen} onCreated={(id) => router.push(`/${id}`)} />
            </div>
          ) : (
            // Unauthenticated user content
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg">Please sign in to access the admin dashboard</p>
              <div className="flex space-x-4">
                <SignInButton mode="modal">
                  <Button variant="default">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline">Sign Up</Button>
                </SignUpButton>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }