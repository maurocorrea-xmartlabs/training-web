"use client";

import { withErrorHandling } from "@/services/utils/withErrorHandling";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResetPasswordSchema } from "@/types/resetPassword";
import { resetPasswordAction } from "@/app/(auth)/resetpassword/[token]/actions";
import Image from "next/image";

type Props = {
  token: string;
};

export function ResetPasswordForm({ token }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const passRules = passwordRules(password);
  const passConfRules = passwordRules(passwordConfirmation);

  if (!token) {
    return <p>Missing token!</p>;
  }

  // These sets of rules are used to give char by char feedback to user
  function passwordRules(password: string) {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = ResetPasswordSchema.safeParse({
      password,
      passwordConfirmation,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    // usign "!" on token to remove warning because it will not be null, as we verified it above
    const success = await withErrorHandling(
      () => resetPasswordAction(token!, parsed.data),
      setError
    );
    if (!success) return;

    setPassword("");
    setPasswordConfirmation("");
    router.push("/logIn");
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <Image
        src="/logoAlt.png"
        alt="Uni-Do"
        width={92}
        height={92}
        className="mx-auto"
        unoptimized
      />
      <h1 className="text-xl font-semibold">Reset your password</h1>

      {error && (
        <div className="space-y-2">
          <p className="text-sm text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => router.push("/forgotpassword")}
            className="text-sm text-black underline hover:text-gray-700 transition"
          >
            Request a new password reset
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="password"> New password </label>
        <ul className="mt-2 text-sm space-y-1">
          <li
            className={passRules.minLength ? "text-green-600" : "text-gray-500"}
          >
            {passRules.minLength ? "✔" : "✗"} At least 8 characters
          </li>
          <li
            className={
              passRules.hasUppercase ? "text-green-600" : "text-gray-500"
            }
          >
            {passRules.hasUppercase ? "✔" : "✗"} One uppercase letter
          </li>
          <li
            className={
              passRules.hasSpecialChar ? "text-green-600" : "text-gray-500"
            }
          >
            {passRules.hasSpecialChar ? "✔" : "✗"} One special character
          </li>
        </ul>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="NewPassword#"
        />

        <label htmlFor="passwordConfirmation"> New password confirmation</label>
        <ul className="mt-2 text-sm space-y-1">
          <li
            className={
              passConfRules.minLength ? "text-green-600" : "text-gray-500"
            }
          >
            {passConfRules.minLength ? "✔" : "✗"} At least 8 characters
          </li>
          <li
            className={
              passConfRules.hasUppercase ? "text-green-600" : "text-gray-500"
            }
          >
            {passConfRules.hasUppercase ? "✔" : "✗"} One uppercase letter
          </li>
          <li
            className={
              passConfRules.hasSpecialChar ? "text-green-600" : "text-gray-500"
            }
          >
            {passConfRules.hasSpecialChar ? "✔" : "✗"} One special character
          </li>
        </ul>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="NewPassword#"
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
}
