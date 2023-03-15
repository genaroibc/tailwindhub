import { SupabaseContext } from "@/context/SupabaseContext";
import { useContext } from "react";

export function useSupabase() {
  const context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error(
      "'useSupabase' hook must be used inside a SupabaseProvider"
    );
  }

  return context!;
}
