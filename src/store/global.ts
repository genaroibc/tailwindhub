import { create } from "zustand";

type GlobalStore = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => {
    set({ isLoginModalOpen: true });
  },
  closeLoginModal: () => {
    set({ isLoginModalOpen: false });
  },
}));
