"use client";

import { SimpleDropzone } from "@/lib/ui/dropzones/basicDropzone";

export default function resources() {
  return (
    <div>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Upload or check some relevant resources for your subjects!
        </h1>
        <SimpleDropzone />
      </div>
    </div>
  );
}
