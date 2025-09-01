// src/api/expenses.ts
import { supabase } from "../lib/supabaseClient";
import { type Expense } from "../types/expenses";

export const fetchUserExpenses = async (userId: string): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as Expense[];
};
