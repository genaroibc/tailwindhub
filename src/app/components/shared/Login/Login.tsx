"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { useState } from "react";
import styles from "./Login.module.css";
import Image from "next/image";

export function Login() {
  const { supabase, session } = useSupabase();
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      return setError(error.message);
    }

    setError(null);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return setError(error.message);
    }

    setError(null);
  };

  return (
    <nav className={styles.login}>
      {session?.user ? (
        <>
          <div className={styles.login__user}>
            <span className={styles.login__user__name}>
              {session.user.user_metadata.user_name}
            </span>
            <Image
              className={styles.login__user__avatar}
              width={50}
              height={50}
              alt={session.user.user_metadata.user_name}
              src={session.user.user_metadata.avatar_url}
            />
          </div>
          <button className={styles.login__logout_btn} onClick={signOut}>
            <svg
              className={styles.login__login_btn__icon}
              width="100%"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
          </button>
        </>
      ) : (
        <button className={styles.login__login_btn} onClick={signIn}>
          login
        </button>
      )}
      {error && <p className={styles.login__error_message}>{error}</p>}
    </nav>
  );
}
