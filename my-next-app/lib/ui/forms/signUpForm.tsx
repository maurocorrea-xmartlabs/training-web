"use client";

import { signUpAction } from "@/app/(auth)/signUp/actions";
import { UserSignUpFormSchema } from "@/types/user";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useState } from "react";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const passRules = passwordRules(password);
  const nameRules = usernameRules(name);
  const router = useRouter();

  // These sets of rules are used to give char by char feedback to user
  function passwordRules(password: string) {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };
  }

  function usernameRules(password: string) {
    return {
      minLength: password.length >= 8,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = UserSignUpFormSchema.safeParse({
      name,
      email,
      password,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const result = await signUpAction(parsed.data);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setName("");
    setEmail("");
    setPassword("");

    showToast.success("Account successfully created!", {
      duration: 4000,
      progress: true,
      position: "bottom-right",
      transition: "popUp",
      icon: "",
      sound: true,
    });

    router.push("/logIn");
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h1 className="text-xl font-semibold">Sign Up</h1>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="username"> Username </label>
        <ul className="mt-2 text-sm space-y-1">
          <li
            className={nameRules.minLength ? "text-green-600" : "text-gray-500"}
          >
            {nameRules.minLength ? "✔" : "✗"} At least 8 characters
          </li>
        </ul>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="John Doe"
        />

        <label htmlFor="email"> Email </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          placeholder="JohnDoe@gmail.com"
        />

        <label htmlFor="password"> Password </label>
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
          placeholder="Password#"
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
