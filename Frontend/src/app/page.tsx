"use client";

import React, { useEffect, useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import MetricChart from "@/components/MetricChart";
import LogsViewer from "@/components/LogsViewer";
import { getHealth, getMetrics, listServices } from "@/lib/api/endpoints";
import type { ConnectorService, HealthStatus, MetricPoint } from "@/lib/types";

export default function Home() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [services, setServices] = useState<ConnectorService[]>([]);
  const [metricCpu, setMetricCpu] = useState<MetricPoint[]>([]);
  const [metricMem, setMetricMem] = useState<MetricPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const [h, s, cpu, mem] = await Promise.all([
        getHealth().catch(() => null),
        listServices().catch(() => []),
        getMetrics("cpu_usage", "1h").catch(() => []),
        getMetrics("memory_usage", "1h").catch(() => []),
      ]);
      setHealth(h);
      setServices(s);
      setMetricCpu(cpu);
      setMetricMem(mem);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600 text-sm">Unified Connector overview</p>
        </div>
        <button onClick={refresh} className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 text-sm" disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">Health</div>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={health?.status || "unknown"} />
            <span className="text-sm text-gray-600">{health?.version ? `v${health.version}` : "version: n/a"}</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Uptime: {health?.uptime_seconds ? `${Math.floor(health.uptime_seconds / 60)} min` : "n/a"}
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">Services</div>
          <div className="mt-2 text-2xl font-semibold">{services.length}</div>
          <div className="mt-1 text-xs text-gray-500">managed by connector</div>
        </div>

        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">Last Updated</div>
          <div className="mt-2 text-2xl font-semibold">{new Date().toLocaleTimeString()}</div>
          <div className="mt-1 text-xs text-gray-500">auto-refreshing every 10s</div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricChart title="CPU Usage (%)" data={metricCpu} color="#2563EB" />
        <MetricChart title="Memory Usage (MB)" data={metricMem} color="#16A34A" />
      </section>

      <section className="grid grid-cols-1 gap-4">
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-600">Services Snapshot</div>
              <div className="text-xs text-gray-500">Current state of managed services</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-3 font-medium">Name</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 pr-3 font-medium">Last Update</th>
                  <th className="py-2 pr-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-gray-500">
                      No services found.
                    </td>
                  </tr>
                ) : (
                  services.map((s) => (
                    <tr key={s.id} className="border-b">
                      <td className="py-2 pr-3">{s.name}</td>
                      <td className="py-2 pr-3"><StatusBadge status={s.status} /></td>
                      <td className="py-2 pr-3">{s.last_update ? new Date(s.last_update).toLocaleString() : "—"}</td>
                      <td className="py-2 pr-3 text-gray-600">{s.description || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <LogsViewer initialLimit={50} pollMs={8000} />
      </section>
    </div>
  );
}
