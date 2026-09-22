import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/crm/AuthLayout";
import { Button, Field } from "@/components/crm/ui";
import api from "../api";

export const Route = createFileRoute("/super-admin/login")({
  head: () => ({
    meta: [
      { title: "Super Admin Sign In — CHV Apps CRM" },
      {
        name: "description",
        content:
          "Super admin console sign in for platform governance, admins and system reports.",
      },
      {
        property: "og:title",
        content: "Super Admin Sign In — CHV Apps CRM",
      },
      {
        property: "og:description",
        content:
          "Restricted super admin access to platform governance, admins and system reports.",
      },
    ],
  }),
  component: SuperAdminLogin,
});

function SuperAdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== "super-admin") {
        setError("This account is not a Super Admin account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate({ to: "/super-admin" });
    } catch (error: any) {
      console.error("Super Admin Login Error:", error);

      setError(
        error?.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      subtitle="Restricted access"
      title="Super admin sign in"
      footer={
        <p>
          Not a super admin?{" "}
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
          label="Super admin email"
          type="email"
          placeholder="root@chvapps.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <Field
          label="2FA code"
          placeholder="123 456"
          hint="Required for platform-level access."
          value={twoFA}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTwoFA(e.target.value)
          }
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "SIGNING IN..." : "ENTER CONSOLE"}
        </Button>
      </form>
    </AuthLayout>
  );
}