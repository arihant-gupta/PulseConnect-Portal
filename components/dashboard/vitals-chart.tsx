"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity } from "lucide-react";
import { vitalTrends } from "@/lib/mock-data";

export function VitalsChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" />
          <CardTitle className="text-base font-semibold">
            Vital Trends (Aggregated)
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className="text-xs text-muted-foreground font-normal"
        >
          Last 7 Days
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={vitalTrends}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.5}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                domain={[60, 160]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
              <Line
                type="monotone"
                dataKey="bloodPressureSystolic"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                name="Systolic BP"
              />
              <Line
                type="monotone"
                dataKey="bloodPressureDiastolic"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                name="Diastolic BP"
              />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
                name="Heart Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-success" />
            Data synced from AuraHealth
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
