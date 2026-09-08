import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Panel, ProgressRows, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/super-admin/users")({
  head: () => ({
    meta: [
      { title: "Manage Users — CHV Apps CRM" },
      { name: "description", content: "Directory of every agent, customer and staff account in CHV Apps." },
      { property: "og:title", content: "Manage Users — CHV Apps CRM" },
      { property: "og:description", content: "Search, filter and moderate all CRM user accounts." },
    ],
  }),
  component: ManageUsers,
});

const USERS = [
  ["USR-4410", "Kabir Shah", "Agent", "Mumbai West", "Verified", "2 min ago"],
  ["USR-4411", "Ananya Rao", "Customer", "Bengaluru", "Verified", "18 min ago"],
  ["USR-4412", "Devansh Gupta", "Agent", "Delhi NCR", "Pending KYC", "1 hr ago"],
  ["USR-4413", "Meera Pillai", "Customer", "Kochi", "Verified", "3 hr ago"],
  ["USR-4414", "Tanvi Desai", "Agent", "Pune", "Blocked", "Yesterday"],
  ["USR-4415", "Imran Qureshi", "Customer", "Hyderabad", "Verified", "Yesterday"],
];

function ManageUsers() {
  return (
    <AppShell role="super-admin">
      <PageHeader
        eyebrow="Super admin"
        title="Manage users"
        description="Every account across the platform, with verification state and last activity."
        actions={
          <>
            <Button variant="outline">Bulk import</Button>
            <Button>Invite user</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="All users" value="12,486" delta="+412 in 30 days" />
        <Stat label="Agents" value="126" delta="98 active weekly" />
        <Stat label="Customers" value="12,342" delta="61% mobile" />
        <Stat label="Blocked" value="34" delta="Fraud screening" />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["All", "Agents", "Customers", "Pending KYC", "Blocked"].map((f, i) => (
              <Button key={f} variant={i === 0 ? "solid" : "outline"}>
                {f}
              </Button>
            ))}
          </div>
          <DataTable
            columns={["ID", "Name", "Role", "Region", "Status", "Last seen"]}
            rows={USERS.map((u) => [
              <span className="font-mono-ui text-xs">{u[0]}</span>,
              <span className="font-semibold">{u[1]}</span>,
              <Badge tone="muted">{u[2]}</Badge>,
              u[3],
              <Badge tone={u[4] === "Verified" ? "solid" : "outline"}>{u[4]}</Badge>,
              <span className="text-muted-foreground">{u[5]}</span>,
            ])}
          />
        </div>
        <Panel title="Signups by region">
          <ProgressRows
            data={[
              { label: "Mumbai West", value: 3120 },
              { label: "Bengaluru", value: 2740 },
              { label: "Delhi NCR", value: 2310 },
              { label: "Pune", value: 1580 },
              { label: "Hyderabad", value: 1240 },
            ]}
          />
        </Panel>
      </div>
    </AppShell>
  );
}