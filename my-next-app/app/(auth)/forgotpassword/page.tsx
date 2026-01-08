import Link from "next/link";
import { ForgotPasswordForm } from "@/lib/ui/forms/forgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-4">
        <Link
          href="/logIn"
          className="inline-flex items-center text-sm text-gray-600 hover:text-black"
        >
          Back to login
        </Link>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
