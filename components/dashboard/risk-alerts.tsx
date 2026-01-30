"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { riskAlerts } from "@/lib/mock-data";
import Link from "next/link";

const severityStyles = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  high: "bg-warning/10 text-warning-foreground border-warning/20",
  moderate: "bg-primary/10 text-primary border-primary/20",
  low: "bg-muted text-muted-foreground border-muted",
};

const severityBadgeStyles = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  moderate: "bg-primary text-primary-foreground",
  low: "bg-muted text-muted-foreground",
};

export function RiskAlerts() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle className="text-base font-semibold">Risk Alerts</CardTitle>
        </div>
        <Link href="/triage">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <ScrollArea className="h-[320px] pr-4">
          <div className="flex flex-col gap-3">
            {riskAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "rounded-lg border p-4 transition-all hover:shadow-sm",
                  severityStyles[alert.severity as keyof typeof severityStyles]
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        className={cn(
                          "text-xs capitalize",
                          severityBadgeStyles[
                            alert.severity as keyof typeof severityBadgeStyles
                          ]
                        )}
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-sm font-medium truncate">
                        {alert.patientName}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-1">{alert.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
