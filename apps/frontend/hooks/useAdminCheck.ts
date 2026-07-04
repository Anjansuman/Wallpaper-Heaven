"use client";
import { useSession } from "next-auth/react";

export function useAdminCheck() {
    const { data: session } = useSession();
    const isAdmin = !!session?.user?.token;
    const token = session?.user?.token ?? null;
    return { isAdmin, token };
}
