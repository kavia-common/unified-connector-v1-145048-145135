"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { useSession } from "@/lib/hooks/useSession";
import { Loader, ErrorBox } from "@/components/ui/Feedback";

/**
 * Simple username/password login form which calls /auth/login and stores token.
 * This is optional scaffolding depending on backend availability.
 */
export default function LoginForm() {
  const { login, loading, error, isAuthenticated } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) {
    return null;
  }

  return (
    <Card title="Sign in">
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await login(username, password);
        }}
      >
        {error ? <ErrorBox message={error} /> : null}
        <div className="space-y-1">
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="your@email.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 rounded-md bg-black text-white text-sm hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        {loading ? <Loader label="Authenticating..." /> : null}
      </form>
    </Card>
  );
}
