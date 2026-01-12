import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Uni-Do",
    template: "%s | Uni-Do",
  },
  description: "React app for managing subjects, projects, tasks and exams",
  authors: [{ name: "Mauro Correa" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
