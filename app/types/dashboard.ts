export type ClusterKey = "A" | "B" | "C" | "D";
export type AggregationLevel = "pods" | "namespaces";
export type NamespaceKey = "Alpha" | "Beta" | "Gamma" | "Delta";

export interface DashboardItem {
  id: string;
  name: string; // "Pod A" | "Alpha NS"
  label: string; // derived from user firstName / company name
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number; // 0-100
  total: number;
}

export interface DashboardData {
  cluster: ClusterKey;
  agg: AggregationLevel;
  namespace: NamespaceKey;
  items: DashboardItem[];
  grandTotal: number;
  avgEfficiency: number;
  topSpender: DashboardItem;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  company: {
    name: string;
    department: string;
  };
}

export interface DummyJsonResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}
