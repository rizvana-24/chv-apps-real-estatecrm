import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Panel, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/agent/site-visits")({
  head: () => ({
    meta: [
      { title: "Site Visits — CHV Apps CRM" },
      { name: "description", content: "Plan, confirm and log property site visits with feedback." },
      { property: "og:title", content: "Site Visits — CHV Apps CRM" },
      { property: "og:description", content: "Your visit schedule with routes, status and feedback." },
    ],
  }),
  component: SiteVisits,
});

const VISITS = [
  ["Today 10:00", "Ananya Rao", "Skyline Residences 14B", "Mumbai West", "Confirmed"],
  ["Today 15:30", "Nikhil Bansal", "Marine Terrace 8C", "Mumbai West", "Awaiting confirm"],
  ["Tomorrow 11:00", "Divya Suresh", "Cyber Heights 19F", "Hyderabad", "Confirmed"],
  ["Thu 09:30", "Aman Sethi", "Orchid Row House 4", "Pune", "Requested"],
];

function SiteVisits() {
  return (
    <AppShell role="agent">
      <PageHeader
        eyebrow="Agent"
        title="Site visits"
        description="Upcoming visits, confirmation state and post-visit feedback capture."
        actions={
          <>
            <Button variant="outline">Route plan</Button>
            <Button>Schedule visit</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="This week" value="11" delta="2 unconfirmed" />
        <Stat label="Completed" value="6" delta="Feedback logged" />
        <Stat label="No-shows" value="1" delta="Rescheduled" />
        <Stat label="Visit → offer" value="32%" delta="Last 90 days" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <DataTable
          columns={["When", "Customer", "Property", "Location", "Status", ""]}
          rows={VISITS.map((v) => [
            <span className="font-mono-ui text-xs">{v[0]}</span>,
            <span className="font-semibold">{v[1]}</span>,
            v[2],
            v[3],
            <Badge tone={v[4] === "Confirmed" ? "solid" : "outline"}>{v[4]}</Badge>,
            <Button variant="ghost">Log</Button>,
          ])}
        />
        <Panel title="Latest feedback">
          <ul className="space-y-4 text-sm">
            {[
              ["Ananya Rao", "Liked the layout, wants a higher floor."],
              ["Rohit Menon", "Budget stretch needed; asked for payment plan."],
              ["Aman Sethi", "Parking insufficient — show alternatives."],
            ].map(([n, t]) => (
              <li key={n} className="border-l-2 border-foreground pl-3">
                <p className="label-caps text-muted-foreground">{n}</p>
                <p className="mt-1">{t}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}