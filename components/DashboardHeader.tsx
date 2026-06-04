"use client";
import { motion } from "framer-motion";
import { tokens } from "@/tokens/tokens";
import { AggregationLevel, ClusterKey } from "@/types/dashboard";
import React, { useEffect, useRef, useState } from "react";

const CLUSTERS: ClusterKey[] = ["A", "B", "C", "D"];

interface DashboardHeaderProps {
  cluster: ClusterKey;
  agg: AggregationLevel;
  onClusterChange: (c: ClusterKey) => void;
  onAggChange: (a: AggregationLevel) => void;
}

export function DashboardHeader({
  cluster,
  agg,
  onClusterChange,
  onAggChange,
}: DashboardHeaderProps) {
  const [clusterOpen, setClusterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setClusterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  return (
    <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
      {/* Title */}
      <div>
        <h1
          className="text-lg font-semibold tracking-tight"
          style={{ color: tokens.colors.text }}
        >
          Cloud Cost Analytics
        </h1>
        <p
          className="text-xs font-mono mt-0.5"
          style={{ color: tokens.colors.text3 }}
        >
          real-time infrastructure spend
        </p>
      </div>

      {/* Controls */}
      <div
        role="toolbar"
        aria-label="Dashboard controls"
        className="flex items-center gap-2 flex-wrap"
      >
        <button
          aria-pressed="true"
          aria-label="Time filter: Last 30 days"
          className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-full border font-medium text-[13px] transition-all duration-150 focus-visible:outline-none"
          style={{
            background: tokens.colors.text,
            borderColor: tokens.colors.text,
            color: "#fff",
          }}
        >
          <CalendarIcon />
          Last 30 Days
        </button>

        {/* Cluster dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setClusterOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={clusterOpen}
            aria-label={`Selected cluster: Cluster ${cluster}`}
            className="inline-flex items-center gap-2 h-[34px] px-3.5 rounded-full border-[1.5px] font-semibold text-[13px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2"
            style={{
              background: tokens.colors.accentSoft,
              borderColor: tokens.colors.accent,
              color: tokens.colors.accentDark,
              // @ts-ignore
              "--tw-ring-color": tokens.colors.accent,
            }}
          >
            Cluster {cluster}
            <motion.span
              animate={{ rotate: clusterOpen ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <ChevronIcon />
            </motion.span>
          </button>

          {/* Dropdown */}
          {clusterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14, ease: tokens.easing.out }}
              role="listbox"
              aria-label="Select cluster"
              className="absolute top-[calc(100%+6px)] left-0 min-w-[140px] rounded-2xl overflow-hidden z-50"
              style={{
                background: tokens.colors.surface,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: tokens.shadows.md,
              }}
            >
              {CLUSTERS.map((c) => (
                <button
                  key={c}
                  role="option"
                  aria-selected={c === cluster}
                  onClick={() => {
                    onClusterChange(c);
                    setClusterOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors duration-100 focus-visible:outline-none"
                  style={{
                    color:
                      c === cluster
                        ? tokens.colors.accentDark
                        : tokens.colors.text2,
                    background:
                      c === cluster ? tokens.colors.accentSoft : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (c !== cluster)
                      e.currentTarget.style.background = tokens.colors.surface2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      c === cluster ? tokens.colors.accentSoft : "transparent";
                  }}
                >
                  Cluster {c}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <nav
          role="tablist"
          aria-label="Aggregation level"
          className="inline-flex items-center p-[3px] gap-0.5 rounded-full border"
          style={{
            background: tokens.colors.surface2,
            borderColor: tokens.colors.border,
          }}
        >
          {(["pods", "namespaces"] as AggregationLevel[]).map((level) => (
            <button
              key={level}
              role="tab"
              aria-selected={agg === level}
              onClick={() => onAggChange(level)}
              className="h-7 px-3.5 rounded-full text-[12px] font-medium capitalize transition-all duration-150 focus-visible:outline-none focus-visible:ring-2"
              style={{
                background:
                  agg === level ? tokens.colors.surface : "transparent",
                color: agg === level ? tokens.colors.text : tokens.colors.text2,
                boxShadow: agg === level ? tokens.shadows.sm : "none",
                // @ts-ignore
                "--tw-ring-color": tokens.colors.accent,
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <line x1="8" y1="2" x2="8" y2="5" />
      <line x1="5" y1="2" x2="5" y2="5" />
      <line x1="11" y1="2" x2="11" y2="5" />
      <line x1="4" y1="8" x2="12" y2="8" strokeWidth="1.2" />
      <line x1="4" y1="11" x2="10" y2="11" strokeWidth="1.2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <polyline points="4,6 8,10 12,6" />
    </svg>
  );
}
