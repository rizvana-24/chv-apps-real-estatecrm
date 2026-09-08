import type { ChangeEvent, ReactNode} from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="label-caps text-muted-foreground">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function Panel({
  title,
  aside,
  children,
  className = "",
}: {
  title?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-border bg-card ${className}`}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <h2 className="label-caps">{title}</h2>
          {aside}
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="border border-border bg-card p-5">
      <p className="label-caps text-muted-foreground">{label}</p>
      <p className="mt-3 font-mono-ui text-3xl font-semibold tabular-nums">{value}</p>
      {delta ? <p className="mt-1 text-xs text-muted-foreground">{delta}</p> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "outline",
}: {
  children: ReactNode;
  tone?: "outline" | "solid" | "muted";
}) {
  const tones = {
    outline: "border border-foreground text-foreground",
    solid: "bg-primary text-primary-foreground border border-primary",
    muted: "bg-muted text-muted-foreground border border-border",
  } as const;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "solid",
  type = "button",
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const variants = {
    solid:
      "bg-primary text-primary-foreground border border-primary hover:bg-primary/85",
    outline: "border border-foreground text-foreground hover:bg-accent",
    ghost: "border border-transparent text-muted-foreground hover:text-foreground hover:bg-accent",
  } as const;
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  hint,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="label-caps text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-ring"
      />
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto border border-border bg-card">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted">
            {columns.map((c) => (
              <th key={c} className="label-caps px-4 py-3 text-left text-muted-foreground">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/60">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-middle whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-52 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <span className="font-mono-ui text-[10px] tabular-nums">{d.value}</span>
          <div
            className="w-full border border-foreground bg-foreground"
            style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
          />
          <span className="font-mono-ui text-[10px] uppercase text-muted-foreground">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProgressRows({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-4">
      {data.map((d) => (
        <li key={d.label}>
          <div className="flex items-baseline justify-between">
            <span className="text-sm">{d.label}</span>
            <span className="font-mono-ui text-xs tabular-nums text-muted-foreground">
              {d.value}
            </span>
          </div>
          <div className="mt-2 h-2 w-full border border-border bg-muted">
            <div
              className="h-full bg-foreground"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}