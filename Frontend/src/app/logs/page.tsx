"use client";

import LogsViewer from "@/components/LogsViewer";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Logs</h1>
        <p className="text-gray-600 text-sm">Live and recent logs from the connector</p>
      </header>
      <LogsViewer initialLimit={100} pollMs={5000} />
    </div>
  );
}
