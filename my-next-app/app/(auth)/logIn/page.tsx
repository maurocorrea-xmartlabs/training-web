import { LogInForm } from "@/lib/ui/forms/logInForm";
import Link from "next/link";

export default function LogIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <LogInForm />

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signUp"
            className="text-black hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
