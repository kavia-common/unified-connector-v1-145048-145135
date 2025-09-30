export default function NotFound() {
  return (
    <div className="min-h-[40vh] grid place-items-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">404 – Page Not Found</h1>
        <p className="text-sm text-gray-600">
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </div>
  );
}
