import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field } from "@/components/crm/ui";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — CHV Apps CRM" },
      {
        name: "description",
        content: "Admin portal sign in for properties, agents, leads and appointments.",
      },
      { property: "og:title", content: "Admin Sign In — CHV Apps CRM" },
      {
        property: "og:description",
        content: "Manage inventory and pipeline from the CHV Apps admin portal.",
      },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = awaitfetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.user?.role !== "admin") {
        throw new Error("This account is not an admin account");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/admin/leads";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      subtitle="Admin portal"
      title="Admin sign in"
      footer={
        <p>
          Wrong portal?{" "}
          <Link
            to="/login"
            className="font-semibold text-foreground underline"
          >
            Choose another portal
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <Field
          label="Work email"
          type="email"
          placeholder="admin@chvapps.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 accent-foreground"
            />
            Keep me signed in
          </label>

          <Link
            to="/forgot-password"
            className="font-mono-ui text-[11px] uppercase underline"
          >
            Forgot?
          </Link>
        </div>

        {error && (
          <p className="text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in as admin"}
        </Button>
      </form>
    </AuthLayout>
  );
}