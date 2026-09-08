import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/agent/leads")({
  head: () => ({
    meta: [
      { title: "My Leads — CHV Apps CRM" },
      { name: "description", content: "Agent workspace for assigned leads, scores and follow-ups." },
      { property: "og:title", content: "My Leads — CHV Apps CRM" },
      { property: "og:description", content: "Work your assigned pipeline with next actions and SLAs." },
    ],
  }),
  component: MyLeads,
});

const LEADS = [
  ["Ananya Rao", "Website", "92", "Qualified", "Call today 4 PM", "2h left"],
  ["Rohit Menon", "Portal", "78", "Contacted", "Share brochure", "Tomorrow"],
  ["Nikhil Bansal", "Referral", "84", "Site visit", "Confirm slot", "5h left"],
  ["Divya Suresh", "Campaign", "66", "New", "First call", "Overdue"],
  ["Aman Sethi", "Walk-in", "58", "Contacted", "Send price sheet", "Tomorrow"],
];

function MyLeads() {
  return (
    <AppShell role="agent">
      <PageHeader
        eyebrow="Agent"
        title="My leads"
        description="Leads assigned to you, ordered by score and follow-up urgency."
        actions={
          <>
            <Button variant="outline">Filter</Button>
            <Button>Log activity</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Assigned" value="38" delta="6 new today" />
        <Stat label="Follow-ups due" value="9" delta="1 overdue" />
        <Stat label="Site visits booked" value="5" delta="This week" />
        <Stat label="Conversion" value="24%" delta="Above team avg." />
      </div>

      <div className="mt-8">
        <DataTable
          columns={["Lead", "Source", "Score", "Stage", "Next action", "SLA", ""]}
          rows={LEADS.map((l) => [
            <span className="font-semibold">{l[0]}</span>,
            <Badge tone="muted">{l[1]}</Badge>,
            <span className="font-mono-ui tabular-nums">{l[2]}</span>,
            <Badge tone={l[3] === "New" ? "outline" : "solid"}>{l[3]}</Badge>,
            l[4],
            <span className={l[5] === "Overdue" ? "font-semibold" : "text-muted-foreground"}>
              {l[5]}
            </span>,
            <Button variant="ghost">Open</Button>,
          ])}
        />
      </div>
    </AppShell>
  );
}
