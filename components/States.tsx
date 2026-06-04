"use client";

import { motion } from "framer-motion";
import { tokens } from "@/tokens/tokens";

export function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading infrastructure data"
      className="flex flex-col items-center justify-center py-16 gap-4 text-center"
    >
      {/* Spinner */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: tokens.colors.accentSoft }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke={tokens.colors.accent}
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="9"
            strokeDasharray="28 56"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 11 11"
              to="360 11 11"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div>
        <p
          className="text-[15px] font-semibold"
          style={{ color: tokens.colors.text }}
        >
          Fetching data
        </p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-label="Error loading data"
      className="flex flex-col items-center justify-center py-16 gap-3 text-center"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: tokens.colors.redSoft }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke={tokens.colors.red}
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8" />
          <line x1="10" y1="6" x2="10" y2="10" strokeLinecap="round" />
          <circle
            cx="10"
            cy="14"
            r="0.8"
            fill={tokens.colors.red}
            stroke="none"
          />
        </svg>
      </div>

      <div>
        <p
          className="text-[15px] font-semibold"
          style={{ color: tokens.colors.text }}
        >
          Failed to load data
        </p>
        <p
          className="text-[13px] mt-1 max-w-[260px]"
          style={{ color: tokens.colors.text3 }}
        >
          {message ?? "Network error. Please check your connection."}
        </p>
      </div>
    </div>
  );
}
