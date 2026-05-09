"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { creatures } from "../lib/seed";
import { currentJapanSavings, formatRM, gardenLine, japanGoal, monthTotal, totalForCategory } from "../lib/status";
import { loadEntries, resetEntries } from "../lib/storage";
import type { MoneyEntry } from "../lib/types";
import { AppShell } from "./AppShell";

export function GardenHome() {
  const [entries, setEntries] = useState<MoneyEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const total = useMemo(() => monthTotal(entries), [entries]);
  const japanAdded = totalForCategory(entries, "japan_fund");
  const japanTotal = currentJapanSavings + japanAdded;
  const progress = Math.min(100, Math.round((japanTotal / japanGoal) * 100));

  function clearSampleData() {
    resetEntries();
    setEntries([]);
  }

  return (
    <AppShell eyebrow="Nami Garden" title="This month">
      <section className="nami-card">
        <span className="label">🌿 Nami says</span>
        <p>{gardenLine(entries)}</p>
      </section>

      <section className="metric-grid">
        <div className="metric">
          <small>Logged this month</small>
          <strong>{formatRM(total)}</strong>
        </div>
        <div className="metric">
          <small>Japan fund</small>
          <strong>{progress}%</strong>
        </div>
      </section>

      <section className="creatures" aria-label="Garden creatures">
        {creatures.map((creature) => {
          const creatureTotal = totalForCategory(entries, creature.id);
          return (
            <article className="creature" key={creature.id}>
              <div className="creature-icon">{creature.icon}</div>
              <div>
                <strong>{creature.name}</strong>
                <span>{creature.careNote}</span>
                <em>{formatRM(creatureTotal)}</em>
              </div>
              <b>{creature.calmState}</b>
            </article>
          );
        })}
      </section>

      <p className="prototype-note">Prototype only: entries stay in this browser. Don’t add real finance data yet.</p>

      <nav className="cta-stack" aria-label="Primary actions">
        <Link className="primary" href="/add">Add entry</Link>
        <Link className="secondary" href="/review">Start monthly review</Link>
        <button className="ghost" type="button" onClick={clearSampleData}>Clear local entries</button>
      </nav>
    </AppShell>
  );
}
