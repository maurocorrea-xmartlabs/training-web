import { SignUpForm } from "@/lib/ui/forms/signUpForm";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <SignUpForm />

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            href="/logIn"
            className="text-black hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
