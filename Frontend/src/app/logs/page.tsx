"use client";

import React from "react";
import LogsViewer from "@/components/LogsViewer";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Logs</h1>
        <p className="text-gray-600 text-sm">Recent connector logs</p>
      </header>

      <LogsViewer initialLimit={100} pollMs={7000} />
    </div>
  );
}
