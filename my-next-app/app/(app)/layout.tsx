import { Navbar } from "@/lib/ui/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
    </>
  );
}
