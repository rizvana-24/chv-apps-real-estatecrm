import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/super-admin/admins")({
  head: () => ({
    meta: [
      { title: "Manage Admins — CHV Apps CRM" },
      { name: "description", content: "Super admin console to create, suspend and audit CRM admins." },
      { property: "og:title", content: "Manage Admins — CHV Apps CRM" },
      { property: "og:description", content: "Control admin roles, regions and permissions." },
    ],
  }),
  component: ManageAdmins,
});

const ADMINS = [
  ["ADM-001", "Neha Verma", "neha@chvapps.com", "Mumbai West", "Full access", "Active"],
  ["ADM-002", "Rahul Iyer", "rahul@chvapps.com", "Bengaluru", "Listings + Leads", "Active"],
  ["ADM-003", "Simran Kaur", "simran@chvapps.com", "Delhi NCR", "Reports only", "Invited"],
  ["ADM-004", "Arjun Nair", "arjun@chvapps.com", "Pune", "Full access", "Suspended"],
  ["ADM-005", "Fatima Sheikh", "fatima@chvapps.com", "Hyderabad", "Listings + Leads", "Active"],
];

function ManageAdmins() {
  return (
    <AppShell role="super-admin">
      <PageHeader
        eyebrow="Super admin"
        title="Manage admins"
        description="Create admin accounts, scope their regions and revoke access instantly."
        actions={
          <>
            <Button variant="outline">Export CSV</Button>
            <Button>New admin</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total admins" value="18" delta="+2 this quarter" />
        <Stat label="Active" value="15" delta="83% of seats" />
        <Stat label="Pending invites" value="2" delta="Expire in 5 days" />
        <Stat label="Suspended" value="1" delta="Policy violation" />
      </div>

      <div className="mt-8">
        <DataTable
          columns={["ID", "Name", "Email", "Region", "Permissions", "Status", ""]}
          rows={ADMINS.map((a) => [
            <span className="font-mono-ui text-xs">{a[0]}</span>,
            <span className="font-semibold">{a[1]}</span>,
            <span className="text-muted-foreground">{a[2]}</span>,
            a[3],
            <Badge tone="muted">{a[4]}</Badge>,
            <Badge tone={a[5] === "Active" ? "solid" : "outline"}>{a[5]}</Badge>,
            <Button variant="ghost">Manage</Button>,
          ])}
        />
      </div>
    </AppShell>
  );
}