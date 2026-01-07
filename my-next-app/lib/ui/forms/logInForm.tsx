"use client";

import { logInAction } from "@/app/(auth)/logIn/actions";
import { withErrorHandling } from "@/services/utils/withErrorHandling";
import { UserLogInFormSchema } from "@/types/user";
import { useState } from "react";
import Image from "next/image";

export function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = UserLogInFormSchema.safeParse({
      email,
      password,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const success = await withErrorHandling(
      () => logInAction(parsed.data),
      setError
    );
    if (!success) return;

    setEmail("");
    setPassword("");
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
      <h1 className="text-xl font-semibold">Log In</h1>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="Password"
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
