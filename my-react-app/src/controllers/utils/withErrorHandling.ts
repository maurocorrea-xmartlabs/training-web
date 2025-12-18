export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  setError: (msg: string | null) => void,
  defaultMessage = "Unexpected error occurred",
): Promise<T | null> {
  try {
    const result = await fn();
    setError(null);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(defaultMessage);
    }
    return null;
  }
}
