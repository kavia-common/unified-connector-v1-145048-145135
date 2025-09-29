"use client";

import React, { useEffect, useState } from "react";
import { listServices, startService, stopService } from "@/lib/api/endpoints";
import type { ConnectorService } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

export default function ServicesPage() {
  const [services, setServices] = useState<ConnectorService[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toMessage = (err: unknown, fallback: string) => {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    return fallback;
  };

  const refresh = async () => {
    setError(null);
    try {
      setLoading(true);
      const s = await listServices();
      setServices(s);
    } catch (e: unknown) {
      setError(toMessage(e, "Failed to load services"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleStart = async (id: string) => {
    setBusy(id);
    setError(null);
    try {
      await startService(id);
      await refresh();
    } catch (e: unknown) {
      setError(toMessage(e, "Failed to start service"));
    } finally {
      setBusy(null);
    }
  };

  const handleStop = async (id: string) => {
    setBusy(id);
    setError(null);
    try {
      await stopService(id);
      await refresh();
    } catch (e: unknown) {
      setError(toMessage(e, "Failed to stop service"));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-gray-600 text-sm">Manage connector services</p>
        </div>
        <button className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 text-sm" onClick={refresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {error ? <div className="p-3 border border-red-200 bg-red-50 text-red-700 rounded">{error}</div> : null}

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="py-2 px-3 font-medium">Name</th>
              <th className="py-2 px-3 font-medium">Status</th>
              <th className="py-2 px-3 font-medium">Last Update</th>
              <th className="py-2 px-3 font-medium">Actions</th>
              <th className="py-2 px-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">Loading...</td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">No services found.</td>
              </tr>
            ) : (
              services.map((s) => {
                const isBusy = busy === s.id;
                return (
                  <tr key={s.id} className="border-b">
                    <td className="py-2 px-3">{s.name}</td>
                    <td className="py-2 px-3"><StatusBadge status={s.status} /></td>
                    <td className="py-2 px-3">{s.last_update ? new Date(s.last_update).toLocaleString() : "—"}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 rounded-md border text-xs hover:bg-gray-100 disabled:opacity-60"
                          onClick={() => handleStart(s.id)}
                          disabled={isBusy || s.status === "running" || s.status === "starting"}
                        >
                          Start
                        </button>
                        <button
                          className="px-2 py-1 rounded-md border text-xs hover:bg-gray-100 disabled:opacity-60"
                          onClick={() => handleStop(s.id)}
                          disabled={isBusy || s.status === "stopped" || s.status === "error"}
                        >
                          Stop
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-gray-600">{s.description || "—"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
