import { createFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  return <div>Hello "/customer/enquiries"!</div>
}
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/customer/enquiries")({
  head: () => ({
    meta: [
      { title: "My Enquiries — CHV Apps CRM" },
      { name: "description", content: "Track every property enquiry you raised and the agent response." },
      { property: "og:title", content: "My Enquiries — CHV Apps CRM" },
      { property: "og:description", content: "See response status for each listing you asked about." },
    ],
  }),
  component: Enquiries,
});

const ENQUIRIES = [
  ["ENQ-9101", "Skyline Residences 14B", "Kabir Shah", "10 Aug", "Answered", "Higher floor offered"],
  ["ENQ-9102", "Marine Terrace 8C", "Kabir Shah", "09 Aug", "Answered", "Visit booked Saturday"],
  ["ENQ-9103", "Palm Court Villa 7", "Tanvi Desai", "07 Aug", "Awaiting", "Reserved until 15 Aug"],
  ["ENQ-9104", "Harbour View 3A", "Meera Pillai", "04 Aug", "Closed", "Listing sold"],
];

function Enquiries() {
  return (
    <AppShell role="customer">
      <PageHeader
        eyebrow="Customer"
        title="My enquiries"
        description="Everything you asked about, with the agent handling it and the latest update."
        actions={<Button>New enquiry</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total enquiries" value="0" delta="0 this month" />
        <Stat label="Awaiting reply" value="1" delta="Avg. reply 12 min" />
        <Stat label="Visits booked" value="3" delta="From enquiries" />
      </div>

      <div className="mt-8">
        <DataTable
          columns={["ID", "Property", "Agent", "Raised", "Status", "Latest update"]}
          rows={ENQUIRIES.map((e) => [
            <span className="font-mono-ui text-xs">{e[0]}</span>,
            <span className="font-semibold">{e[1]}</span>,
            e[2],
            <span className="font-mono-ui text-xs">{e[3]}</span>,
            <Badge tone={e[4] === "Answered" ? "solid" : "outline"}>{e[4]}</Badge>,
            <span className="text-muted-foreground">{e[5]}</span>,
          ])}
        />
      </div>
    </AppShell>
  );
}