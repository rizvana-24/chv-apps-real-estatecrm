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

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CHV Apps CRM" },
      { name: "description", content: "Funnel, demand and revenue analytics across the CHV Apps CRM." },
      { property: "og:title", content: "Analytics — CHV Apps CRM" },
      { property: "og:description", content: "Understand demand, funnel drop-off and revenue drivers." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Funnel efficiency, demand heat and revenue attribution across all regions."
        actions={
          <>
            <Button variant="outline">Last 90 days</Button>
            <Button>Share dashboard</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Visitors" value="482K" delta="+9% vs prior" />
        <Stat label="Enquiry rate" value="3.8%" delta="+0.4 pts" />
        <Stat label="Visit → offer" value="32%" delta="+2 pts" />
        <Stat label="Revenue" value="₹92 Cr" delta="+14% QoQ" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title="Enquiries per week">
          <BarChart
            data={[
              { label: "W1", value: 320 },
              { label: "W2", value: 388 },
              { label: "W3", value: 412 },
              { label: "W4", value: 366 },
              { label: "W5", value: 470 },
              { label: "W6", value: 512 },
            ]}
          />
        </Panel>
        <Panel title="Funnel conversion (%)">
          <ProgressRows
            data={[
              { label: "Visit → Enquiry", value: 100 },
              { label: "Enquiry → Contacted", value: 78 },
              { label: "Contacted → Qualified", value: 46 },
              { label: "Qualified → Site visit", value: 31 },
              { label: "Site visit → Won", value: 12 },
            ]}
          />
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title="Top performing localities">
          <DataTable
            columns={["Locality", "Views", "Enquiries", "Closed"]}
            rows={[
              ["Andheri West", "48,210", "1,842", "62"],
              ["Whitefield", "39,004", "1,411", "48"],
              ["Gurugram Sector 65", "33,760", "1,204", "41"],
              ["Baner", "24,118", "864", "27"],
              ["Gachibowli", "21,940", "790", "22"],
            ].map((r) => [
              <span className="font-semibold">{r[0]}</span>,
              <span className="font-mono-ui tabular-nums">{r[1]}</span>,
              <span className="font-mono-ui tabular-nums">{r[2]}</span>,
              <span className="font-mono-ui tabular-nums">{r[3]}</span>,
            ])}
          />
        </Panel>
        <Panel title="Channel mix (%)">
          <ProgressRows
            data={[
              { label: "Organic search", value: 38 },
              { label: "Property portals", value: 24 },
              { label: "Paid campaigns", value: 18 },
              { label: "Referrals", value: 13 },
              { label: "Direct", value: 7 },
            ]}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
