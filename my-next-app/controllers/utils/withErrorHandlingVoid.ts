export async function withErrorHandlingVoid(
  fn: () => void | Promise<void>,
  setError: (msg: string | null) => void,
  defaultMessage = "Unexpected error occurred"
): Promise<boolean> {
  try {
    await fn();
    setError(null);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(defaultMessage);
    }
    return false;
  }
}
