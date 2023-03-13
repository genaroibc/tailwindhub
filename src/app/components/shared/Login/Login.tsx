"use client";

import { useState } from "react";
import { useSupabase } from "@/app/components/supabase-provider";
import styles from "./Login.module.css";

export function Login() {
  const { supabase } = useSupabase()!;

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      return setError(error.message);
    }

    console.log({ data });

    setError(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return setError(error.message);
    }

    setError(null);
  };

  return (
    <nav className={styles.login}>
      <button className={styles.login__login_btn} onClick={handleLogin}>
        login
      </button>
      <button className={styles.login__logout_btn} onClick={handleLogout}>
        Logout
      </button>
      <p className={styles.login__error_message}>{error}</p>
    </nav>
  );
}
