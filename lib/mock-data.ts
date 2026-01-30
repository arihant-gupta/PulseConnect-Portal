// Mock data for PulseConnect healthcare portal

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  lastSync: string;
  riskLevel: "low" | "moderate" | "high" | "critical";
  primaryCondition: string;
  avatar?: string;
}

export interface TimelineEvent {
  id: string;
  patientId: string;
  type: "lab_report" | "vital" | "activity" | "appointment" | "medication" | "wearable";
  title: string;
  description: string;
  timestamp: string;
  source: "AuraHealth" | "Wearable Sync" | "User-Authorized Data" | "Manual Entry";
  data?: Record<string, string | number>;
}

export interface VitalReading {
  date: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  temperature: number;
}

export interface LabResult {
  id: string;
  patientId: string;
  testName: string;
  value: number;
  unit: string;
  normalRange: string;
  status: "normal" | "abnormal" | "critical";
  date: string;
  source: string;
}

export interface SyncStatus {
  id: string;
  system: string;
  status: "connected" | "syncing" | "error" | "disconnected";
  lastSync: string;
  recordsSynced: number;
  icon: string;
}

export const patients: Patient[] = [
  {
    id: "P001",
    name: "Eleanor Vance",
    age: 67,
    gender: "Female",
    mrn: "MRN-2024-001",
    lastSync: "2 minutes ago",
    riskLevel: "high",
    primaryCondition: "Type 2 Diabetes, Hypertension",
  },
  {
    id: "P002",
    name: "Marcus Chen",
    age: 45,
    gender: "Male",
    mrn: "MRN-2024-002",
    lastSync: "15 minutes ago",
    riskLevel: "moderate",
    primaryCondition: "Cardiovascular Disease",
  },
  {
    id: "P003",
    name: "Sarah Mitchell",
    age: 34,
    gender: "Female",
    mrn: "MRN-2024-003",
    lastSync: "1 hour ago",
    riskLevel: "low",
    primaryCondition: "Asthma",
  },
  {
    id: "P004",
    name: "James Rodriguez",
    age: 72,
    gender: "Male",
    mrn: "MRN-2024-004",
    lastSync: "5 minutes ago",
    riskLevel: "critical",
    primaryCondition: "Chronic Kidney Disease Stage 4",
  },
  {
    id: "P005",
    name: "Aisha Patel",
    age: 28,
    gender: "Female",
    mrn: "MRN-2024-005",
    lastSync: "30 minutes ago",
    riskLevel: "low",
    primaryCondition: "Pregnancy (32 weeks)",
  },
  {
    id: "P006",
    name: "Robert Kim",
    age: 55,
    gender: "Male",
    mrn: "MRN-2024-006",
    lastSync: "10 minutes ago",
    riskLevel: "moderate",
    primaryCondition: "COPD",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "E001",
    patientId: "P001",
    type: "lab_report",
    title: "HbA1c Test Results",
    description: "Glycated hemoglobin levels indicate improved diabetic control",
    timestamp: "2026-01-31T09:30:00",
    source: "AuraHealth",
    data: { HbA1c: "7.2%", previousHbA1c: "8.1%" },
  },
  {
    id: "E002",
    patientId: "P001",
    type: "vital",
    title: "Blood Pressure Reading",
    description: "Automated reading from connected device",
    timestamp: "2026-01-31T08:15:00",
    source: "Wearable Sync",
    data: { systolic: 142, diastolic: 88, pulse: 76 },
  },
  {
    id: "E003",
    patientId: "P001",
    type: "activity",
    title: "Daily Step Count",
    description: "Patient exceeded daily goal",
    timestamp: "2026-01-30T23:59:00",
    source: "Wearable Sync",
    data: { steps: 8432, goal: 7000, calories: 312 },
  },
  {
    id: "E004",
    patientId: "P001",
    type: "medication",
    title: "Medication Adherence",
    description: "Metformin 500mg taken as scheduled",
    timestamp: "2026-01-31T07:00:00",
    source: "AuraHealth",
    data: { medication: "Metformin", dosage: "500mg", adherenceRate: "94%" },
  },
  {
    id: "E005",
    patientId: "P001",
    type: "wearable",
    title: "Sleep Analysis",
    description: "Sleep quality data from wearable device",
    timestamp: "2026-01-31T06:30:00",
    source: "Wearable Sync",
    data: { duration: "6.5 hours", quality: "Fair", deepSleep: "1.2 hours" },
  },
  {
    id: "E006",
    patientId: "P004",
    type: "lab_report",
    title: "Kidney Function Panel",
    description: "eGFR showing decline - requires attention",
    timestamp: "2026-01-31T10:00:00",
    source: "AuraHealth",
    data: { eGFR: 22, creatinine: "3.2 mg/dL", BUN: "45 mg/dL" },
  },
];

export const vitalTrends: VitalReading[] = [
  { date: "Jan 25", heartRate: 78, bloodPressureSystolic: 145, bloodPressureDiastolic: 92, oxygenSaturation: 97, temperature: 98.4 },
  { date: "Jan 26", heartRate: 75, bloodPressureSystolic: 140, bloodPressureDiastolic: 88, oxygenSaturation: 98, temperature: 98.2 },
  { date: "Jan 27", heartRate: 80, bloodPressureSystolic: 148, bloodPressureDiastolic: 94, oxygenSaturation: 96, temperature: 98.6 },
  { date: "Jan 28", heartRate: 72, bloodPressureSystolic: 138, bloodPressureDiastolic: 86, oxygenSaturation: 98, temperature: 98.3 },
  { date: "Jan 29", heartRate: 76, bloodPressureSystolic: 142, bloodPressureDiastolic: 90, oxygenSaturation: 97, temperature: 98.5 },
  { date: "Jan 30", heartRate: 74, bloodPressureSystolic: 140, bloodPressureDiastolic: 87, oxygenSaturation: 98, temperature: 98.2 },
  { date: "Jan 31", heartRate: 76, bloodPressureSystolic: 142, bloodPressureDiastolic: 88, oxygenSaturation: 97, temperature: 98.4 },
];

export const labResults: LabResult[] = [
  { id: "L001", patientId: "P001", testName: "Glucose (Fasting)", value: 128, unit: "mg/dL", normalRange: "70-100", status: "abnormal", date: "2026-01-31", source: "AuraHealth" },
  { id: "L002", patientId: "P001", testName: "HbA1c", value: 7.2, unit: "%", normalRange: "< 5.7", status: "abnormal", date: "2026-01-31", source: "AuraHealth" },
  { id: "L003", patientId: "P001", testName: "Cholesterol (Total)", value: 195, unit: "mg/dL", normalRange: "< 200", status: "normal", date: "2026-01-28", source: "AuraHealth" },
  { id: "L004", patientId: "P001", testName: "LDL Cholesterol", value: 118, unit: "mg/dL", normalRange: "< 100", status: "abnormal", date: "2026-01-28", source: "AuraHealth" },
  { id: "L005", patientId: "P001", testName: "Creatinine", value: 1.1, unit: "mg/dL", normalRange: "0.7-1.3", status: "normal", date: "2026-01-25", source: "AuraHealth" },
  { id: "L006", patientId: "P004", testName: "eGFR", value: 22, unit: "mL/min", normalRange: "> 60", status: "critical", date: "2026-01-31", source: "AuraHealth" },
  { id: "L007", patientId: "P004", testName: "Creatinine", value: 3.2, unit: "mg/dL", normalRange: "0.7-1.3", status: "critical", date: "2026-01-31", source: "AuraHealth" },
];

export const syncStatuses: SyncStatus[] = [
  { id: "S001", system: "AuraHealth", status: "connected", lastSync: "2 minutes ago", recordsSynced: 1247, icon: "smartphone" },
  { id: "S002", system: "Wearable Devices", status: "connected", lastSync: "5 minutes ago", recordsSynced: 8934, icon: "watch" },
  { id: "S003", system: "Lab Systems (HL7)", status: "connected", lastSync: "15 minutes ago", recordsSynced: 456, icon: "flask" },
  { id: "S004", system: "FHIR Gateway", status: "syncing", lastSync: "In Progress", recordsSynced: 2341, icon: "database" },
  { id: "S005", system: "Pharmacy Network", status: "connected", lastSync: "1 hour ago", recordsSynced: 189, icon: "pill" },
];

export const riskAlerts = [
  { id: "A001", patientId: "P004", patientName: "James Rodriguez", severity: "critical", title: "eGFR Critical Drop", message: "eGFR dropped to 22 mL/min. Immediate nephrology consultation recommended.", timestamp: "10 minutes ago" },
  { id: "A002", patientId: "P001", patientName: "Eleanor Vance", severity: "high", title: "Blood Pressure Elevated", message: "3 consecutive readings above 140/90. Consider medication adjustment.", timestamp: "25 minutes ago" },
  { id: "A003", patientId: "P002", patientName: "Marcus Chen", severity: "moderate", title: "Missed Medication", message: "Patient missed 2 doses of Lisinopril this week.", timestamp: "1 hour ago" },
  { id: "A004", patientId: "P006", patientName: "Robert Kim", severity: "moderate", title: "SpO2 Trending Down", message: "Oxygen saturation averaging 93% over past 48 hours.", timestamp: "2 hours ago" },
];

export const dashboardStats = {
  totalPatients: 1247,
  activeAlerts: 12,
  appointmentsToday: 34,
  pendingReferrals: 8,
  dataPointsSynced: 24891,
  avgResponseTime: "4.2 min",
};
