import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[1.1fr_1fr]">
      <section className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <Link to="/" className="block">
          <span className="text-xl font-extrabold uppercase tracking-[0.22em]">CHV Apps</span>
          <span className="label-caps mt-1 block opacity-60">Real Estate CRM</span>
        </Link>
        <div>
          <p className="max-w-md text-4xl font-extrabold uppercase leading-tight tracking-tight">
            Every listing, lead and site visit in one monochrome workspace.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-6">
            {[
              ["Listings", "4,182"],
              ["Agents", "126"],
              ["Closed", "$92M"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label-caps opacity-60">{k}</dt>
                <dd className="mt-1 font-mono-ui text-2xl tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="label-caps opacity-50">ISO 27001 · JWT secured sessions</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 md:px-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 block lg:hidden">
            <span className="text-lg font-extrabold uppercase tracking-[0.2em]">CHV Apps</span>
          </Link>
          <p className="label-caps text-muted-foreground">{subtitle}</p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight">{title}</h1>
          <div className="mt-8 space-y-5">{children}</div>
          {footer ? (
            <div className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
              {footer}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}