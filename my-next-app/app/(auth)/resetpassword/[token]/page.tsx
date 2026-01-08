import { ResetPasswordForm } from "@/lib/ui/forms/resetPasswordForm";

type PageProps = {
  params: {
    token: string;
  };
};

export default function ResetPassword({ params }: PageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <ResetPasswordForm token={params.token} />
      </div>
    </div>
  );
}
