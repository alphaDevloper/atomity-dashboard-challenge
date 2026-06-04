"use client";

import { motion } from "framer-motion";
import type {
  NamespaceKey,
  ClusterKey,
  AggregationLevel,
} from "@/types/dashboard";
import { tokens } from "@/tokens/tokens";
import { NAMESPACE_KEYS } from "@/lib/transform";

interface NamespaceSelectorProps {
  cluster: ClusterKey;
  agg: AggregationLevel;
  namespace: NamespaceKey;
  onNamespaceChange: (ns: NamespaceKey) => void;
}

export function NamespaceSelector({
  cluster,
  agg,
  namespace,
  onNamespaceChange,
}: NamespaceSelectorProps) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-3">
      {/* Breadcrumb + title */}
      <div>
        <nav
          className="flex items-center gap-1.5 mb-1.5"
          aria-label="Navigation path"
        >
          {[
            `Cluster ${cluster}`,
            agg === "pods" ? `Namespace ${namespace}` : "All Namespaces",
            agg === "pods" ? "Pods" : "Namespaces",
          ].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1.5">
              <span
                className="text-[11px] font-mono"
                style={{
                  color:
                    i === arr.length - 1
                      ? tokens.colors.accentDark
                      : tokens.colors.text3,
                  fontWeight: i === arr.length - 1 ? 500 : 400,
                }}
              >
                {crumb}
              </span>
              {i < arr.length - 1 && (
                <span
                  style={{ color: tokens.colors.text3, opacity: 0.4 }}
                  aria-hidden="true"
                >
                  ›
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <h2
            className="text-[15px] font-semibold"
            style={{ color: tokens.colors.text }}
          >
            Cluster {cluster} —{" "}
            {agg === "pods" ? `Namespace ${namespace} — Pods` : "Namespaces"}
          </h2>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tracking-wide"
            style={{
              background: tokens.colors.surface2,
              border: `1px solid ${tokens.colors.border}`,
              color: tokens.colors.text3,
            }}
          >
            Aggregated by: {agg === "pods" ? "Pod" : "Namespace"}
          </span>
        </div>
      </div>

      {/* Namespace tab strip */}
      <div
        role="tablist"
        aria-label="Select namespace"
        className="flex gap-1.5 flex-wrap"
      >
        {NAMESPACE_KEYS.map((ns, i) => {
          const active = ns === namespace;
          const color = tokens.colors.series[i % tokens.colors.series.length];
          return (
            <button
              key={ns}
              role="tab"
              aria-selected={active}
              onClick={() => onNamespaceChange(ns)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-[13px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2"
              style={{
                background: active
                  ? tokens.colors.accentSoft
                  : tokens.colors.surface,
                borderColor: active
                  ? tokens.colors.accent
                  : tokens.colors.border,
                color: active ? tokens.colors.accentDark : tokens.colors.text2,
              }}
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: color }}
              />
              {ns}
            </button>
          );
        })}
      </div>
    </div>
  );
}
