import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { ChatWorkspace } from "@/components/crm/ChatWorkspace";
import { PageHeader } from "@/components/crm/ui";

export const Route = createFileRoute("/agent/chat")({
  head: () => ({
    meta: [
      { title: "Chat — CHV Apps CRM" },
      { name: "description", content: "Agent inbox for customer conversations across listings." },
      { property: "og:title", content: "Chat — CHV Apps CRM" },
      { property: "og:description", content: "Reply to buyers fast with saved quick replies." },
    ],
  }),
  component: AgentChat,
});

function AgentChat() {
  return (
    <AppShell role="agent">
      <PageHeader
        eyebrow="Agent"
        title="Chat"
        description="All customer conversations in one inbox, tied to the listing being discussed."
      />
      <ChatWorkspace
        headerName="Ananya Rao"
        headerMeta="Skyline Residences 14B · Lead score 92"
        composerPlaceholder="Write a reply…"
        quickReplies={["Share brochure", "Propose visit", "Send price sheet"]}
        threads={[
          { name: "Ananya Rao", meta: "2m", preview: "Is a higher floor available?", unread: 2, active: true },
          { name: "Nikhil Bansal", meta: "18m", preview: "Can we do Saturday 11 AM?" },
          { name: "Divya Suresh", meta: "1h", preview: "Sending my documents tonight." },
          { name: "Aman Sethi", meta: "Yesterday", preview: "Parking was too tight for me." },
        ]}
        messages={[
          { from: "them", text: "Hi! Is a higher floor available in the same tower?", time: "10:02" },
          { from: "me", text: "Yes — 21B is open at ₹3.62 Cr with the same layout.", time: "10:04" },
          { from: "them", text: "Great. Can I see both this Saturday?", time: "10:06" },
          { from: "me", text: "Booked 10:00 AM. I'll send the gate pass and floor plans now.", time: "10:07" },
        ]}
      />
    </AppShell>
  );
}
