import SystemStatus from "@/components/status/SystemStatus";
import ConnectorsTable from "@/components/connectors/ConnectorsTable";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Monitor platform health and manage connectors.
        </p>
      </div>
      <div className="grid gap-6">
        <SystemStatus />
        <ConnectorsTable />
        <LoginForm />
      </div>
    </div>
  );
}
