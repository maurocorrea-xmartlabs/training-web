"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-10 text-center space-y-4">
      <p className="text-red-600">Something went wrong loading this page.</p>
      <button onClick={reset} className="px-4 py-2 bg-black text-white rounded">
        Try again
      </button>
    </div>
  );
}
