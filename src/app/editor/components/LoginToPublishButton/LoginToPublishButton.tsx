import { useSupabase } from "@/hooks/useSupabase";
import styles from "./LoginToPublishButton.module.css";
import { Loader } from "@/app/components/shared/Loader";
import styles from "./CreateComponentForm.module.css";

export function LoginToPublishButton() {
  const { supabase } = useSupabase();

  return (
    <button
      className={styles.login_btn}
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: window.location.href,
          },
        })
      }
    >
      <img
        width={30}
        height={30}
        alt="log in to publish your component"
        src="/svg/github.svg"
      />
      Login to publish your component
    </button>
  );
}
