import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers — CHV Apps CRM" },
      { name: "description", content: "Customer records, budgets, assigned agents and deal stage." },
      { property: "og:title", content: "Customers — CHV Apps CRM" },
      { property: "og:description", content: "Full buyer and tenant database for CHV Apps." },
    ],
  }),
  component: CustomersPage,
});

const CUSTOMERS = [
  ["CUS-8801", "Ananya Rao", "Bengaluru", "₹2 – 3 Cr", "Kabir Shah", "Negotiation"],
  ["CUS-8802", "Rohit Menon", "Kochi", "₹80 L – 1.2 Cr", "Meera Pillai", "Site visit"],
  ["CUS-8803", "Priya Sharma", "Delhi NCR", "₹5 Cr +", "Devansh Gupta", "Proposal"],
  ["CUS-8804", "Vikram Joshi", "Pune", "₹1 – 1.5 Cr", "Tanvi Desai", "New"],
  ["CUS-8805", "Sana Khan", "Hyderabad", "₹1.5 – 2 Cr", "Imran Qureshi", "Closed"],
];

function CustomersPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Admin"
        title="Customers"
        description="Buyer and tenant records with budget band, assigned agent and deal stage."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Add customer</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Customers" value="12,342" delta="+318 in 30 days" />
        <Stat label="In pipeline" value="1,864" delta="Active deals" />
        <Stat label="Avg. budget" value="₹1.8 Cr" delta="Across regions" />
        <Stat label="Repeat buyers" value="7%" delta="892 accounts" />
      </div>

      <div className="mt-8">
        <DataTable
          columns={["ID", "Customer", "City", "Budget", "Agent", "Stage", ""]}
          rows={CUSTOMERS.map((c) => [
            <span className="font-mono-ui text-xs">{c[0]}</span>,
            <span className="font-semibold">{c[1]}</span>,
            c[2],
            <span className="font-mono-ui tabular-nums">{c[3]}</span>,
            c[4],
            <Badge tone={c[5] === "Closed" ? "solid" : "outline"}>{c[5]}</Badge>,
            <Button variant="ghost">Open</Button>,
          ])}
        />
      </div>
    </AppShell>
  );
}