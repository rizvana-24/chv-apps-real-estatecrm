import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field } from "@/components/crm/ui";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — CHV Apps CRM" },
      { name: "description", content: "Sign in to the CHV Apps real estate CRM workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout
      subtitle="Welcome back"
      title="Sign in"
      footer={
        <p>
          No account yet?{" "}
          <Link
            to="/register"
            className="font-semibold text-foreground underline"
          >
            Create one
          </Link>
        </p>
      }
    >
      <div className="space-y-2">
        <Link
          to="/super-admin/login"
          className="flex w-full items-center justify-between border p-4 hover:bg-muted"
        >
          <div>
            <p className="font-semibold">SUPER ADMIN</p>
            <p className="text-xs text-muted-foreground">
              Platform governance & audits
            </p>
          </div>
          <span>→</span>
        </Link>

        <Link
          to="/admin/login"
          className="flex w-full items-center justify-between border p-4 hover:bg-muted"
        >
          <div>
            <p className="font-semibold">ADMIN</p>
            <p className="text-xs text-muted-foreground">
              Inventory, agents & pipeline
            </p>
          </div>
          <span>→</span>
        </Link>

        <Link
          to="/agent/login"
          className="flex w-full items-center justify-between border p-4 hover:bg-muted"
        >
          <div>
            <p className="font-semibold">AGENT</p>
            <p className="text-xs text-muted-foreground">
              Leads, customers & site visits
            </p>
          </div>
          <span>→</span>
        </Link>

        <Link
          to="/customer/login"
          className="flex w-full items-center justify-between border p-4 hover:bg-muted"
        >
          <div>
            <p className="font-semibold">CUSTOMER</p>
            <p className="text-xs text-muted-foreground">
              Browse, enquire & book visits
            </p>
          </div>
          <span>→</span>
        </Link>
      </div>
    </AuthLayout>
  );
}