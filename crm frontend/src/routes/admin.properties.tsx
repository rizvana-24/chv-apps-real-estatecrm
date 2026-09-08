import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/admin/properties")({
  head: () => ({
    meta: [
      { title: "Properties — CHV Apps CRM" },
      { name: "description", content: "Manage the full listing inventory: pricing, status and assigned agents." },
      { property: "og:title", content: "Properties — CHV Apps CRM" },
      { property: "og:description", content: "Inventory control for every CHV Apps listing." },
    ],
  }),
  component: PropertiesPage,
});

const PROPERTIES = [
  ["PRP-2201", "Skyline Residences 14B", "Apartment", "Mumbai West", "₹3.4 Cr", "Kabir Shah", "Available"],
  ["PRP-2202", "Palm Court Villa 7", "Villa", "Bengaluru", "₹6.1 Cr", "Tanvi Desai", "Reserved"],
  ["PRP-2203", "Metro Square Office", "Commercial", "Delhi NCR", "₹9.8 Cr", "Devansh Gupta", "Available"],
  ["PRP-2204", "Green Acres Plot 22", "Land", "Pune", "₹1.2 Cr", "Unassigned", "Draft"],
  ["PRP-2205", "Harbour View 3A", "Apartment", "Kochi", "₹2.2 Cr", "Meera Pillai", "Sold"],
  ["PRP-2206", "Cyber Heights 19F", "Apartment", "Hyderabad", "₹1.9 Cr", "Kabir Shah", "Available"],
];

function PropertiesPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Admin"
        title="Properties"
        description="Every listing in the inventory with pricing, ownership and publication status."
        actions={
          <>
            <Button variant="outline">Import listings</Button>
            <Button>Add property</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total listings" value="4,182" delta="+96 this month" />
        <Stat label="Available" value="2,914" delta="70% of inventory" />
        <Stat label="Reserved" value="486" delta="Tokens collected" />
        <Stat label="Sold (YTD)" value="782" delta="₹92 Cr value" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", "Apartment", "Villa", "Commercial", "Land", "Draft"].map((f, i) => (
          <Button key={f} variant={i === 0 ? "solid" : "outline"}>
            {f}
          </Button>
        ))}
      </div>

      <div className="mt-4">
        <DataTable
          columns={["ID", "Listing", "Type", "Location", "Price", "Agent", "Status", ""]}
          rows={PROPERTIES.map((p) => [
            <span className="font-mono-ui text-xs">{p[0]}</span>,
            <span className="font-semibold">{p[1]}</span>,
            <Badge tone="muted">{p[2]}</Badge>,
            p[3],
            <span className="font-mono-ui tabular-nums">{p[4]}</span>,
            p[5],
            <Badge tone={p[6] === "Available" ? "solid" : "outline"}>{p[6]}</Badge>,
            <Button variant="ghost">Edit</Button>,
          ])}
        />
      </div>
    </AppShell>
  );
}