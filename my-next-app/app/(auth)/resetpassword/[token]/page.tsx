import { ResetPasswordForm } from "@/lib/ui/forms/resetPasswordForm";

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function ResetPassword({ params }: PageProps) {
  const { token } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
