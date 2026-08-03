"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "./NavBar";

// Routes where navbar should be hidden (exact matches)
const authRoutes = ['/', '/login', '/signup', '/register'];

export function ConditionalNavBar() {
    const pathname = usePathname();

    // Hide navbar only on exact auth page matches
    const isAuthPage = authRoutes.includes(pathname);

    if (isAuthPage) {
        return null;
    }

    return <NavBar />;
}
