"use client";

import { withErrorHandling } from "@/services/utils/withErrorHandling";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "@/app/(auth)/forgotpassword/actions";
import { ForgotPasswordFormSchema } from "@/types/forgotPassword";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = ForgotPasswordFormSchema.safeParse({
      email,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const result = await withErrorHandling(
      () => forgotPasswordAction(parsed.data),
      setError
    );
    if (!result) return;

    setEmail("");
    setSuccess("Email sent!");
    router.push("/");
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h1 className="text-xl font-semibold">Log In</h1>

      {success && <p className="text-sm text-green-500">{success}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Email"
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            Send email
          </button>
        </div>
      </form>
    </div>
  );
}
