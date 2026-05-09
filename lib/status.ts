import { creatures } from "./seed";
import type { CreatureCategory, MoneyEntry, Person } from "./types";

export const japanGoal = 14490;
export const currentJapanSavings = 5200;

export function formatRM(amount: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(amount).replace("MYR", "RM");
}

export function personLabel(person: Person) {
  if (person === "amir") return "Amir";
  if (person === "ayunni") return "Ayunni";
  return "Shared";
}

export function categoryLabel(category: CreatureCategory) {
  return creatures.find((c) => c.id === category)?.label ?? category;
}

export function thresholdMessage(amount: number, recurring = false) {
  if (!amount) return "Add the amount first. Nami will show the expectation gently.";
  if (recurring) return "Recurring commitment: discuss first so it stays a team decision.";
  if (amount < 500) return "Below RM500: personal autonomy. Just log it so the garden stays clear.";
  if (amount <= 2000) return "RM500–RM2,000: gentle heads-up. Mention it, no need to defend it.";
  return "Above RM2,000: discuss first. This is a planning moment, not a permission slip.";
}

export function totalForCategory(entries: MoneyEntry[], category: CreatureCategory) {
  return entries.filter((entry) => entry.category === category).reduce((sum, entry) => sum + entry.amount, 0);
}

export function monthTotal(entries: MoneyEntry[]) {
  return entries.reduce((sum, entry) => sum + entry.amount, 0);
}

export function gardenLine(entries: MoneyEntry[]) {
  const total = monthTotal(entries);
  const bills = entries.filter((entry) => entry.category === "bills" || entry.isRecurring).length;
  if (total === 0) return "The garden is empty. Add one small entry to start the month gently.";
  if (bills > 0) return "The garden is steady. One or two commitments need a calm check-in.";
  return "The garden is calm. Spending is visible, and nothing needs a big conversation yet.";
}
