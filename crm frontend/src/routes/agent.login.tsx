import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field } from "@/components/crm/ui";

export const Route = createFileRoute("/agent/login")({
  head: () => ({
    meta: [
      { title: "Agent Sign In — CHV Apps CRM" },
      {
        name: "description",
        content: "Agent portal sign in for leads, customers, listings and site visits.",
      },
      { property: "og:title", content: "Agent Sign In — CHV Apps CRM" },
      {
        property: "og:description",
        content: "Work your pipeline and site visits from the CHV Apps agent portal.",
      },
    ],
  }),
  component: AgentLogin,
});

function AgentLogin() {
  return (
    <AuthLayout
      subtitle="Agent portal"
      title="Agent sign in"
      footer={
        <p>
          New agent?{" "}
          <Link to="/register" className="font-semibold text-foreground underline">
            Request an account
          </Link>
        </p>
      }
    >
      <Field label="Agent email" type="email" placeholder="agent@chvapps.com" />
      <Field label="Password" type="password" placeholder="••••••••" />
      <Field label="Agent code" placeholder="AG-1042" hint="Provided by your regional admin." />
      <Button type="submit" className="w-full">
        <Link
        to="/agent/leads"
        className="block border border-foreground px-3 py-2 text-center font-mono-ui text-[10px] uppercase tracking-[0.12em] hover:bg-accent"
      >
       sign in as agent
      </Link>
      </Button>
    </AuthLayout>
  );
}