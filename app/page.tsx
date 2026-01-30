import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { RiskAlerts } from "@/components/dashboard/risk-alerts";
import { PatientList } from "@/components/dashboard/patient-list";
import { VitalsChart } from "@/components/dashboard/vitals-chart";
import { SyncIndicator } from "@/components/dashboard/sync-indicator";
import {
  Users,
  AlertTriangle,
  Calendar,
  FileText,
  Database,
  Clock,
} from "lucide-react";
import { dashboardStats } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Institutional Overview"
      subtitle="Real-time patient data powered by AuraHealth"
    >
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients.toLocaleString()}
          subtitle="Active in system"
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Active Alerts"
          value={dashboardStats.activeAlerts}
          subtitle="Requires attention"
          icon={AlertTriangle}
          variant="warning"
        />
        <StatCard
          title="Today's Appointments"
          value={dashboardStats.appointmentsToday}
          subtitle="Scheduled visits"
          icon={Calendar}
        />
        <StatCard
          title="Pending Referrals"
          value={dashboardStats.pendingReferrals}
          subtitle="Awaiting review"
          icon={FileText}
        />
        <StatCard
          title="Data Points Synced"
          value={dashboardStats.dataPointsSynced.toLocaleString()}
          subtitle="Last 24 hours"
          icon={Database}
          variant="success"
        />
        <StatCard
          title="Avg Response Time"
          value={dashboardStats.avgResponseTime}
          subtitle="Alert to action"
          icon={Clock}
        />
      </div>

      {/* Main Content Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <VitalsChart />
          <div className="grid gap-6 md:grid-cols-2">
            <PatientList />
            <RiskAlerts />
          </div>
        </div>

        {/* Right Column - Sync & Activity */}
        <div className="flex flex-col gap-6">
          <SyncIndicator />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}

function RecentActivity() {
  const activities = [
    {
      type: "lab",
      title: "Lab Results Received",
      patient: "Eleanor Vance",
      time: "2 min ago",
      source: "AuraHealth",
    },
    {
      type: "vital",
      title: "BP Reading Synced",
      patient: "James Rodriguez",
      time: "5 min ago",
      source: "Wearable Sync",
    },
    {
      type: "appointment",
      title: "Appointment Completed",
      patient: "Sarah Mitchell",
      time: "15 min ago",
      source: "Manual Entry",
    },
    {
      type: "medication",
      title: "Medication Logged",
      patient: "Marcus Chen",
      time: "30 min ago",
      source: "AuraHealth",
    },
    {
      type: "wearable",
      title: "Sleep Data Synced",
      patient: "Aisha Patel",
      time: "1 hour ago",
      source: "Wearable Sync",
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-base font-semibold text-card-foreground mb-4">
        Recent Activity
      </h3>
      <div className="flex flex-col gap-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
          >
            <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground">{activity.patient}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-primary">{activity.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
