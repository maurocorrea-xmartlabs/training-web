import { getSession } from "@/lib/auth/session";
import { EmailVerificationBanner } from "@/lib/ui/banners/emailVerificationBanner";
import { Navbar } from "@/lib/ui/navbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <Navbar />
      <div className="pt-20">
        {session && !session.user.isVerified && (
          <EmailVerificationBanner email={session.user.email} />
        )}
        <main>{children}</main>
      </div>
    </>
  );
}
