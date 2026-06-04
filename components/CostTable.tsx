"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { DashboardItem, AggregationLevel } from "@/types/dashboard";
import { tokens } from "@/tokens/tokens";
import { formatUSD, efficiencyVariant } from "@/lib/transform";

interface CostTableProps {
  items: DashboardItem[];
  agg: AggregationLevel;
}

const EFF_COLORS = {
  low: tokens.colors.red,
  mid: tokens.colors.amber,
  high: tokens.colors.accent,
};

export function CostTable({ items, agg }: CostTableProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-[13px]"
        style={{ borderCollapse: "collapse" }}
        aria-label={`Detailed cost breakdown by ${agg}`}
      >
        <thead>
          <tr>
            {[
              "Name",
              "CPU",
              "RAM",
              "Storage",
              "Network",
              "GPU",
              "Efficiency",
              "Total",
            ].map((col) => (
              <th
                key={col}
                scope="col"
                className="pb-3 text-[11px] font-mono uppercase tracking-wider"
                style={{
                  color: tokens.colors.text3,
                  textAlign: col === "Name" ? "left" : "right",
                  paddingLeft: col === "Name" ? 0 : "8px",
                  paddingRight: "8px",
                  borderBottom: `1px solid ${tokens.colors.border}`,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="wait">
            {items.map((item, index) => {
              const color =
                tokens.colors.series[index % tokens.colors.series.length];
              const ev = efficiencyVariant(item.efficiency);
              const effColor = EFF_COLORS[ev];
              const effBarW = Math.round(item.efficiency * 0.45);

              return (
                <motion.tr
                  key={item.id}
                  initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: index * 0.05,
                    ease: tokens.easing.out,
                  }}
                  className="group"
                  style={{ borderTop: `1px solid ${tokens.colors.border}` }}
                >
                  {/* Name */}
                  <td className="py-3 pr-2" style={{ textAlign: "left" }}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="w-2 h-2 rounded-full flex-shrink-0 inline-block"
                        style={{ background: color }}
                      />
                      <span
                        className="font-semibold"
                        style={{ color: tokens.colors.text }}
                      >
                        {item.name}
                      </span>
                    </span>
                  </td>

                  {/* Metric cells */}
                  {[
                    item.cpu,
                    item.ram,
                    item.storage,
                    item.network,
                    item.gpu,
                  ].map((val, ci) => (
                    <motion.td
                      key={ci}
                      className="py-3 px-2 font-mono"
                      style={{ textAlign: "right", color: tokens.colors.text2 }}
                      initial={prefersReduced ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + ci * 0.02 }}
                    >
                      {formatUSD(val)}
                    </motion.td>
                  ))}

                  {/* Efficiency */}
                  <td className="py-3 px-2" style={{ textAlign: "right" }}>
                    <span className="inline-flex items-center justify-end gap-1.5">
                      <motion.span
                        className="inline-block rounded-full"
                        style={{
                          height: "4px",
                          background: effColor,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: effBarW }}
                        transition={{
                          duration: prefersReduced ? 0.01 : 0.45,
                          ease: tokens.easing.spring,
                          delay: index * 0.06,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="font-mono text-[12px]"
                        style={{ color: effColor }}
                      >
                        {item.efficiency}%
                      </span>
                    </span>
                  </td>

                  {/* Total */}
                  <td
                    className="py-3 pl-2 font-mono font-bold"
                    style={{ textAlign: "right", color: tokens.colors.text }}
                  >
                    {formatUSD(item.total)}
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
