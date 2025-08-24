import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { type Session, type User } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  username: string | null;
  setAuth: (session: Session | null, user: User | null) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isAuthenticated: false,
  username: null,
  loading: true,

  setAuth: (session, user) => {
    const username = user?.user_metadata?.username || null;

    set({
      session,
      user,
      isAuthenticated: !!session,
      username,
      loading: false,
    });
  },

  initializeAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user || null;
      const username = user?.user_metadata?.username || null;

      set({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        username,
        loading: false,
      });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      const username = user?.user_metadata?.username || null;
      set({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        username,
        loading: false,
      });
    });
  },
}));

useAuthStore.getState().initializeAuth();
