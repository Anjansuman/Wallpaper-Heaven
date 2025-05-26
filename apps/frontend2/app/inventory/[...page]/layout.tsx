// app/inventory/[...page]/layout.tsx
import React from "react";

export default function InventoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="px-20">
        {children}
    </div>;
}
