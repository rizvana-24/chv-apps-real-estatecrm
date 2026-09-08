import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, DataTable, PageHeader, Panel, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/super-admin/")({
  head: () => ({
    meta: [
      { title: "Super Admin Dashboard — CHV Apps CRM" },
      { name: "description", content: "Super admin dashboard for CHV Apps real estate CRM platform governance." },
      { property: "og:title", content: "Super Admin Dashboard — CHV Apps CRM" },
      { property: "og:description", content: "Platform overview, admin and user management, system reports and settings." },
    ],
  }),
  component: SuperAdminDashboard,
});

const QUICK_LINKS = [
  { label: "Admin Management", to: "/super-admin/admins", description: "Create, suspend and audit CRM admins." },
  { label: "User Management", to: "/super-admin/users", description: "Directory of every agent, customer and staff account." },
  { label: "System Reports", to: "/super-admin/system-reports", description: "Infrastructure health, jobs and audit trails." },
  { label: "Property Management", to: "#", description: "Coming soon — platform-wide listing oversight." },
  { label: "Settings", to: "#", description: "Coming soon — platform configuration and policies." },
];

const ACTIVITY = [
  ["10:32", "neha@chvapps.com", "Suspended admin", "ADM-004", <Badge tone="solid">Success</Badge>],
  ["09:58", "system", "Nightly backup", "db-primary", <Badge tone="solid">Success</Badge>],
  ["09:41", "rahul@chvapps.com", "Bulk listing import", "412 rows", <Badge>Partial</Badge>],
  ["08:20", "system", "Token rotation", "jwt-signing-key", <Badge tone="solid">Success</Badge>],
  ["07:03", "simran@chvapps.com", "Report export", "Q3 revenue", <Badge tone="muted">Queued</Badge>],
];

function SuperAdminDashboard() {
  return (
    <AppShell role="super-admin">
      <PageHeader
        eyebrow="Super admin"
        title="Dashboard"
        description="Platform overview, governance controls and quick access to every super admin workspace."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total admins" value="18" delta="+2 this quarter" />
        <Stat label="All users" value="12,486" delta="+412 in 30 days" />
        <Stat label="Uptime" value="99.98%" delta="2 incidents resolved" />
        <Stat label="Storage" value="1.4 TB" delta="Media + documents" />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Panel title="Quick access">
          <div className="grid gap-3 sm:grid-cols-2">
            {QUICK_LINKS.map((item) => {
              const isDisabled = item.to === "#";
              const content = (
                <div
                  className={`flex flex-col border border-border bg-card p-5 transition-colors ${
                    isDisabled ? "opacity-60" : "hover:bg-accent"
                  }`}
                >
                  <h3 className="text-sm font-bold uppercase tracking-tight">{item.label}</h3>
                  <p className="mt-2 flex-1 text-xs text-muted-foreground">{item.description}</p>
                  <span className="label-caps mt-4 text-foreground">
                    {isDisabled ? "Coming soon" : "Open →"}
                  </span>
                </div>
              );

              return isDisabled ? (
                <div key={item.label}>{content}</div>
              ) : (
                <Link key={item.label} to={item.to}>
                  {content}
                </Link>
              );
            })}
          </div>
        </Panel>

        <Panel title="Platform status">
          <ul className="space-y-4 text-sm">
            <li className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">API latency (p95)</span>
              <span className="font-mono-ui font-semibold">184ms</span>
            </li>
            <li className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Failed jobs</span>
              <span className="font-mono-ui font-semibold">0</span>
            </li>
            <li className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Pending invites</span>
              <span className="font-mono-ui font-semibold">2</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Blocked users</span>
              <span className="font-mono-ui font-semibold">34</span>
            </li>
          </ul>
        </Panel>
      </div>

      <div className="mt-5">
        <Panel title="Recent activity">
          <DataTable
            columns={["Time", "Actor", "Action", "Target", "Result"]}
            rows={ACTIVITY}
          />
        </Panel>
      </div>
    </AppShell>
  );
}

