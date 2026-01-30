"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Activity,
  AlertTriangle,
  RefreshCw,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navItems = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
    description: "Institutional dashboard",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    description: "Patient directory",
  },
  {
    title: "Timeline",
    href: "/timeline",
    icon: Activity,
    description: "Patient events",
  },
  {
    title: "Risk Triage",
    href: "/triage",
    icon: AlertTriangle,
    description: "Risk dashboard",
  },
  {
    title: "Sync Status",
    href: "/sync",
    icon: RefreshCw,
    description: "System connections",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground">
              PulseConnect
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              Provider Portal
            </span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mx-4 mt-4 rounded-lg bg-sidebar-accent p-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-success" />
              <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-success opacity-75" />
            </div>
            <span className="text-xs font-medium text-sidebar-foreground">
              Connected to AuraHealth
            </span>
          </div>
          <p className="mt-1 text-xs text-sidebar-foreground/60">
            Real-time sync active
          </p>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <div className="flex flex-1 flex-col">
                    <span>{item.title}</span>
                    <span
                      className={cn(
                        "text-xs",
                        isActive
                          ? "text-sidebar-primary-foreground/70"
                          : "text-sidebar-foreground/50"
                      )}
                    >
                      {item.description}
                    </span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 opacity-0 transition-opacity",
                      isActive && "opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
              <span className="text-sm font-medium text-sidebar-foreground">
                DR
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">
                Dr. Rebecca Torres
              </span>
              <span className="text-xs text-sidebar-foreground/60">
                Internal Medicine
              </span>
            </div>
          </div>
          <Separator className="mb-3 bg-sidebar-border" />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
