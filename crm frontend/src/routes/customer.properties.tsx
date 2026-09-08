import { createFileRoute } from '@tanstack/react-router'
import {Link} from '@tanstack/react-router'
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, Field, PageHeader, Panel } from "@/components/crm/ui";


export const Route = createFileRoute("/customer/properties")({
  head: () => ({
    meta: [
      { title: "Browse Properties — CHV Apps CRM" },
      { name: "description", content: "Search verified CHV Apps listings by city, budget and configuration." },
      { property: "og:title", content: "Browse Properties — CHV Apps CRM" },
      { property: "og:description", content: "Filter verified homes, offices and plots in seconds." },
    ],
  }),
  component: BrowseProperties,
});

const RESULTS = [
  { name: "Skyline Residences 14B", spec: "3 BHK · 1,840 sqft · Mumbai West", price: "₹3.4 Cr", tag: "Verified" },
  { name: "Marine Terrace 8C", spec: "4 BHK · 2,610 sqft · Mumbai West", price: "₹7.2 Cr", tag: "New" },
  { name: "Cyber Heights 19F", spec: "2 BHK · 1,180 sqft · Hyderabad", price: "₹1.9 Cr", tag: "Verified" },
  { name: "Palm Court Villa 7", spec: "Villa · 3,900 sqft · Bengaluru", price: "₹6.1 Cr", tag: "Reserved" },
  { name: "Green Acres Plot 22", spec: "Land · 4,000 sqft · Pune", price: "₹1.2 Cr", tag: "Verified" },
  { name: "Harbour View 3A", spec: "3 BHK · 1,610 sqft · Kochi", price: "₹2.2 Cr", tag: "Sold" },
];

function BrowseProperties() {
  return (
    <AppShell role="customer">
      <PageHeader
        eyebrow="Customer"
        title="Browse properties"
        description="4,182 verified listings. Filter by city, budget and configuration."
        actions={<Button variant="outline">Saved searches</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <Panel title="Filters">
          <div className="space-y-4">
            <Field label="Location" placeholder="City or locality" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Min budget" placeholder="₹50 L" />
              <Field label="Max budget" placeholder="₹5 Cr" />
            </div>
            <div>
              <span className="label-caps text-muted-foreground">Type</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Apartment", "Villa", "Plot", "Office"].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 border border-input px-2 py-2 text-xs"
                  >
                    <input type="checkbox" className="size-3.5 accent-foreground" />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <Button className="w-full">Apply filters</Button>
          </div>
        </Panel>

        <div className="grid gap-5 md:grid-cols-2">
          {RESULTS.map((r) => (
            <article key={r.name} className="border border-border bg-card">
              <div className="flex h-36 items-center justify-center border-b border-border bg-muted">
                <span className="label-caps text-muted-foreground">Listing photo</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold uppercase tracking-tight">{r.name}</h3>
                  <Badge tone={r.tag === "Sold" ? "muted" : "solid"}>{r.tag}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.spec}</p>
                <p className="mt-3 font-mono-ui text-xl tabular-nums">{r.price}</p>
                <div className="mt-4 flex gap-2">
                  <Button>Enquire</Button>
                  <Link
                    to="/customer/favorites"
                    className="inline-flex items-center border border-foreground px-4 py-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] hover:bg-accent"
                  >
                    Save
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
