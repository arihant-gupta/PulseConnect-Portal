"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Smartphone,
  Watch,
  Database,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const syncItems = [
  {
    name: "AuraHealth",
    status: "connected",
    lastSync: "2 min ago",
    icon: Smartphone,
    records: "1,247",
  },
  {
    name: "Wearables",
    status: "connected",
    lastSync: "5 min ago",
    icon: Watch,
    records: "8,934",
  },
  {
    name: "FHIR Gateway",
    status: "syncing",
    lastSync: "In Progress",
    icon: Database,
    records: "2,341",
  },
];

export function SyncIndicator() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            System Sync Status
          </CardTitle>
        </div>
        <Link href="/sync">
          <Button variant="ghost" size="sm" className="text-primary">
            Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {syncItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.status === "connected" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{item.lastSync}</p>
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs font-normal",
                  item.status === "syncing" && "animate-pulse"
                )}
              >
                {item.records} records
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-success/20 bg-success/5 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">
              All systems operational
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Real-time patient data flowing from AuraHealth
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
