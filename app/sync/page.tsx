"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Smartphone,
  Watch,
  Database,
  Pill,
  Activity,
  Cloud,
  Server,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { syncStatuses } from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const syncHistory = [
  { time: "00:00", records: 120 },
  { time: "04:00", records: 45 },
  { time: "08:00", records: 280 },
  { time: "12:00", records: 520 },
  { time: "16:00", records: 380 },
  { time: "20:00", records: 290 },
  { time: "Now", records: 340 },
];

const systemIcons = {
  smartphone: Smartphone,
  watch: Watch,
  flask: Activity,
  database: Database,
  pill: Pill,
};

const statusStyles = {
  connected: {
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    icon: CheckCircle2,
    label: "Connected",
  },
  syncing: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    icon: Loader2,
    label: "Syncing",
  },
  error: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: AlertCircle,
    label: "Error",
  },
  disconnected: {
    color: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-muted",
    icon: AlertCircle,
    label: "Disconnected",
  },
};

export default function SyncPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const connectedCount = syncStatuses.filter(
    (s) => s.status === "connected" || s.status === "syncing"
  ).length;

  return (
    <DashboardLayout
      title="System Sync Status"
      subtitle="FHIR API Bridge and data source connections"
    >
      {/* Connection Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Systems Online</p>
                <p className="text-3xl font-bold text-success">
                  {connectedCount}/{syncStatuses.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Records Today
                </p>
                <p className="text-3xl font-bold text-foreground">24,891</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Database className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sync Latency</p>
                <p className="text-3xl font-bold text-foreground">1.2s</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Zap className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <ArrowDownRight className="h-3 w-3" />
              <span>-0.3s improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="text-3xl font-bold text-foreground">2m</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-7 text-xs text-primary"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Sync Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Connection Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Data Source Connections
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syncStatuses.map((sync) => {
                  const Icon =
                    systemIcons[sync.icon as keyof typeof systemIcons] ||
                    Database;
                  const status = statusStyles[sync.status];
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={sync.id}
                      className={cn(
                        "rounded-lg border p-4 transition-all",
                        status.bg,
                        status.border
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border">
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">
                              {sync.system}
                            </h4>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs capitalize gap-1",
                                status.color
                              )}
                            >
                              <StatusIcon
                                className={cn(
                                  "h-3 w-3",
                                  sync.status === "syncing" && "animate-spin"
                                )}
                              />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Last sync: {sync.lastSync}</span>
                            <span>•</span>
                            <span>
                              {sync.recordsSynced.toLocaleString()} records
                            </span>
                          </div>
                        </div>

                        {sync.status === "syncing" && (
                          <div className="w-24">
                            <Progress value={67} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1 text-center">
                              67%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sync Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Sync Activity (Last 24 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={syncHistory}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="records"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Records Synced"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* AuraHealth Connection */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                AuraHealth Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-success opacity-75" />
                  </div>
                  <span className="font-medium text-foreground">
                    Connected & Syncing
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Real-time data flow from user-consented health records
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Patient Connections", value: "1,247" },
                  { label: "Records Synced Today", value: "12,456" },
                  { label: "Lab Reports Processed", value: "89" },
                  { label: "Vital Readings", value: "3,421" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FHIR Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-5 w-5 text-muted-foreground" />
                FHIR API Gateway
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm">API Version</span>
                  <Badge variant="outline">R4 v4.0.1</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm">Uptime</span>
                  <span className="text-sm font-medium text-success">
                    99.97%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm">Requests/min</span>
                  <span className="text-sm font-medium">842</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm">Error Rate</span>
                  <span className="text-sm font-medium text-success">
                    0.02%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "HIPAA Compliant", status: true },
                  { label: "Data Encryption", status: true },
                  { label: "Audit Logging", status: true },
                  { label: "User Consent Verified", status: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-success/20 bg-success/5 p-3">
                <p className="text-xs text-muted-foreground">
                  All patient data is encrypted in transit and at rest.
                  User-authorized access only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
