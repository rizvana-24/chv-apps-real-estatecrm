import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { Badge, Button, DataTable, PageHeader, Panel, ProgressRows, Stat } from "@/components/crm/ui";

export const Route = createFileRoute("/admin/agents")({
  head: () => ({
    meta: [
      { title: "Agents — CHV Apps CRM" },
      { name: "description", content: "Track agent performance, assigned listings and conversion rates." },
      { property: "og:title", content: "Agents — CHV Apps CRM" },
      { property: "og:description", content: "Roster, workload and win rate for every CHV Apps agent." },
    ],
  }),
  component: AgentsPage,
});

const AGENTS = [
  ["Kabir Shah", "Mumbai West", "38", "112", "24%", "4.8"],
  ["Tanvi Desai", "Pune", "26", "88", "19%", "4.5"],
  ["Devansh Gupta", "Delhi NCR", "31", "104", "21%", "4.6"],
  ["Meera Pillai", "Kochi", "18", "54", "27%", "4.9"],
  ["Imran Qureshi", "Hyderabad", "22", "71", "16%", "4.2"],
];

function AgentsPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        eyebrow="Admin"
        title="Agents"
        description="Roster, workload distribution and conversion performance."
        actions={
          <>
            <Button variant="outline">Assign leads</Button>
            <Button>Onboard agent</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active agents" value="126" delta="98 active weekly" />
        <Stat label="Avg. listings" value="27" delta="Per agent" />
        <Stat label="Avg. conversion" value="21%" delta="+3 pts QoQ" />
        <Stat label="Avg. rating" value="4.6" delta="From 3,204 reviews" />
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[2fr_1fr]">
        <DataTable
          columns={["Agent", "Region", "Listings", "Leads", "Conversion", "Rating", ""]}
          rows={AGENTS.map((a) => [
            <span className="font-semibold">{a[0]}</span>,
            a[1],
            <span className="font-mono-ui tabular-nums">{a[2]}</span>,
            <span className="font-mono-ui tabular-nums">{a[3]}</span>,
            <Badge tone="solid">{a[4]}</Badge>,
            <span className="font-mono-ui tabular-nums">{a[5]}</span>,
            <Button variant="ghost">Profile</Button>,
          ])}
        />
        <Panel title="Closings this quarter">
          <ProgressRows
            data={[
              { label: "Kabir Shah", value: 27 },
              { label: "Devansh Gupta", value: 22 },
              { label: "Tanvi Desai", value: 17 },
              { label: "Meera Pillai", value: 15 },
              { label: "Imran Qureshi", value: 11 },
            ]}
          />
        </Panel>
      </div>
    </AppShell>
  );
}