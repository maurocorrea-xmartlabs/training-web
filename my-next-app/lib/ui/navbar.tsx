"use client";

import Link from "next/link";
import Image from "next/image";
import { logOutAction } from "@/app/(app)/actions";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logOutAction();
    router.push("/logIn");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black px-4 py-2 flex items-center gap-6 z-50">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Uni-Do logo"
          width={60}
          height={60}
          className="ml-2"
        />
      </Link>

      <Link href="/todo" className="text-white text-2xl hover:underline">
        To-Do
      </Link>

      <Link href="/exams" className="text-white text-2xl hover:underline">
        Exams
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto text-white text-2xl hover:underline"
      >
        Logout
      </button>
    </nav>
  );
}
