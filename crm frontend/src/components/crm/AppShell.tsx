import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type Role = "super-admin" | "admin" | "agent" | "customer";

const NAV: Record<Role, { label: string; to: string }[]> = {
  "super-admin": [
    { label: "Manage Admins", to: "/super-admin/admins" },
    { label: "Manage Users", to: "/super-admin/users" },
    { label: "System Reports", to: "/super-admin/system-reports" },
    { label: "Analytics", to: "/analytics" },
  ],
  admin: [
    { label: "Properties", to: "/admin/properties" },
    { label: "Agents", to: "/admin/agents" },
    { label: "Customers", to: "/admin/customers" },
    { label: "Leads", to: "/admin/leads" },
    { label: "Appointments", to: "/admin/appointments" },
    { label: "Reports", to: "/admin/reports" },
    { label: "Analytics", to: "/analytics" },
  ],
  agent: [
    { label: "My Leads", to: "/agent/leads" },
    { label: "My Customers", to: "/agent/customers" },
    { label: "My Properties", to: "/agent/properties" },
    { label: "Site Visits", to: "/agent/site-visits" },
    { label: "Chat", to: "/agent/chat" },
  ],
  customer: [
    { label: "Browse Properties", to: "/customer/properties" },
    { label: "Enquiries", to: "/customer/enquiries" },
    { label: "Appointments", to: "/customer/appointments" },
    { label: "Favorites", to: "/customer/favorites" },
    { label: "Chat With Agent", to: "/customer/chat" },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  "super-admin": "Super Admin",
  admin: "Admin",
  agent: "Agent",
  customer: "Customer",
};

export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
        <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-5">
          <Link to="/" className="block">
            <span className="block text-lg font-extrabold uppercase tracking-[0.18em]">
              CHV Apps
            </span>
            <span className="label-caps text-sidebar-foreground/60">Real Estate CRM</span>
          </Link>
        </div>

        <div className="border-b border-sidebar-border px-5 py-4">
          <p className="label-caps text-sidebar-foreground/60">Signed in as</p>
          <p className="mt-1 text-sm font-semibold">{ROLE_LABEL[role]}</p>
        </div>

        <nav className="flex flex-wrap gap-1 p-3 lg:flex-col lg:flex-nowrap">
          {NAV[role].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{
                className:
                  "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary",
              }}
              inactiveProps={{
                className:
                  "border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              }}
              className="block border px-3 py-2 font-mono-ui text-[11px] uppercase tracking-[0.12em] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/login"
            className="block border border-sidebar-border px-3 py-2 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            Sign out
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-12">{children}</main>
    </div>
  );
}
