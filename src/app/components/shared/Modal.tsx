import { IconX } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onClose={onClose}
      className="p-6 rounded-md bg-gray-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div>{children}</div>

      <form method="dialog" className="absolute top-0 right-0">
        <button
          onClick={onClose}
          className="p-2 bg-transparent"
        >
          <IconX size="1.2rem" />
        </button>
      </form>
    </dialog>
  );
}
