"use client"
import { ReactNode } from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider
} from "@/components/ui/sidebar"

export const SidebarProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}