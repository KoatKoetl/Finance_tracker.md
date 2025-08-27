import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

interface Expense {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  category: string;
  note: string;
  created_at: string;
}

interface StatisticsState {
  expenses: Expense[] | null;
  loading: boolean;
  error: any | null;
  fetchExpenses: (userId: string) => Promise<void>;
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
  expenses: null,
  loading: false,
  error: null,
  fetchExpenses: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        throw error;
      }
      set({ expenses: data, loading: false });
    } catch (err) {
      console.error("Error fetching expenses:", err);
      set({ error: err, loading: false });
    }
  },
}));
