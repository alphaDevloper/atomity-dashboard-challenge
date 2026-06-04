"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInfrastructureData } from "@/hooks/useInfrastructureData";
import { useDashboardState } from "@/hooks/useDashboardState";
import { DashboardHeader } from "@/components/DashboardHeader";
import { NamespaceSelector } from "@/components/NamespaceSelector";
import { BarChart } from "@/components/BarChart";
import { SummaryCards } from "@/components/SummaryCards";
import { CostTable } from "@/components/CostTable";
import { LoadingState, ErrorState } from "@/components/States";
import { tokens } from "@/tokens/tokens";

export function CloudDashboard() {
  const prefersReduced = useReducedMotion();
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfrastructureData();

  const {
    cluster,
    setCluster,
    agg,
    setAgg,
    namespace,
    setNamespace,
    dashboardData,
  } = useDashboardState(users);

  return (
    <section
      className="max-w-5xl mx-auto px-6 py-8 pb-16"
      aria-label="Cloud cost analytics dashboard"
    >
      {/* Inject CSS variables */}
      <style>{`
        * { box-sizing: border-box; }
        body { background: ${tokens.colors.bg}; font-family: 'DM Sans', system-ui, sans-serif; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <DashboardHeader
        cluster={cluster}
        agg={agg}
        onClusterChange={setCluster}
        onAggChange={setAgg}
      />

      {/* Main card */}
      <motion.article
        className="rounded-2xl overflow-hidden"
        style={{
          background: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          boxShadow: tokens.shadows.sm,
        }}
        layout
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.2 }}
            >
              <LoadingState />
            </motion.div>
          )}

          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.2 }}
            >
              <ErrorState message={error?.message} />
            </motion.div>
          )}

          {dashboardData && !isLoading && (
            <motion.div
              key={`${cluster}-${agg}-${namespace}`}
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: tokens.easing.out }}
            >
              {/* Chart section */}
              <div
                className="p-6"
                style={{ borderBottom: `1px solid ${tokens.colors.border}` }}
              >
                <NamespaceSelector
                  cluster={cluster}
                  agg={agg}
                  namespace={namespace}
                  onNamespaceChange={setNamespace}
                />
                <div className="mt-5">
                  <p
                    className="text-[11px] font-mono uppercase tracking-wider mb-3"
                    style={{ color: tokens.colors.text3 }}
                  >
                    Cost by {agg === "pods" ? "pod" : "namespace"} — last 30
                    days
                  </p>
                  <BarChart items={dashboardData.items} />
                </div>
              </div>

              {/* Summary cards */}
              <div
                className="p-6"
                style={{ borderBottom: `1px solid ${tokens.colors.border}` }}
              >
                <SummaryCards data={dashboardData} />
              </div>

              {/* Cost table */}
              <div className="px-6 pb-6 pt-4">
                <CostTable items={dashboardData.items} agg={agg} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </section>
  );
}
