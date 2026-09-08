import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Field } from "@/components/crm/ui";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — CHV Apps CRM" },
      {
        name: "description",
        content: "Register a CHV Apps CRM account as agent or customer.",
      },
      { property: "og:title", content: "Create Account — CHV Apps CRM" },
      {
        property: "og:description",
        content: "Join the CHV Apps real estate CRM in a minute.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "customer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Account created successfully. Please sign in.");

      navigate({ to: "/login" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      subtitle="Get started"
      title="Create account"
      footer={
        <p>
          Already registered?{" "}
          <Link
            to="/login"
            className="font-semibold text-foreground underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleRegister} className="space-y-4">
        <Field
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Field
          label="Email"
          type="email"
          placeholder="you@chvapps.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          label="Password"
          type="password"
          hint="Minimum 10 characters, one number."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </AuthLayout>
  );
}