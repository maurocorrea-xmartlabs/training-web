"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="p-10 text-center space-y-4">
      <p className="text-red-600">Something went wrong loading this page.</p>
      <button
        onClick={reload}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
