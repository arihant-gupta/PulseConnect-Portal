"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronRight,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { patients } from "@/lib/mock-data";
import Link from "next/link";

const riskStyles = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning text-warning-foreground",
  moderate: "bg-primary text-primary-foreground",
  low: "bg-success text-success-foreground",
};

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk =
      riskFilter === "all" || patient.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <DashboardLayout
      title="Patient Directory"
      subtitle="AuraHealth-synced patient records"
    >
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or MRN..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 text-success">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Live Sync Active
              </Badge>
              <span className="text-sm text-muted-foreground">
                {filteredPatients.length} patients
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Link key={patient.id} href={`/patients/${patient.id}`}>
            <Card className="transition-all hover:shadow-md hover:border-primary/20 cursor-pointer h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.mrn}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={cn("capitalize", riskStyles[patient.riskLevel])}
                  >
                    {patient.riskLevel}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Age/Gender</span>
                    <span className="text-foreground">
                      {patient.age} / {patient.gender}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="text-foreground text-right max-w-[180px] truncate">
                      {patient.primaryCondition}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Smartphone className="h-3.5 w-3.5 text-success" />
                    <span>Synced via AuraHealth</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3" />
                    <span>{patient.lastSync}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-3 justify-between text-primary hover:text-primary hover:bg-primary/5"
                >
                  View Profile
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
