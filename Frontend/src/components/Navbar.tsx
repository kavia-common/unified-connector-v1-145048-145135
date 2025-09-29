"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/services", label: "Services" },
  { href: "/logs", label: "Logs" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, login, logout } = useSession();

  return (
    <nav className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-lg">Unified Connector</span>
          <ul className="hidden md:flex items-center gap-3">
            {navItems.map((it) => {
              const active = pathname === it.href;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      active ? "bg-black text-white" : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm text-gray-600">Signed in as {user.name || user.email}</span>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-md border hover:bg-gray-50 text-sm"
                aria-label="Sign out"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="px-3 py-1.5 rounded-md bg-black text-white text-sm"
              aria-label="Sign in"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
