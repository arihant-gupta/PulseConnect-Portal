"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, ChevronRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { patients } from "@/lib/mock-data";
import Link from "next/link";

const riskStyles = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  moderate: "bg-primary text-primary-foreground",
  low: "bg-success text-success-foreground",
};

export function PatientList() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            Recent Patients
          </CardTitle>
        </div>
        <Link href="/patients">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <ScrollArea className="h-[320px] pr-4">
          <div className="flex flex-col gap-2">
            {patients.map((patient) => (
              <Link key={patient.id} href={`/patients/${patient.id}`}>
                <div className="flex items-center gap-4 rounded-lg border border-transparent p-3 transition-all hover:border-border hover:bg-secondary/50">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {patient.name}
                      </p>
                      <Badge
                        className={cn(
                          "text-xs capitalize shrink-0",
                          riskStyles[patient.riskLevel]
                        )}
                      >
                        {patient.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {patient.primaryCondition}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <RefreshCw className="h-3 w-3" />
                    <span>{patient.lastSync}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
