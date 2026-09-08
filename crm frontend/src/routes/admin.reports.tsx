import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import {
  BarChart,
  Button,
  DataTable,
  PageHeader,
  Panel,
  ProgressRows,
  Stat,
} from "@/components/crm/ui";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CHV Apps CRM" },
      { name: "description", content: "Sales, inventory and lead-source reporting for admins." },
      { property: "og:title", content: "Reports — CHV Apps CRM" },
      { property: "og:description", content: "Revenue, conversion and inventory reports in one view." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Admin"
        title="Reports"
        description="Revenue, conversion and inventory performance for the selected period."
        actions={
          <>
            <Button variant="outline">This quarter</Button>
            <Button>Export</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Revenue" value="₹92 Cr" delta="+14% QoQ" />
        <Stat label="Deals closed" value="782" delta="+62 vs last quarter" />
        <Stat label="Avg. ticket" value="₹1.18 Cr" delta="+4%" />
        <Stat label="Days to close" value="34" delta="-6 days" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title="Deals closed per month">
          <BarChart
            data={[
              { label: "Apr", value: 48 },
              { label: "May", value: 56 },
              { label: "Jun", value: 61 },
              { label: "Jul", value: 72 },
              { label: "Aug", value: 68 },
              { label: "Sep", value: 81 },
            ]}
          />
        </Panel>
        <Panel title="Lead source contribution (%)">
          <ProgressRows
            data={[
              { label: "Website", value: 34 },
              { label: "Portals", value: 26 },
              { label: "Referral", value: 18 },
              { label: "Campaigns", value: 14 },
              { label: "Walk-in", value: 8 },
            ]}
          />
        </Panel>
      </div>

      <div className="mt-5">
        <Panel title="Region performance">
          <DataTable
            columns={["Region", "Listings", "Deals", "Revenue", "Conversion"]}
            rows={[
              ["Mumbai West", "1,204", "241", "₹31 Cr", "24%"],
              ["Bengaluru", "948", "182", "₹22 Cr", "21%"],
              ["Delhi NCR", "812", "154", "₹19 Cr", "20%"],
              ["Pune", "618", "112", "₹12 Cr", "18%"],
              ["Hyderabad", "600", "93", "₹8 Cr", "16%"],
            ].map((r) => [
              <span className="font-semibold">{r[0]}</span>,
              <span className="font-mono-ui tabular-nums">{r[1]}</span>,
              <span className="font-mono-ui tabular-nums">{r[2]}</span>,
              <span className="font-mono-ui tabular-nums">{r[3]}</span>,
              <span className="font-mono-ui tabular-nums">{r[4]}</span>,
            ])}
          />
        </Panel>
      </div>
    </AppShell>
  );
}