"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { defaultDecisions } from "../lib/seed";
import { currentJapanSavings, formatRM, japanGoal, monthTotal, totalForCategory } from "../lib/status";
import { loadEntries } from "../lib/storage";
import type { MoneyEntry } from "../lib/types";
import { AppShell } from "./AppShell";

export function MonthlyReview() {
  const [entries, setEntries] = useState<MoneyEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const totals = useMemo(() => {
    const month = monthTotal(entries);
    const bills = totalForCategory(entries, "bills");
    const japanAdded = totalForCategory(entries, "japan_fund");
    const treats = totalForCategory(entries, "treat_cat");
    return { month, bills, japanAdded, japanTotal: currentJapanSavings + japanAdded, treats };
  }, [entries]);

  return (
    <AppShell eyebrow="Money date" title="Monthly review">
      <section className="review-hero">
        <span className="label">15 min • calm facts first</span>
        <h2>Start with the picture, then choose the next tiny moves.</h2>
      </section>

      <section className="fact-list">
        <article><small>This month logged</small><strong>{formatRM(totals.month)}</strong></article>
        <article><small>Bills + commitments</small><strong>{formatRM(totals.bills)}</strong></article>
        <article><small>Japan fund</small><strong>{formatRM(totals.japanTotal)} / {formatRM(japanGoal)}</strong></article>
      </section>

      <section className="review-card">
        <h2>One gentle question</h2>
        <p>Is there anything above RM500 that should get a simple heads-up before month end?</p>
        <div className="review-options">
          <button type="button">All clear</button>
          <button type="button">One thing to mention</button>
          <button type="button">Discuss later tonight</button>
        </div>
      </section>

      <section className="review-card">
        <h2>Suggested decisions</h2>
        <ul>
          {defaultDecisions.map((decision) => <li key={decision.id}>{decision.text}</li>)}
        </ul>
      </section>

      <section className="review-card soft">
        <h2>Tiny tasks</h2>
        <ol>
          <li>Check the next recurring bill date.</li>
          <li>Agree Japan fund top-up for this month.</li>
          <li>Pick one personal purchase to mention early.</li>
        </ol>
      </section>

      <Link className="primary" href="/add">Add missing entry</Link>
      <Link className="secondary block" href="/">Back to garden</Link>
    </AppShell>
  );
}
