"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  Activity,
  FileText,
  Pill,
  Watch,
  Heart,
  Droplets,
  RefreshCw,
  Send,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  patients,
  timelineEvents,
  labResults,
  vitalTrends,
} from "@/lib/mock-data";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const riskStyles = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  moderate: "bg-primary text-primary-foreground",
  low: "bg-success text-success-foreground",
};

const eventIcons = {
  lab_report: FileText,
  vital: Activity,
  activity: Watch,
  appointment: Calendar,
  medication: Pill,
  wearable: Watch,
};

const sourceStyles = {
  AuraHealth: "bg-primary/10 text-primary border-primary/20",
  "Wearable Sync": "bg-accent/10 text-accent border-accent/20",
  "User-Authorized Data": "bg-success/10 text-success border-success/20",
  "Manual Entry": "bg-muted text-muted-foreground border-muted",
};

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const patient = patients.find((p) => p.id === id) || patients[0];
  const patientEvents = timelineEvents.filter((e) => e.patientId === id);
  const patientLabs = labResults.filter((l) => l.patientId === id);

  return (
    <DashboardLayout
      title="Patient Profile"
      subtitle="AuraHealth-synced patient data"
    >
      {/* Back Button */}
      <Link href="/patients">
        <Button variant="ghost" className="mb-4 text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
      </Link>

      {/* Patient Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">
                    {patient.name}
                  </h2>
                  <Badge
                    className={cn("capitalize", riskStyles[patient.riskLevel])}
                  >
                    {patient.riskLevel} Risk
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  {patient.mrn} • {patient.age} years • {patient.gender}
                </p>
                <p className="text-sm text-foreground font-medium">
                  {patient.primaryCondition}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs border",
                      sourceStyles["AuraHealth"]
                    )}
                  >
                    <Smartphone className="mr-1 h-3 w-3" />
                    Connected via AuraHealth
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:items-end">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 text-success" />
                <span>Last synced: {patient.lastSync}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Referral
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="info">Demographics</TabsTrigger>
        </TabsList>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Patient Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-border">
                  {[...timelineEvents].map((event, index) => {
                    const Icon = eventIcons[event.type] || Activity;
                    return (
                      <div key={event.id} className="relative pb-8 last:pb-0">
                        <div className="absolute left-[-17px] flex h-6 w-6 items-center justify-center rounded-full bg-card border-2 border-primary">
                          <Icon className="h-3 w-3 text-primary" />
                        </div>
                        <div className="ml-6 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-foreground">
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
                          {event.data && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {Object.entries(event.data).map(([key, value]) => (
                                <div
                                  key={key}
                                  className="rounded bg-secondary px-2 py-1 text-xs"
                                >
                                  <span className="text-muted-foreground">
                                    {key}:
                                  </span>{" "}
                                  <span className="font-medium text-foreground">
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  Blood Pressure Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalTrends}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        domain={[60, 160]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="bloodPressureSystolic"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        name="Systolic"
                      />
                      <Line
                        type="monotone"
                        dataKey="bloodPressureDiastolic"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        name="Diastolic"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Smartphone className="h-3 w-3 text-success" />
                  Data synced from AuraHealth wearable devices
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Heart Rate & SpO2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalTrends}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        domain={[60, 105]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="heartRate"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                        name="Heart Rate (bpm)"
                      />
                      <Line
                        type="monotone"
                        dataKey="oxygenSaturation"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        name="SpO2 (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Watch className="h-3 w-3 text-success" />
                  Wearable Sync - continuous monitoring
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">
                  Current Vital Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    {
                      label: "Blood Pressure",
                      value: "142/88",
                      unit: "mmHg",
                      status: "elevated",
                    },
                    {
                      label: "Heart Rate",
                      value: "76",
                      unit: "bpm",
                      status: "normal",
                    },
                    {
                      label: "SpO2",
                      value: "97",
                      unit: "%",
                      status: "normal",
                    },
                    {
                      label: "Temperature",
                      value: "98.4",
                      unit: "°F",
                      status: "normal",
                    },
                  ].map((vital) => (
                    <div
                      key={vital.label}
                      className="rounded-lg border border-border p-4"
                    >
                      <p className="text-sm text-muted-foreground">
                        {vital.label}
                      </p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {vital.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {vital.unit}
                        </span>
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "mt-2 text-xs capitalize",
                          vital.status === "normal"
                            ? "text-success border-success/20"
                            : "text-warning border-warning/20"
                        )}
                      >
                        {vital.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Labs Tab */}
        <TabsContent value="labs">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Laboratory Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Test
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Result
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Normal Range
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {labResults.map((lab) => (
                      <tr
                        key={lab.id}
                        className="hover:bg-secondary/50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {lab.testName}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {lab.value} {lab.unit}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {lab.normalRange}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={cn(
                              "text-xs capitalize",
                              lab.status === "normal" &&
                                "bg-success/10 text-success",
                              lab.status === "abnormal" &&
                                "bg-warning/10 text-warning-foreground",
                              lab.status === "critical" &&
                                "bg-destructive/10 text-destructive"
                            )}
                          >
                            {lab.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {lab.date}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs border",
                              sourceStyles[lab.source as keyof typeof sourceStyles]
                            )}
                          >
                            {lab.source}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <Smartphone className="h-3 w-3 text-success" />
                Lab results automatically synced from AuraHealth uploads
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="info">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Phone, label: "Phone", value: "(555) 123-4567" },
                  {
                    icon: Mail,
                    label: "Email",
                    value: `${patient.name.toLowerCase().replace(" ", ".")}@email.com`,
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "123 Main Street, Springfield, IL 62701",
                  },
                  {
                    icon: Calendar,
                    label: "Date of Birth",
                    value: "January 15, 1959",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Insurance & Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Primary Insurance", value: "Blue Cross Blue Shield" },
                  { label: "Member ID", value: "BCBS-789456123" },
                  { label: "Primary Care Physician", value: "Dr. Sarah Johnson" },
                  { label: "Preferred Pharmacy", value: "CVS - Springfield Downtown" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
