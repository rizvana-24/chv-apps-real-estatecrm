import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field} from "@/components/crm/ui";

export const Route = createFileRoute("/super-admin/login")({
    head: () => ({
    meta: [
      { title: "Super Admin Sign In — CHV Apps CRM" },
      {
        name: "description",
        content: "Super admin console sign in for platform governance, admins and system reports.",
      },
      { property: "og:title", content: "Super Admin Sign In — CHV Apps CRM" },
      {
        property: "og:description",
        content: "Restricted super admin access to CHV Apps platform controls.",
      },
    ],
  }),
  component: SuperAdminLogin,
});

function SuperAdminLogin() {
  return (
    <AuthLayout
      subtitle="Restricted access"
      title="Super admin sign in"
      footer={
        <p>
          Not a super admin?{" "}
          <Link to="/login" className="font-semibold text-foreground underline">
            Choose another portal
          </Link>
        </p>
      }
    >
      <Field label="Super admin email" type="email" placeholder="root@chvapps.com" />
      <Field label="Password" type="password" placeholder="••••••••" />
      <Field label="2FA code" placeholder="123 456" hint="Required for platform-level access." />
      <Button type="submit" className="w-full">
      <Link
       to=".."
        className="block border border-foreground px-3 py-2 text-center font-mono-ui text-[10px] uppercase tracking-[0.12em] hover:bg-accent"
      >
       Enter console
      </Link>
      </Button>
    </AuthLayout>
  );
}