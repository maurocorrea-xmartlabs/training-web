//Converts the amount to cents so it can be handled by Stripe
export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
