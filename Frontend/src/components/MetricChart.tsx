import React from "react";
import type { MetricPoint } from "@/lib/types";

type Props = {
  data: MetricPoint[];
  width?: number;
  height?: number;
  color?: string;
  title?: string;
};

export default function MetricChart({ data, width = 360, height = 100, color = "#111827", title }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="border rounded-md p-4">
        <div className="text-sm text-gray-500">{title || "Metric"}: no data</div>
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const xStep = width / Math.max(data.length - 1, 1);
  const yScale = (v: number) => {
    if (max === min) return height / 2;
    return height - ((v - min) / (max - min)) * height;
  };

  const points = data
    .map((d, i) => `${i * xStep},${yScale(d.value)}`)
    .join(" ");

  const last = data[data.length - 1];

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">{title || "Metric"}</div>
        <div className="text-sm font-medium">{last.value}</div>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title || "chart"}>
        <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
      </svg>
      <div className="mt-1 text-xs text-gray-500">min {min} • max {max}</div>
    </div>
  );
}
