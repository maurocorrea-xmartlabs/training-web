import type { ReactNode, FormEventHandler } from "react";
import styles from "./formAnimations.module.css";

type PopupFormProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitLabel?: string;
};

export function PopupForm({
  title,
  children,
  onClose,
  onSubmit,
}: PopupFormProps) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-200"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 transition-all duration-200 scale-95 opacity-0 ${styles.animateModalIn}`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>

        {children}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
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
