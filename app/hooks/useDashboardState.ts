"use client";

import { useState, useMemo } from "react";
import type {
  ClusterKey,
  AggregationLevel,
  NamespaceKey,
} from "../types/dashboard";
import { transformToDashboardData, NAMESPACE_KEYS } from "../lib/transform";
import type { DummyUser } from "../types/dashboard";

export function useDashboardState(users: DummyUser[] | undefined) {
  const [cluster, setCluster] = useState<ClusterKey>("A");
  const [agg, setAgg] = useState<AggregationLevel>("pods");
  const [namespace, setNamespace] = useState<NamespaceKey>("Alpha");

  const dashboardData = useMemo(() => {
    if (!users) return null;
    return transformToDashboardData(users, cluster, agg, namespace);
  }, [users, cluster, agg, namespace]);

  return {
    cluster,
    setCluster,
    agg,
    setAgg,
    namespace,
    setNamespace,
    dashboardData,
    namespaceKeys: NAMESPACE_KEYS,
  };
}
