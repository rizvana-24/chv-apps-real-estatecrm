import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHV Apps — Real Estate CRM Workspace" },
      {
        name: "description",
        content:
          "CHV Apps is a black-and-white real estate CRM with role workspaces for super admins, admins, agents and customers.",
      },
      { property: "og:title", content: "CHV Apps — Real Estate CRM Workspace" },
      {
        property: "og:description",
        content: "Pick a role workspace: super admin, admin, agent or customer.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-5 md:px-10">
        <div>
          <span className="text-lg font-extrabold uppercase tracking-[0.2em]">CHV Apps</span>
          <span className="label-caps ml-3 text-muted-foreground">Real Estate CRM</span>
        </div>
        <nav className="flex gap-2">
          <Link
            to="/login"
            className="border border-foreground px-4 py-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] hover:bg-accent"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="border border-primary bg-primary px-4 py-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/85"
          >
            sign up
          </Link>
        </nav>
      </header>

      <section className="border-b border-border bg-primary px-5 py-16 text-primary-foreground md:px-10 md:py-24">
        <p className="label-caps opacity-60">Monochrome by design</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
          One CRM for listings, leads, visits and closings.
        </h1>
        <p className="mt-6 max-w-xl text-sm opacity-80 md:text-base">
          CHV Apps gives every role its own workspace — super admins govern the platform, admins run
          inventory and pipeline, agents work leads and visits, customers browse and book.
        </p>
        <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-8 border-t border-primary-foreground/20 pt-8 md:grid-cols-4">
          {[
            ["Listings", "4,182"],
            ["Agents", "126"],
            ["Leads", "573"],
            ["Closed", "₹92 Cr"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-caps opacity-60">{k}</dt>
              <dd className="mt-2 font-mono-ui text-2xl tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-5 py-16 md:px-10">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight">
          Sign in to open your workspace
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Workspaces are available after you sign in. Use your role portal to continue.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-block border border-primary bg-primary px-5 py-3 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/85"
        >
          Sign in
        </Link>
      </section>

      <footer className="border-t border-border px-5 py-8 md:px-10">
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Forgot password", to: "/forgot-password" as const },
            { label: "JWT authentication", to: "/auth/jwt" as const },
            { label: "Analytics", to: "/analytics" as const },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="label-caps text-muted-foreground underline">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="label-caps mt-6 text-muted-foreground">© 2026 CHV Apps</p>
      </footer>
    </div>
  );
}
