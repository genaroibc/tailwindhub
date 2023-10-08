"use client";

import { useGlobalStore } from "@/store/global";
import { Modal } from "@/app/components/shared/Modal";
import { Login } from "@/app/(with-header)/components/shared/Login";

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useGlobalStore(
    ({ isLoginModalOpen, closeLoginModal }) => ({
      isLoginModalOpen,
      closeLoginModal,
    })
  );

  return (
    <div>
      {isLoginModalOpen ? (
        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
          <p className="mb-4">
            Login via GitHub
          </p>
          <Login />
        </Modal>
      ) : null}
    </div>
  );
}
