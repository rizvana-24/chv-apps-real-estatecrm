import { Badge, Button } from "./ui";

type Thread = { name: string; meta: string; preview: string; unread?: number; active?: boolean };
type Message = { from: "me" | "them"; text: string; time: string };

export function ChatWorkspace({
  threads,
  messages,
  headerName,
  headerMeta,
  composerPlaceholder,
  quickReplies,
}: {
  threads: Thread[];
  messages: Message[];
  headerName: string;
  headerMeta: string;
  composerPlaceholder: string;
  quickReplies: string[];
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
      <aside className="border border-border bg-card">
        <div className="border-b border-border p-4">
          <input
            placeholder="Search conversations"
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
          />
        </div>
        <ul className="divide-y divide-border">
          {threads.map((t) => (
            <li
              key={t.name}
              className={`cursor-pointer p-4 transition-colors hover:bg-accent ${
                t.active ? "bg-primary text-primary-foreground hover:bg-primary" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">{t.name}</p>
                <span className="font-mono-ui text-[10px] opacity-70">{t.meta}</span>
              </div>
              <p className="mt-1 truncate text-xs opacity-70">{t.preview}</p>
              {t.unread ? (
                <span className="mt-2 inline-block border border-current px-1.5 font-mono-ui text-[10px]">
                  {t.unread} new
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-h-[560px] flex-col border border-border bg-card">
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="font-semibold">{headerName}</p>
            <p className="label-caps text-muted-foreground">{headerMeta}</p>
          </div>
          <Badge tone="outline">Online</Badge>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] border px-4 py-3 text-sm ${
                  m.from === "me"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted"
                }`}
              >
                <p>{m.text}</p>
                <p className="mt-2 font-mono-ui text-[10px] opacity-60">{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <Button key={q} variant="outline">
                {q}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              placeholder={composerPlaceholder}
              className="flex-1 border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
            />
            <Button>Send</Button>
          </div>
        </div>
      </section>
    </div>
  );
}