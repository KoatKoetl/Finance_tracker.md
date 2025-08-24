import { useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/AuthStore";

/**
 * A React hook that logs out the user after a period of inactivity.
 *
 * @param {number} timeoutInMinutes The idle time in minutes after which the user will be logged out.
 * @param {Function} onLogout Optional callback function to execute after logout.
 */
const useAutoLogout = (timeoutInMinutes: number, onLogout?: () => void) => {
  const timerRef: React.RefObject<NodeJS.Timeout | null> = useRef(null);

  const { isAuthenticated } = useAuthStore();

  const timeoutDuration = timeoutInMinutes * 60 * 1000;

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isAuthenticated) {
      const events = [
        "mousemove",
        "mousedown",
        "keydown",
        "scroll",
        "touchstart",
      ];

      const resetTimer = () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error("Error during auto-logout:", error.message);
          } else {
            console.log(
              `User logged out after ${timeoutInMinutes} minutes of inactivity.`
            );
            if (onLogout) {
              onLogout();
            }
          }
        }, timeoutDuration);
      };

      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });

      resetTimer();

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        events.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
      };
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [isAuthenticated, timeoutInMinutes, timeoutDuration, onLogout]);
};

export default useAutoLogout;
