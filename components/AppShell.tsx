import Link from "next/link";

export function AppShell({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <main className="app-shell">
      <section className="phone-frame">
        <div className="statusbar"><span>9:41</span><span>●●●</span></div>
        <header className="mobile-head">
          <div>
            <p>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <Link aria-label="Go home" className="avatar" href="/">🌱</Link>
        </header>
        {children}
      </section>
    </main>
  );
}
