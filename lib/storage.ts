import { seedEntries } from "./seed";
import type { CreatureCategory, MoneyEntry, Person } from "./types";

const storageKey = "nami-garden.entries.v1";
const clearedKey = "nami-garden.seed-cleared.v1";
const categories: CreatureCategory[] = ["groceries", "treat_cat", "bills", "japan_fund"];
const people: Person[] = ["amir", "ayunni", "shared"];

function isMoneyEntry(value: unknown): value is MoneyEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<MoneyEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.amount === "number" &&
    Number.isFinite(entry.amount) &&
    entry.amount > 0 &&
    typeof entry.createdAt === "string" &&
    categories.includes(entry.category as CreatureCategory) &&
    people.includes(entry.paidBy as Person) &&
    (entry.note === undefined || typeof entry.note === "string") &&
    (entry.isRecurring === undefined || typeof entry.isRecurring === "boolean")
  );
}

export function loadEntries(): MoneyEntry[] {
  if (typeof window === "undefined") return seedEntries;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return window.localStorage.getItem(clearedKey) === "true" ? [] : seedEntries;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isMoneyEntry) : [];
  } catch {
    return [];
  }
}

export function saveEntries(entries: MoneyEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(entries.filter(isMoneyEntry)));
    window.localStorage.removeItem(clearedKey);
  } catch {
    // Prototype-only storage. If the browser blocks localStorage, keep the UI usable.
  }
}

export function resetEntries() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(clearedKey, "true");
    window.localStorage.setItem(storageKey, "[]");
  } catch {
    // No-op: clear is best-effort for this browser-only prototype.
  }
}
