"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import StatusPill from "@/components/ui/StatusPill";
import { Loader, ErrorBox } from "@/components/ui/Feedback";
import { api } from "@/lib/api/client";

type Health = {
  status: string;
  uptime?: number;
  version?: string;
};

export default function SystemStatus() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await api.status();
    if (!res.ok) {
      setError(res.error?.message || "Failed to load system status");
      setData(null);
    } else {
      setData(res.data || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 10000); // poll every 10s
    return () => clearInterval(id);
  }, []);

  return (
    <Card title="System Status" actions={
      <button onClick={load} className="text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50">
        Refresh
      </button>
    }>
      {loading ? (
        <Loader label="Checking system health..." />
      ) : error ? (
        <ErrorBox message={error} />
      ) : !data ? (
        <p className="text-sm text-gray-600">No data.</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-gray-500">Status</div>
            <StatusPill status={data.status} />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500">Uptime</div>
            <div className="text-sm">
              {typeof data.uptime === "number" ? `${Math.floor(data.uptime)}s` : "—"}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500">Version</div>
            <div className="text-sm">{data.version || "—"}</div>
          </div>
        </div>
      )}
    </Card>
  );
}
