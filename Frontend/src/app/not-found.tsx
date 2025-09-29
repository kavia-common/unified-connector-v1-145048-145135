import React from "react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="border rounded-md p-6" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold">404 – Page Not Found</h1>
        <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
      </section>
    </div>
  );
}
