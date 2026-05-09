"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { creatures } from "../lib/seed";
import { categoryLabel, formatRM, personLabel, thresholdMessage } from "../lib/status";
import { loadEntries, saveEntries } from "../lib/storage";
import type { CreatureCategory, MoneyEntry, Person } from "../lib/types";
import { AppShell } from "./AppShell";

const people: Person[] = ["amir", "ayunni", "shared"];

export function FastAddEntry() {
  const [amountText, setAmountText] = useState("86");
  const [category, setCategory] = useState<CreatureCategory>("groceries");
  const [paidBy, setPaidBy] = useState<Person>("shared");
  const [note, setNote] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [savedEntry, setSavedEntry] = useState<MoneyEntry | null>(null);

  const amount = useMemo(() => Number(amountText || 0), [amountText]);
  const canSave = amount > 0 && Number.isFinite(amount);

  function saveEntry() {
    if (!canSave) return;
    const entry: MoneyEntry = {
      id: `entry-${Date.now()}`,
      amount,
      category,
      paidBy,
      note: note.trim() || categoryLabel(category),
      createdAt: new Date().toISOString(),
      isRecurring,
    };
    const entries = loadEntries();
    saveEntries([entry, ...entries]);
    setSavedEntry(entry);
    setNote("");
  }

  return (
    <AppShell eyebrow="Fast add" title="Log in 10 sec">
      <section className="amount-card">
        <label htmlFor="amount">Amount</label>
        <div className="amount-row">
          <span>RM</span>
          <input id="amount" inputMode="decimal" value={amountText} onChange={(event) => setAmountText(event.target.value.replace(/[^0-9.]/g, ""))} />
        </div>
      </section>

      <p className="hint">{thresholdMessage(amount, isRecurring)}</p>

      <section className="field-block">
        <h2>Creature</h2>
        <div className="chip-grid">
          {creatures.map((creature) => (
            <button className={category === creature.id ? "active" : ""} key={creature.id} onClick={() => setCategory(creature.id)} type="button">
              {creature.icon} {creature.label}
            </button>
          ))}
        </div>
      </section>

      <section className="field-block">
        <h2>Paid by</h2>
        <div className="segmented">
          {people.map((person) => (
            <button className={paidBy === person ? "active" : ""} key={person} onClick={() => setPaidBy(person)} type="button">
              {personLabel(person)}
            </button>
          ))}
        </div>
      </section>

      <label className="quiet-toggle">
        <input checked={isRecurring} onChange={(event) => setIsRecurring(event.target.checked)} type="checkbox" />
        Recurring commitment
      </label>

      <input className="note-input" placeholder="Optional note" value={note} onChange={(event) => setNote(event.target.value)} />

      <button className="primary" disabled={!canSave} onClick={saveEntry} type="button">Save gently</button>
      {savedEntry ? <p className="saved">Saved {formatRM(savedEntry.amount)} for {categoryLabel(savedEntry.category)}. Garden updated.</p> : null}
      <Link className="secondary block" href="/">Back to garden</Link>
    </AppShell>
  );
}
