export async function withErrorHandling<T>(
  fn: () => Promise<T> | void | Promise<void>,
  setError: (msg: string | null) => void,
  defaultMessage = "Unexpected error occurred",
): Promise<T | null | boolean> {
  try {
    const result = await fn();
    setError(null);

    return result === undefined ? true : result;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(defaultMessage);
    }
    return false;
  }
}