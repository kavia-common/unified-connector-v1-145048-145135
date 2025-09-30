import SystemStatus from "@/components/status/SystemStatus";
import Card from "@/components/ui/Card";

export const metadata = {
  title: "Monitoring • Unified Connector",
  description: "System health and metrics overview",
};

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Monitoring</h1>
        <p className="text-sm text-gray-600">Platform health and telemetry.</p>
      </div>

      <SystemStatus />

      <div className="grid sm:grid-cols-2 gap-6">
        <Card title="Throughput (placeholder)">
          <div className="text-sm text-gray-600">Add charts here once metrics are available.</div>
        </Card>
        <Card title="Latency (placeholder)">
          <div className="text-sm text-gray-600">Add charts here once metrics are available.</div>
        </Card>
      </div>
    </div>
  );
}
