export async function generateRandomId() {
  const random = Math.floor(Math.random() * 1_000_000) + 1;
  return random;
}
