import { useState } from "react";

export function usePopupForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function open() {
    setError(null);
    setShowPopup(true);
  }

  function close() {
    setShowPopup(false);
  }

  return {
    showPopup,
    error,
    setError,
    open,
    close,
  };
}
