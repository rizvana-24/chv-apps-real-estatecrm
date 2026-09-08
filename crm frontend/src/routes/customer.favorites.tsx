import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/customer/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — CHV Apps CRM" },
      { name: "description", content: "Your shortlisted properties with price change alerts." },
      { property: "og:title", content: "Favorites — CHV Apps CRM" },
      { property: "og:description", content: "Compare your shortlist and act before it is sold." },
    ],
  }),
  component: Favorites,
});

const SAVED = [
  { name: "Skyline Residences 14B", spec: "3 BHK · Mumbai West", price: "₹3.4 Cr", note: "Price unchanged", tag: "Available" },
  { name: "Marine Terrace 8C", spec: "4 BHK · Mumbai West", price: "₹7.2 Cr", note: "↓ ₹15 L since saved", tag: "Available" },
  { name: "Palm Court Villa 7", spec: "Villa · Bengaluru", price: "₹6.1 Cr", note: "Reserved 3 days ago", tag: "Reserved" },
  { name: "Harbour View 3A", spec: "3 BHK · Kochi", price: "₹2.2 Cr", note: "Sold — see similar", tag: "Sold" },
];

function Favorites() {
  return (
    <AppShell role="customer">
      <PageHeader
        eyebrow="Customer"
        title="Favorites"
        description="Your shortlist with price movement and availability alerts."
        actions={<Button variant="outline">Compare selected</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Saved" value="12" delta="4 in Mumbai West" />
        <Stat label="Price drops" value="2" delta="Up to ₹15 L" />
        <Stat label="No longer available" value="1" delta="Sold" />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {SAVED.map((s) => (
          <article key={s.name} className="border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold uppercase tracking-tight">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.spec}</p>
              </div>
              <Badge tone={s.tag === "Available" ? "solid" : "muted"}>{s.tag}</Badge>
            </div>
            <p className="mt-4 font-mono-ui text-xl tabular-nums">{s.price}</p>
            <p className="mt-1 font-mono-ui text-xs text-muted-foreground">{s.note}</p>
            <div className="mt-4 flex gap-2">
              <Button>Book visit</Button>
              <Button variant="ghost">Remove</Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
