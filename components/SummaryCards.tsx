"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DashboardData } from "@/types/dashboard";
import { tokens } from "@/tokens/tokens";
import { formatUSD } from "@/lib/transform";

interface SummaryCardsProps {
  data: DashboardData;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const prefersReduced = useReducedMotion();
  const { grandTotal, avgEfficiency, topSpender, items, agg } = data;

  const effColor =
    avgEfficiency < 30
      ? tokens.colors.red
      : avgEfficiency < 60
        ? tokens.colors.amber
        : tokens.colors.accentDark;

  const cards = [
    {
      label: "Total Spend",
      value: formatUSD(grandTotal),
      sub: "↑ 4.2% vs last month",
      subColor: tokens.colors.accentDark,
      valueColor: tokens.colors.text,
    },
    {
      label: "Avg Efficiency",
      value: `${avgEfficiency}%`,
      sub: `across ${items.length} ${agg}`,
      subColor: tokens.colors.text3,
      valueColor: effColor,
    },
    {
      label: "Top Spender",
      value: topSpender.name,
      sub: `${formatUSD(topSpender.total)} total`,
      subColor: tokens.colors.text3,
      valueColor: tokens.colors.text,
      valueSm: true,
    },
    {
      label: `Active ${agg === "pods" ? "Pods" : "Namespaces"}`,
      value: String(items.length),
      sub: "all healthy",
      subColor: tokens.colors.text3,
      valueColor: tokens.colors.text,
    },
  ];

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
      aria-label="Cost summary"
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          role="region"
          aria-label={card.label}
          className="flex flex-col gap-1 rounded-xl p-4"
          style={{ background: tokens.colors.surface2 }}
          initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: i * 0.05,
            ease: tokens.easing.out,
          }}
        >
          <span
            className="text-[11px] font-mono uppercase tracking-wider"
            style={{ color: tokens.colors.text3 }}
          >
            {card.label}
          </span>
          <motion.span
            key={`${card.label}-${card.value}`}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: tokens.easing.spring }}
            className={`font-semibold font-mono tracking-tight ${
              card.valueSm ? "text-[15px]" : "text-xl"
            }`}
            style={{ color: card.valueColor }}
          >
            {card.value}
          </motion.span>
          <span
            className="text-[11px] font-medium"
            style={{ color: card.subColor }}
          >
            {card.sub}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
