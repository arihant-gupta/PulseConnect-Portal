"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  FileText,
  Pill,
  Watch,
  Calendar,
  Filter,
  Clock,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { timelineEvents, patients } from "@/lib/mock-data";
import Link from "next/link";

const eventIcons = {
  lab_report: FileText,
  vital: Activity,
  activity: Watch,
  appointment: Calendar,
  medication: Pill,
  wearable: Watch,
};

const eventColors = {
  lab_report: "bg-primary/10 text-primary border-primary/20",
  vital: "bg-destructive/10 text-destructive border-destructive/20",
  activity: "bg-accent/10 text-accent border-accent/20",
  appointment: "bg-warning/10 text-warning-foreground border-warning/20",
  medication: "bg-success/10 text-success border-success/20",
  wearable: "bg-accent/10 text-accent border-accent/20",
};

const sourceStyles = {
  AuraHealth: "bg-primary/10 text-primary border-primary/20",
  "Wearable Sync": "bg-accent/10 text-accent border-accent/20",
  "User-Authorized Data": "bg-success/10 text-success border-success/20",
  "Manual Entry": "bg-muted text-muted-foreground border-muted",
};

export default function TimelinePage() {
  const [eventFilter, setEventFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const allEvents = [
    ...timelineEvents,
    // Add more mock events for variety
    {
      id: "E007",
      patientId: "P002",
      type: "vital" as const,
      title: "Heart Rate Alert",
      description: "Elevated resting heart rate detected",
      timestamp: "2026-01-31T11:00:00",
      source: "Wearable Sync" as const,
      data: { heartRate: 98, threshold: 90 },
    },
    {
      id: "E008",
      patientId: "P003",
      type: "appointment" as const,
      title: "Follow-up Scheduled",
      description: "Asthma management review",
      timestamp: "2026-01-31T10:30:00",
      source: "Manual Entry" as const,
      data: { date: "Feb 5, 2026", provider: "Dr. Torres" },
    },
    {
      id: "E009",
      patientId: "P005",
      type: "wearable" as const,
      title: "Activity Goal Achieved",
      description: "Daily step goal exceeded by 20%",
      timestamp: "2026-01-30T22:00:00",
      source: "Wearable Sync" as const,
      data: { steps: 12400, goal: 10000 },
    },
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const filteredEvents = allEvents.filter((event) => {
    const matchesType =
      eventFilter === "all" || event.type === eventFilter;
    const matchesSource =
      sourceFilter === "all" || event.source === sourceFilter;
    return matchesType && matchesSource;
  });

  const getPatientName = (patientId: string) => {
    return patients.find((p) => p.id === patientId)?.name || "Unknown Patient";
  };

  return (
    <DashboardLayout
      title="Patient Timeline"
      subtitle="Chronological health events from all sources"
    >
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-44">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="lab_report">Lab Reports</SelectItem>
                  <SelectItem value="vital">Vitals</SelectItem>
                  <SelectItem value="medication">Medications</SelectItem>
                  <SelectItem value="wearable">Wearable Data</SelectItem>
                  <SelectItem value="appointment">Appointments</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-48">
                  <Smartphone className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Data Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="AuraHealth">AuraHealth</SelectItem>
                  <SelectItem value="Wearable Sync">Wearable Sync</SelectItem>
                  <SelectItem value="User-Authorized Data">
                    User-Authorized
                  </SelectItem>
                  <SelectItem value="Manual Entry">Manual Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1 text-success">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Real-time Feed
              </Badge>
              <span className="text-sm text-muted-foreground">
                {filteredEvents.length} events
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-320px)] pr-4">
            <div className="relative pl-8 before:absolute before:left-[15px] before:top-0 before:h-full before:w-0.5 before:bg-border">
              {filteredEvents.map((event) => {
                const Icon = eventIcons[event.type] || Activity;
                const patientName = getPatientName(event.patientId);

                return (
                  <div key={event.id} className="relative pb-8 last:pb-0">
                    {/* Timeline Node */}
                    <div
                      className={cn(
                        "absolute left-[-17px] flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card",
                        eventColors[event.type]
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Event Card */}
                    <div className="ml-6 rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Link
                              href={`/patients/${event.patientId}`}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              {patientName}
                            </Link>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs capitalize border",
                                eventColors[event.type]
                              )}
                            >
                              {event.type.replace("_", " ")}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        </div>

                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs border shrink-0",
                            sourceStyles[event.source]
                          )}
                        >
                          {event.source}
                        </Badge>
                      </div>

                      {/* Data Fields */}
                      {event.data && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {Object.entries(event.data).map(([key, value]) => (
                            <div
                              key={key}
                              className="rounded-md bg-secondary px-3 py-1.5 text-xs"
                            >
                              <span className="text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>{" "}
                              <span className="font-medium text-foreground">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {new Date(event.timestamp).toLocaleString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <Link href={`/patients/${event.patientId}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-primary h-7"
                          >
                            View Patient
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            <div className="mt-6 text-center">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ChevronDown className="h-4 w-4" />
                Load More Events
              </Button>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
