"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  ChevronRight,
  Phone,
  Send,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Droplets,
  Smartphone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { riskAlerts, patients } from "@/lib/mock-data";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const severityOrder = { critical: 0, high: 1, moderate: 2, low: 3 };

const severityStyles = {
  critical: {
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    text: "text-destructive",
    badge: "bg-destructive text-destructive-foreground",
  },
  high: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    text: "text-warning-foreground",
    badge: "bg-warning text-warning-foreground",
  },
  moderate: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    badge: "bg-primary text-primary-foreground",
  },
  low: {
    bg: "bg-success/10",
    border: "border-success/30",
    text: "text-success",
    badge: "bg-success text-success-foreground",
  },
};

const riskDistribution = [
  { name: "Critical", value: 2, color: "hsl(var(--destructive))" },
  { name: "High", value: 3, color: "hsl(var(--warning))" },
  { name: "Moderate", value: 5, color: "hsl(var(--primary))" },
  { name: "Low", value: 8, color: "hsl(var(--success))" },
];

const conditionRisks = [
  { condition: "Diabetes", riskScore: 78 },
  { condition: "Hypertension", riskScore: 65 },
  { condition: "CKD", riskScore: 92 },
  { condition: "COPD", riskScore: 54 },
  { condition: "Cardiac", riskScore: 71 },
];

export default function TriagePage() {
  const [severityFilter, setSeverityFilter] = useState("all");

  const sortedAlerts = [...riskAlerts].sort(
    (a, b) =>
      severityOrder[a.severity as keyof typeof severityOrder] -
      severityOrder[b.severity as keyof typeof severityOrder]
  );

  const filteredAlerts =
    severityFilter === "all"
      ? sortedAlerts
      : sortedAlerts.filter((alert) => alert.severity === severityFilter);

  const patientsWithRisk = patients.map((p) => ({
    ...p,
    riskScore:
      p.riskLevel === "critical"
        ? 95
        : p.riskLevel === "high"
          ? 75
          : p.riskLevel === "moderate"
            ? 50
            : 25,
  }));

  return (
    <DashboardLayout
      title="Risk & Triage Dashboard"
      subtitle="Predictive alerts powered by AuraHealth data"
    >
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold text-destructive">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-3xl font-bold text-warning-foreground">3</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Review within 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-3xl font-bold text-success">8</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Alerts addressed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-3xl font-bold text-foreground">4.2m</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Alert to action time
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Alert Queue */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Active Risk Alerts
              </CardTitle>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => {
                    const styles =
                      severityStyles[
                        alert.severity as keyof typeof severityStyles
                      ];
                    const patient = patients.find(
                      (p) => p.id === alert.patientId
                    );

                    return (
                      <div
                        key={alert.id}
                        className={cn(
                          "rounded-lg border p-4 transition-all hover:shadow-md",
                          styles.bg,
                          styles.border
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 shrink-0">
                            <AvatarFallback className="bg-card text-foreground font-medium">
                              {alert.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={cn("capitalize", styles.badge)}>
                                {alert.severity}
                              </Badge>
                              <Link
                                href={`/patients/${alert.patientId}`}
                                className="font-medium text-foreground hover:text-primary hover:underline"
                              >
                                {alert.patientName}
                              </Link>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {alert.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {alert.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{alert.timestamp}</span>
                                <span className="mx-1">•</span>
                                <Smartphone className="h-3 w-3 text-success" />
                                <span className="text-success">AuraHealth</span>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 bg-transparent">
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call
                                </Button>
                                <Button size="sm" className="h-8">
                                  <Send className="h-3 w-3 mr-1" />
                                  Refer
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Condition Risk Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Risk Scores by Condition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conditionRisks}
                    layout="vertical"
                    margin={{ left: 20, right: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="condition"
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="riskScore" radius={[0, 4, 4, 0]}>
                      {conditionRisks.map((entry) => (
                        <Cell
                          key={entry.condition}
                          fill={
                            entry.riskScore >= 80
                              ? "hsl(var(--destructive))"
                              : entry.riskScore >= 60
                                ? "hsl(var(--warning))"
                                : "hsl(var(--primary))"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Risk scores calculated from AuraHealth vitals and lab trends
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Patient Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* High Risk Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">High Risk Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientsWithRisk
                  .filter((p) => p.riskScore >= 70)
                  .sort((a, b) => b.riskScore - a.riskScore)
                  .slice(0, 4)
                  .map((patient) => (
                    <Link
                      key={patient.id}
                      href={`/patients/${patient.id}`}
                      className="block"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {patient.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {patient.primaryCondition}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={cn(
                              "text-lg font-bold",
                              patient.riskScore >= 90
                                ? "text-destructive"
                                : "text-warning"
                            )}
                          >
                            {patient.riskScore}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Risk Score
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Trend Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Wearable Trend Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    metric: "Heart Rate",
                    trend: "up",
                    value: "+8%",
                    icon: Heart,
                  },
                  {
                    metric: "Blood Pressure",
                    trend: "up",
                    value: "+5%",
                    icon: Activity,
                  },
                  {
                    metric: "SpO2 Levels",
                    trend: "down",
                    value: "-2%",
                    icon: Droplets,
                  },
                ].map((item) => (
                  <div
                    key={item.metric}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.metric}</span>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        item.trend === "up" && item.metric !== "SpO2 Levels"
                          ? "text-warning"
                          : item.trend === "down"
                            ? "text-warning"
                            : "text-success"
                      )}
                    >
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <Smartphone className="h-3 w-3 text-success" />
                Trends from AuraHealth wearable sync
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
