import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "default" | "primary" | "warning" | "success";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-shadow hover:shadow-md",
        variant === "primary" && "border-primary/20 bg-primary/5",
        variant === "warning" && "border-warning/20 bg-warning/5",
        variant === "success" && "border-success/20 bg-success/5"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  trend.positive ? "text-success" : "text-destructive"
                )}
              >
                {trend.positive ? "+" : "-"}
                {trend.value}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              variant === "default" && "bg-secondary",
              variant === "primary" && "bg-primary/10",
              variant === "warning" && "bg-warning/10",
              variant === "success" && "bg-success/10"
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                variant === "default" && "text-muted-foreground",
                variant === "primary" && "text-primary",
                variant === "warning" && "text-warning",
                variant === "success" && "text-success"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
