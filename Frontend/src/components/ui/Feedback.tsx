export function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm"
    >
      {message}
    </div>
  );
}
