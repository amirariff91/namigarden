export type Person = "amir" | "ayunni" | "shared";

export type CreatureCategory = "groceries" | "treat_cat" | "bills" | "japan_fund";

export type MoneyEntry = {
  id: string;
  amount: number;
  category: CreatureCategory;
  paidBy: Person;
  note?: string;
  createdAt: string;
  isRecurring?: boolean;
};

export type Creature = {
  id: CreatureCategory;
  name: string;
  icon: string;
  label: string;
  calmState: string;
  careNote: string;
};

export type ReviewDecision = {
  id: string;
  text: string;
};
