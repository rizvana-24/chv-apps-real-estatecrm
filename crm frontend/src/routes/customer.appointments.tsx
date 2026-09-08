 import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, PageHeader, Panel, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/customer/appointments")({
  head: () => ({
    meta: [
      { title: "My Appointments — CHV Apps CRM" },
      { name: "description", content: "Your upcoming property viewings, calls and document signings." },
      { property: "og:title", content: "My Appointments — CHV Apps CRM" },
      { property: "og:description", content: "Reschedule or confirm visits with your agent in one tap." },
    ],
  }),
  component: CustomerAppointments,
});

const UPCOMING = [
  { when: "Sat 10:00 AM", type: "Site visit", property: "Skyline Residences 14B", agent: "Kabir Shah", status: "Confirmed" },
  { when: "Sat 11:30 AM", type: "Site visit", property: "Marine Terrace 8C", agent: "Kabir Shah", status: "Confirmed" },
  { when: "Mon 04:00 PM", type: "Video call", property: "Cyber Heights 19F", agent: "Imran Qureshi", status: "Awaiting confirm" },
];

function CustomerAppointments() {
  return (
    <AppShell role="customer">
      <PageHeader
        eyebrow="Customer"
        title="My appointments"
        description="Confirm, reschedule or cancel your visits and calls."
        actions={<Button>Book appointment</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Upcoming" value="3" delta="2 this weekend" />
        <Stat label="Completed" value="7" delta="Feedback shared" />
        <Stat label="Cancelled" value="1" delta="By me" />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {UPCOMING.map((a) => (
            <article
              key={a.when}
              className="flex flex-col gap-4 border border-border bg-card p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="label-caps text-muted-foreground">{a.type}</p>
                <h3 className="mt-1 text-lg font-bold uppercase tracking-tight">{a.property}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.when} · with {a.agent}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={a.status === "Confirmed" ? "solid" : "outline"}>{a.status}</Badge>
                <Button variant="outline">Reschedule</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </article>
          ))}
        </div>
        <Panel title="Visit checklist">
          <ul className="space-y-3 text-sm">
            {[
              "Carry a photo ID for society entry.",
              "Gate pass is sent 2 hours before the slot.",
              "Ask for maintenance and parking charges.",
              "Share feedback right after the visit.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="font-mono-ui text-xs text-muted-foreground">—</span>
                {t}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
