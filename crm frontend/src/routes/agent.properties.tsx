import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/agent/properties")({
  head: () => ({
    meta: [
      { title: "My Properties — CHV Apps CRM" },
      { name: "description", content: "Listings assigned to you with enquiry and visit counts." },
      { property: "og:title", content: "My Properties — CHV Apps CRM" },
      { property: "og:description", content: "Manage your own listing portfolio and its demand." },
    ],
  }),
  component: MyProperties,
});

const LISTINGS = [
  { code: "PRP-2201", name: "Skyline Residences 14B", spec: "3 BHK · 1,840 sqft · Mumbai West", price: "₹3.4 Cr", status: "Available", enq: 24, visits: 6 },
  { code: "PRP-2206", name: "Cyber Heights 19F", spec: "2 BHK · 1,180 sqft · Hyderabad", price: "₹1.9 Cr", status: "Reserved", enq: 18, visits: 4 },
  { code: "PRP-2211", name: "Marine Terrace 8C", spec: "4 BHK · 2,610 sqft · Mumbai West", price: "₹7.2 Cr", status: "Available", enq: 31, visits: 9 },
  { code: "PRP-2219", name: "Orchid Row House 4", spec: "Villa · 3,200 sqft · Pune", price: "₹4.1 Cr", status: "Draft", enq: 0, visits: 0 },
];

function MyProperties() {
  return (
    <AppShell role="agent">
      <PageHeader
        eyebrow="Agent"
        title="My properties"
        description="Your assigned portfolio, with live demand signals per listing."
        actions={<Button>Add listing</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="My listings" value="38" delta="2 drafts" />
        <Stat label="Enquiries" value="112" delta="+19 this week" />
        <Stat label="Visits booked" value="27" delta="6 this week" />
        <Stat label="Offers received" value="9" delta="3 pending" />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
        {LISTINGS.map((l) => (
          <article key={l.code} className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono-ui text-xs">{l.code}</span>
              <Badge tone={l.status === "Available" ? "solid" : "outline"}>{l.status}</Badge>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold uppercase tracking-tight">{l.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{l.spec}</p>
              <p className="mt-4 font-mono-ui text-2xl tabular-nums">{l.price}</p>
              <div className="mt-4 grid grid-cols-2 border-t border-border pt-4">
                <div>
                  <p className="label-caps text-muted-foreground">Enquiries</p>
                  <p className="font-mono-ui text-lg tabular-nums">{l.enq}</p>
                </div>
                <div>
                  <p className="label-caps text-muted-foreground">Visits</p>
                  <p className="font-mono-ui text-lg tabular-nums">{l.visits}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="ghost">Share</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
