import ConnectorsTable from "@/components/connectors/ConnectorsTable";

export const metadata = {
  title: "Connectors • Unified Connector",
  description: "Manage and monitor connectors",
};

export default function ConnectorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Connectors</h1>
        <p className="text-sm text-gray-600">Manage your connectors and run syncs.</p>
      </div>
      <ConnectorsTable />
    </div>
  );
}
