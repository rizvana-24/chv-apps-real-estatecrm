import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, PageHeader, Panel, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/agent/customers")({
  head: () => ({
    meta: [
      { title: "My Customers — CHV Apps CRM" },
      { name: "description", content: "Agent view of active customers, budgets and preferences." },
      { property: "og:title", content: "My Customers — CHV Apps CRM" },
      { property: "og:description", content: "Keep every buyer relationship warm and documented." },
    ],
  }),
  component: MyCustomers,
});

const CUSTOMERS = [
  { name: "Ananya Rao", budget: "₹2 – 3 Cr", want: "3 BHK · Bengaluru · Ready to move", stage: "Negotiation", last: "Call · yesterday" },
  { name: "Rohit Menon", budget: "₹80 L – 1.2 Cr", want: "2 BHK · Kochi · Sea facing", stage: "Site visit", last: "WhatsApp · 2 days" },
  { name: "Nikhil Bansal", budget: "₹3 – 4 Cr", want: "Villa · Pune · Gated", stage: "Proposal", last: "Email · today" },
  { name: "Divya Suresh", budget: "₹1 – 1.5 Cr", want: "2 BHK · Hyderabad · Metro nearby", stage: "New", last: "Form fill · today" },
];

function MyCustomers() {
  return (
    <AppShell role="agent">
      <PageHeader
        eyebrow="Agent"
        title="My customers"
        description="Requirements, budget bands and the last touchpoint for each relationship."
        actions={<Button>Add customer</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active customers" value="27" delta="4 added this week" />
        <Stat label="In negotiation" value="6" delta="₹14 Cr potential" />
        <Stat label="Awaiting docs" value="3" delta="Chase today" />
        <Stat label="Closed (YTD)" value="19" delta="₹22 Cr" />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {CUSTOMERS.map((c) => (
          <Panel key={c.name} title={c.name} aside={<Badge tone="solid">{c.stage}</Badge>}>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="label-caps text-muted-foreground">Budget</dt>
                <dd className="font-mono-ui tabular-nums">{c.budget}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label-caps text-muted-foreground">Looking for</dt>
                <dd className="text-right">{c.want}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label-caps text-muted-foreground">Last touch</dt>
                <dd className="text-muted-foreground">{c.last}</dd>
              </div>
            </dl>
            <div className="mt-4 flex gap-2">
              <Button variant="outline">Message</Button>
              <Button variant="ghost">Timeline</Button>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
