import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Panel, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/admin/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — CHV Apps CRM" },
      { name: "description", content: "Company-wide schedule of viewings, calls and document signings." },
      { property: "og:title", content: "Appointments — CHV Apps CRM" },
      { property: "og:description", content: "Coordinate every viewing and meeting across agents." },
    ],
  }),
  component: AppointmentsPage,
});

const SLOTS = [
  ["09:00", "Site visit", "Ananya Rao", "Skyline Residences 14B", "Kabir Shah", "Confirmed"],
  ["11:30", "Video call", "Priya Sharma", "Metro Square Office", "Devansh Gupta", "Confirmed"],
  ["13:00", "Document signing", "Sana Khan", "Cyber Heights 19F", "Imran Qureshi", "Pending"],
  ["15:30", "Site visit", "Rohit Menon", "Harbour View 3A", "Meera Pillai", "Rescheduled"],
  ["17:00", "Valuation", "Vikram Joshi", "Green Acres Plot 22", "Tanvi Desai", "Confirmed"],
];

function AppointmentsPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Admin"
        title="Appointments"
        description="Today's company-wide schedule with agent, customer and property context."
        actions={
          <>
            <Button variant="outline">Week view</Button>
            <Button>Schedule</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Today" value="38" delta="12 site visits" />
        <Stat label="This week" value="214" delta="+18 vs last week" />
        <Stat label="No-show rate" value="6%" delta="-2 pts" />
        <Stat label="Avg. duration" value="42m" delta="Per viewing" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <DataTable
          columns={["Time", "Type", "Customer", "Property", "Agent", "Status"]}
          rows={SLOTS.map((s) => [
            <span className="font-mono-ui tabular-nums">{s[0]}</span>,
            <Badge tone="muted">{s[1]}</Badge>,
            <span className="font-semibold">{s[2]}</span>,
            s[3],
            s[4],
            <Badge tone={s[5] === "Confirmed" ? "solid" : "outline"}>{s[5]}</Badge>,
          ])}
        />
        <Panel title="Agent load — today">
          <ul className="divide-y divide-border">
            {[
              ["Kabir Shah", "6 slots"],
              ["Devansh Gupta", "5 slots"],
              ["Meera Pillai", "4 slots"],
              ["Tanvi Desai", "3 slots"],
              ["Imran Qureshi", "3 slots"],
            ].map(([n, v]) => (
              <li key={n} className="flex items-center justify-between py-3 text-sm">
                <span>{n}</span>
                <span className="font-mono-ui text-xs text-muted-foreground">{v}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}