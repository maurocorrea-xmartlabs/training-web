import { verifyEmailAction } from "./actions";

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function VerifyEmailPage({ params }: PageProps) {
  const { token } = await params;

  const result = await verifyEmailAction(token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-md border bg-white p-6 text-center space-y-4">
        {result.ok ? (
          <>
            <h1 className="text-lg font-semibold">Email verified</h1>
            <p className="text-sm text-gray-600">
              Your email has been successfully verified.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold text-red-600">
              Verification failed
            </h1>
            <p className="text-sm text-gray-600">{result.error}</p>
          </>
        )}
      </div>
    </div>
  );
}
