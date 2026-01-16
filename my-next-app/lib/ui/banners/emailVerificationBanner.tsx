"use client";

import { useState } from "react";
import { requestEmailVerificationAction } from "@/app/(app)/actions";

type Props = {
  email: string;
};

export function EmailVerificationBanner({ email }: Props) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    const result = await requestEmailVerificationAction(email);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    setSent(true);
  }

  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-sm flex items-center justify-between gap-4">
      <div className="text-yellow-800">Your email address is not verified.</div>

      <div className="flex items-center gap-3">
        {sent ? (
          <span className="text-green-700 text-xs">
            Verification email sent
          </span>
        ) : (
          <button
            onClick={handleSend}
            className="
              text-yellow-900 font-medium
              underline underline-offset-2
              hover:text-yellow-700
            "
          >
            Send email
          </button>
        )}

        {error && <span className="text-red-600 text-xs">{error}</span>}
      </div>
    </div>
  );
}
