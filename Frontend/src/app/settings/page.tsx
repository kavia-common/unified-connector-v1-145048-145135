"use client";

import React from "react";

export default function SettingsPage() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "(not set)";
  const ws = process.env.NEXT_PUBLIC_WS_URL || "(not set)";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "(not set)";
  const mockAuth = (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH || "true").toLowerCase() === "true";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-600 text-sm">Environment and configuration</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">Backend URL</div>
          <div className="mt-1 font-mono text-sm break-all">{backend}</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">WebSocket URL</div>
          <div className="mt-1 font-mono text-sm break-all">{ws}</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">Site URL</div>
          <div className="mt-1 font-mono text-sm break-all">{site}</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm text-gray-600">Mock Auth Enabled</div>
          <div className="mt-1 font-mono text-sm">{String(mockAuth)}</div>
          <div className="mt-2 text-xs text-gray-500">
            This is a development convenience. Replace with a real auth provider for production.
          </div>
        </div>
      </section>
    </div>
  );
}
