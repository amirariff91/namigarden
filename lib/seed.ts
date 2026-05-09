import type { Creature, MoneyEntry, ReviewDecision } from "./types";

export const creatures: Creature[] = [
  {
    id: "groceries",
    name: "Grocerabbit",
    icon: "🐰",
    label: "Groceries",
    calmState: "steady",
    careNote: "Food spending is normal this month.",
  },
  {
    id: "treat_cat",
    name: "Treat Cat",
    icon: "🐱",
    label: "Personal treats",
    calmState: "heads-up",
    careNote: "A few purchases are worth mentioning, not defending.",
  },
  {
    id: "bills",
    name: "Bill Buffalo",
    icon: "🐃",
    label: "Bills",
    calmState: "due soon",
    careNote: "Electricity and phone bills need a quick check.",
  },
  {
    id: "japan_fund",
    name: "Honeymoon Fox",
    icon: "🦊",
    label: "Japan fund",
    calmState: "growing",
    careNote: "The Japan pot is moving in the right direction.",
  },
];

export const seedEntries: MoneyEntry[] = [
  { id: "seed-1", amount: 86, category: "groceries", paidBy: "shared", note: "Groceries", createdAt: new Date().toISOString() },
  { id: "seed-2", amount: 128, category: "bills", paidBy: "amir", note: "Phone bill", createdAt: new Date().toISOString(), isRecurring: true },
  { id: "seed-3", amount: 350, category: "japan_fund", paidBy: "shared", note: "Japan savings top-up", createdAt: new Date().toISOString() },
  { id: "seed-4", amount: 620, category: "treat_cat", paidBy: "ayunni", note: "Personal purchase heads-up", createdAt: new Date().toISOString() },
];

export const defaultDecisions: ReviewDecision[] = [
  { id: "decision-1", text: "Keep Japan fund top-up steady this month." },
  { id: "decision-2", text: "Discuss recurring commitments before adding them." },
  { id: "decision-3", text: "Use RM500 / RM2,000 as calm heads-up thresholds." },
];
