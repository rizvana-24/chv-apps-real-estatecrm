import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Panel, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [
      { title: "Leads — CHV Apps CRM" },
      { name: "description", content: "Lead pipeline with source, score, owner and next action." },
      { property: "og:title", content: "Leads — CHV Apps CRM" },
      { property: "og:description", content: "Route and qualify every inbound real estate lead." },
    ],
  }),
  component: LeadsPage,
});

const STAGES = [
  { stage: "New", count: 214 },
  { stage: "Contacted", count: 168 },
  { stage: "Qualified", count: 96 },
  { stage: "Site visit", count: 61 },
  { stage: "Negotiation", count: 34 },
  { stage: "Won", count: 22 },
];

const LEADS = [
  ["LED-5510", "Ananya Rao", "Website", "92", "Kabir Shah", "Qualified", "Call today 4 PM"],
  ["LED-5511", "Rohit Menon", "Portal", "78", "Meera Pillai", "Contacted", "Share brochure"],
  ["LED-5512", "Priya Sharma", "Referral", "88", "Devansh Gupta", "Site visit", "Confirm cab"],
  ["LED-5513", "Vikram Joshi", "Walk-in", "54", "Unassigned", "New", "Assign agent"],
  ["LED-5514", "Sana Khan", "Campaign", "71", "Imran Qureshi", "Negotiation", "Revise offer"],
];

function LeadsPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Admin"
        title="Leads"
        description="Pipeline overview with source attribution, lead score and next best action."
        actions={
          <>
            <Button variant="outline">Auto-assign</Button>
            <Button>New lead</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Open leads" value="573" delta="+64 this week" />
        <Stat label="Unassigned" value="41" delta="SLA 2 hours" />
        <Stat label="Avg. score" value="74" delta="Model v3" />
        <Stat label="Win rate" value="21%" delta="+3 pts QoQ" />
      </div>

      <div className="mt-5">
        <Panel title="Pipeline">
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {STAGES.map((s) => (
              <div key={s.stage} className="border border-border p-4">
                <p className="label-caps text-muted-foreground">{s.stage}</p>
                <p className="mt-2 font-mono-ui text-2xl tabular-nums">{s.count}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-5">
        <DataTable
          columns={["ID", "Lead", "Source", "Score", "Owner", "Stage", "Next action"]}
          rows={LEADS.map((l) => [
            <span className="font-mono-ui text-xs">{l[0]}</span>,
            <span className="font-semibold">{l[1]}</span>,
            <Badge tone="muted">{l[2]}</Badge>,
            <span className="font-mono-ui tabular-nums">{l[3]}</span>,
            l[4],
            <Badge tone={l[5] === "New" ? "outline" : "solid"}>{l[5]}</Badge>,
            <span className="text-muted-foreground">{l[6]}</span>,
          ])}
        />
      </div>
    </AppShell>
  );
}