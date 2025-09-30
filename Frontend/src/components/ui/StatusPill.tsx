export default function StatusPill({ status }: { status: string }) {
  const normalized = (status || "").toLowerCase();
  const color =
    normalized === "healthy" || normalized === "running" || normalized === "active"
      ? "bg-green-100 text-green-700 border-green-200"
      : normalized === "degraded" || normalized === "warning"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : normalized === "failed" || normalized === "error"
      ? "bg-red-100 text-red-700 border-red-200"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${color}`}>
      {status || "unknown"}
    </span>
  );
}
