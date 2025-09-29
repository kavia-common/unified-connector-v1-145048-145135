"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { LogEntry } from "@/lib/types";
import { getRecentLogs } from "@/lib/api/endpoints";

const LEVEL_COLORS: Record<LogEntry["level"], string> = {
  DEBUG: "text-gray-500",
  INFO: "text-gray-800",
  WARN: "text-yellow-700",
  ERROR: "text-red-700",
};

type Props = {
  initialLimit?: number;
  pollMs?: number;
};

export default function LogsViewer({ initialLimit = 50, pollMs = 5000 }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [limit, setLimit] = useState(initialLimit);
  const [level, setLevel] = useState<LogEntry["level"] | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(() => {
    if (level === "ALL") return logs;
    return logs.filter((l) => l.level === level);
  }, [logs, level]);

  const refresh = async () => {
    try {
      setIsLoading(true);
      const next = await getRecentLogs(limit);
      setLogs(next);
    } catch (e) {
      console.error("Failed to load logs", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, pollMs]);

  const onChangeLevel = (value: string) => {
    if (value === "ALL" || value === "DEBUG" || value === "INFO" || value === "WARN" || value === "ERROR") {
      setLevel(value as typeof level);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <div className="text-sm font-medium">Recent Logs</div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={level}
            onChange={(e) => onChangeLevel(e.target.value)}
            aria-label="Filter by log level"
          >
            <option value="ALL">All</option>
            <option value="DEBUG">Debug</option>
            <option value="INFO">Info</option>
            <option value="WARN">Warn</option>
            <option value="ERROR">Error</option>
          </select>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={String(limit)}
            onChange={(e) => setLimit(Number(e.target.value))}
            aria-label="Limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 text-sm" onClick={refresh} disabled={isLoading}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-auto text-sm font-mono">
        {filtered.length === 0 ? (
          <div className="p-3 text-gray-500">No logs available.</div>
        ) : (
          filtered.map((l, idx) => (
            <div key={`${l.timestamp}-${idx}`} className="px-3 py-2 border-b">
              <span className="text-gray-500">{new Date(l.timestamp).toLocaleString()}</span>{" "}
              <span className={`font-semibold ${LEVEL_COLORS[l.level]}`}>{l.level}</span>{" "}
              <span className="text-gray-400">{l.source ? `[${l.source}]` : ""}</span>{" "}
              <span className="text-gray-800">{l.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
