import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field } from "@/components/crm/ui";

export const Route = createFileRoute("/customer/login")({
  head: () => ({
    meta: [
      { title: "Customer Sign In — CHV Apps CRM" },
      {
        name: "description",
        content: "Customer portal sign in to browse properties, enquiries, visits and favorites.",
      },
      { property: "og:title", content: "Customer Sign In — CHV Apps CRM" },
      {
        property: "og:description",
        content: "Track enquiries, bookings and shortlists in the CHV Apps customer portal.",
      },
    ],
  }),
  component: CustomerLogin,
});

function CustomerLogin() {
  return (
    <AuthLayout
      subtitle="Customer portal"
      title="Customer sign in"
      footer={
        <p>
          No account yet?{" "}
          <Link to="/register" className="font-semibold text-foreground underline">
            Create one
          </Link>
        </p>
      }
    >
      <Field label="Email or phone" placeholder="you@example.com" />
      <Field label="Password" type="password" placeholder="••••••••" />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="size-4 accent-foreground" />
          Remember me
        </label>
        <Link to="/forgot-password" className="font-mono-ui text-[11px] uppercase underline">
          Forgot?
        </Link>
      </div>
      <Button type="submit" className="w-full">
       <Link
        to="/customer/enquiries"
        className="block border border-foreground px-3 py-2 text-center font-mono-ui text-[10px] uppercase tracking-[0.12em] hover:bg-accent"
      >
       sign in as customer
      </Link>
      </Button>
    </AuthLayout>
  );
}