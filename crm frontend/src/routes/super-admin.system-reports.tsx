import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import {
  Badge,
  BarChart,
  Button,
  DataTable,
  PageHeader,
  Panel,
  ProgressRows,
  Stat,
} from "@/components/crm/ui";

export const Route = createFileRoute("/super-admin/system-reports")({
  head: () => ({
    meta: [
      { title: "System Reports — CHV Apps CRM" },
      { name: "description", content: "Platform health, uptime, API latency and audit trail reports." },
      { property: "og:title", content: "System Reports — CHV Apps CRM" },
      { property: "og:description", content: "Uptime, jobs, storage and audit logs for the whole platform." },
    ],
  }),
  component: SystemReports,
});

function SystemReports() {
  return (
    <AppShell role="super-admin">
      <PageHeader
        eyebrow="Super admin"
        title="System reports"
        description="Infrastructure health, background jobs and the platform audit trail."
        actions={
          <>
            <Button variant="outline">Last 30 days</Button>
            <Button>Download PDF</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Uptime" value="99.98%" delta="2 incidents resolved" />
        <Stat label="API p95" value="184ms" delta="-12ms vs last month" />
        <Stat label="Storage" value="1.4 TB" delta="Media + documents" />
        <Stat label="Failed jobs" value="7" delta="All retried" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Panel title="Requests per day (millions)">
          <BarChart
            data={[
              { label: "Mon", value: 12 },
              { label: "Tue", value: 15 },
              { label: "Wed", value: 14 },
              { label: "Thu", value: 18 },
              { label: "Fri", value: 21 },
              { label: "Sat", value: 9 },
              { label: "Sun", value: 7 },
            ]}
          />
        </Panel>
        <Panel title="Module usage">
          <ProgressRows
            data={[
              { label: "Properties", value: 92 },
              { label: "Leads", value: 84 },
              { label: "Appointments", value: 61 },
              { label: "Chat", value: 47 },
              { label: "Reports", value: 29 },
            ]}
          />
        </Panel>
      </div>

      <div className="mt-5">
        <Panel title="Audit trail">
          <DataTable
            columns={["Time", "Actor", "Action", "Target", "Result"]}
            rows={[
              ["10:32", "neha@chvapps.com", "Suspended admin", "ADM-004", <Badge tone="solid">Success</Badge>],
              ["09:58", "system", "Nightly backup", "db-primary", <Badge tone="solid">Success</Badge>],
              ["09:41", "rahul@chvapps.com", "Bulk listing import", "412 rows", <Badge>Partial</Badge>],
              ["08:20", "system", "Token rotation", "jwt-signing-key", <Badge tone="solid">Success</Badge>],
              ["07:03", "simran@chvapps.com", "Report export", "Q3 revenue", <Badge tone="muted">Queued</Badge>],
            ]}
          />
        </Panel>
      </div>
    </AppShell>
  );
}