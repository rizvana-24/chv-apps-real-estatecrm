import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/crm/AppShell";
import { ChatWorkspace } from "@/components/crm/ChatWorkspace";
import { PageHeader } from "@/components/crm/ui";

export const Route = createFileRoute("/customer/chat")({
  head: () => ({
    meta: [
      { title: "Chat With Agent — CHV Apps CRM" },
      { name: "description", content: "Message your assigned CHV Apps agent about any listing." },
      { property: "og:title", content: "Chat With Agent — CHV Apps CRM" },
      { property: "og:description", content: "Ask questions and book visits directly with your agent." },
    ],
  }),
  component: CustomerChat,
});

function CustomerChat() {
  return (
    <AppShell role="customer">
      <PageHeader
        eyebrow="Customer"
        title="Chat with agent"
        description="Your conversations with CHV Apps agents, grouped by property."
      />
      <ChatWorkspace
        headerName="Kabir Shah"
        headerMeta="Your agent · Mumbai West · Replies in ~5 min"
        composerPlaceholder="Ask about pricing, floor plans, visits…"
        quickReplies={["Book a visit", "Ask for floor plan", "Negotiate price"]}
        threads={[
          { name: "Kabir Shah", meta: "2m", preview: "Booked 10:00 AM. Sending gate pass.", unread: 1, active: true },
          { name: "Meera Pillai", meta: "3h", preview: "Harbour View 3A is now sold." },
          { name: "Support desk", meta: "Yesterday", preview: "Your KYC is verified." },
        ]}
        messages={[
          { from: "me", text: "Hi! Is a higher floor available in the same tower?", time: "10:02" },
          { from: "them", text: "Yes — 21B is open at ₹3.62 Cr with the same layout.", time: "10:04" },
          { from: "me", text: "Great. Can I see both this Saturday?", time: "10:06" },
          { from: "them", text: "Booked 10:00 AM. Gate pass and floor plans on the way.", time: "10:07" },
        ]}
      />
    </AppShell>
  );
}
