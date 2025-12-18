import { type ReactNode, type FormEventHandler, useState } from "react";
import styles from "./formAnimations.module.css";

type PopupFormProps = {
  title: string;
  children: ReactNode;
  onRequestClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function PopupForm({
  title,
  children,
  onRequestClose,
  onSubmit,
}: PopupFormProps) {
  const [isClosing, setIsClosing] = useState(false);

  function closeWithAnimation() {
    setIsClosing(true);
    setTimeout(() => {
      onRequestClose();
    }, 150);
  }
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-200"
      onClick={closeWithAnimation}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 transition-all duration-200 scale-95 opacity-0 ${isClosing ? styles.animateModalOut : styles.animateModalIn}`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>

        {children}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={closeWithAnimation}
            className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
