// app/inventory/[...page]/layout.tsx
import React from "react";

export default function InventoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="md:px-16 lg:px-20 sm:px-10 px-5 ">
        {children}
    </div>;
}
