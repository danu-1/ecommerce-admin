"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function StoreCreateModal({ open, onOpenChange, onCreated }: { open: boolean; onOpenChange: (v: boolean) => void; onCreated?: (storeId: string) => void }) {
    const [name, setName] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);

    const onSubmit = async () => {
        try {
            setSubmitting(true);
            const res = await fetch("/api/stores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            if (!res.ok) throw new Error("Failed to create store");
            const data = await res.json();
            onCreated?.(data.id as string);
            onOpenChange(false);
            setName("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal title="Create store" description="Add a new store to manage products and categories" isOpen={open} onClose={() => onOpenChange(false)}>
            <div className="space-y-4">
                <input className="w-full border px-3 py-2 rounded" placeholder="Store name" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onSubmit} disabled={!name || submitting}>Create</Button>
                </div>
            </div>
        </Modal>
    );
}


