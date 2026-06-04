"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DashboardItem } from "@/types/dashboard";
import { tokens } from "@/tokens/tokens";
import { formatUSD } from "@/lib/transform";

interface BarChartProps {
  items: DashboardItem[];
}

export function BarChart({ items }: BarChartProps) {
  const prefersReduced = useReducedMotion();
  const maxTotal = Math.max(...items.map((d) => d.total));

  return (
    <div
      role="img"
      aria-label={`Bar chart comparing costs: ${items.map((i) => `${i.name} ${formatUSD(i.total)}`).join(", ")}`}
      className="flex items-end gap-4 h-44 relative px-2"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-px"
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full"
            style={{
              height: "1px",
              background: tokens.colors.border,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Bars */}
      {items.map((item, index) => {
        const pct = (item.total / maxTotal) * 100;
        const color = tokens.colors.series[index % tokens.colors.series.length];

        return (
          <div
            key={item.id}
            className="flex flex-col items-center gap-2 flex-1 min-w-0"
          >
            {/* Bar container */}
            <div
              className="w-full flex items-end justify-center"
              style={{ height: "152px" }}
            >
              <motion.div
                className="group relative rounded-t-md"
                style={{
                  background: color,
                  width: "90%",
                  maxWidth: "100px",
                  minHeight: "4px",
                }}
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : {
                        duration: 0.55,
                        ease: tokens.easing.spring,
                        delay: index * 0.06,
                      }
                }
              >
                {/* Tooltip on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 2 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-semibold font-mono pointer-events-none z-10"
                  style={{
                    background: color,
                    color: "#fff",
                  }}
                  aria-hidden="true"
                >
                  {formatUSD(item.total)}
                </motion.div>
              </motion.div>
            </div>

            {/* Label */}
            <motion.span
              key={`${item.id}-label`}
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="text-[12px] font-medium text-center truncate max-w-[90px]"
              style={{ color: tokens.colors.text2 }}
            >
              {item.name}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
