import { ReactNode } from "react";

export default function Card({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-white shadow-sm">
      {(title || actions) && (
        <header className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="text-base font-medium">{title}</h3>
          <div className="flex items-center gap-2">{actions}</div>
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
