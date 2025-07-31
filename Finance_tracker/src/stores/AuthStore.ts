import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { type Session, type User } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (session: Session | null, user: User | null) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isAuthenticated: false,
  loading: true,

  setAuth: (session, user) => {
    set({
      session,
      user,
      isAuthenticated: !!session,
      loading: false,
    });
  },

  initializeAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        loading: false,
      });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        loading: false,
      });
    });
  },
}));

useAuthStore.getState().initializeAuth();
