"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import StatusPill from "@/components/ui/StatusPill";
import { Loader, ErrorBox } from "@/components/ui/Feedback";
import { api } from "@/lib/api/client";

type Connector = {
  id: string;
  name: string;
  status: string;
  lastSync?: string;
};

export default function ConnectorsTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Connector[]>([]);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await api.listConnectors();
    if (!res.ok) {
      setError(res.error?.message || "Unable to load connectors");
      setRows([]);
    } else {
      setRows(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const triggerSync = async (id: string) => {
    setSyncingId(id);
    const res = await api.triggerSync(id);
    if (!res.ok) {
      alert(res.error?.message || "Failed to trigger sync");
    } else {
      // refresh list after triggering
      await load();
    }
    setSyncingId(null);
  };

  return (
    <Card title="Connectors">
      {loading ? (
        <Loader label="Loading connectors..." />
      ) : error ? (
        <ErrorBox message={error} />
      ) : rows.length === 0 ? (
        <p className="text-sm text-gray-600">No connectors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Last Sync</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr className="border-t" key={r.id}>
                  <td className="py-2 pr-4 font-medium">{r.name}</td>
                  <td className="py-2 pr-4">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="py-2 pr-4">
                    {r.lastSync ? new Date(r.lastSync).toLocaleString() : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    <button
                      onClick={() => triggerSync(r.id)}
                      disabled={syncingId === r.id}
                      className="text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      {syncingId === r.id ? "Syncing..." : "Trigger Sync"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
