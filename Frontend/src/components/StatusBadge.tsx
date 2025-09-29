import React from "react";

type Props = {
  status: string;
  className?: string;
};

const styles: Record<string, string> = {
  ok: "bg-green-100 text-green-800 border-green-200",
  running: "bg-green-100 text-green-800 border-green-200",
  degraded: "bg-yellow-100 text-yellow-800 border-yellow-200",
  starting: "bg-yellow-100 text-yellow-800 border-yellow-200",
  down: "bg-red-100 text-red-800 border-red-200",
  error: "bg-red-100 text-red-800 border-red-200",
  stopped: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function StatusBadge({ status, className }: Props) {
  const key = status.toLowerCase();
  const cls = styles[key] || "bg-gray-100 text-gray-800 border-gray-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${cls} ${className || ""}`}>
      {status}
    </span>
  );
}
