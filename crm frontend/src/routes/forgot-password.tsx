import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field } from "@/components/crm/ui";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — CHV Apps CRM" },
      { name: "description", content: "Request a password reset link for your CHV Apps CRM account." },
      { property: "og:title", content: "Reset Password — CHV Apps CRM" },
      { property: "og:description", content: "We email a single-use reset link valid for 30 minutes." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <AuthLayout
      subtitle="Account recovery"
      title="Forgot password"
      footer={
        <p>
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-foreground underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <p className="text-sm text-muted-foreground">
        Enter the email tied to your CHV Apps account. We send a single-use reset link that expires
        in 30 minutes.
      </p>
      <Field label="Work email" type="email" placeholder="you@chvapps.com" />
      <Button type="submit" className="w-full">
        Send reset link
      </Button>
      <ol className="space-y-2 border border-border p-4 text-xs text-muted-foreground">
        <li>1 — Check your inbox and spam folder.</li>
        <li>2 — Open the link on the same device.</li>
        <li>3 — Set a new password and sign in again.</li>
      </ol>
    </AuthLayout>
  );
}