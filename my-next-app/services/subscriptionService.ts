import { prisma } from "@/prisma/prisma";
import { ActionResult } from "@/types/actionResult";
import { sendSubscriptionEmail } from "./utils/mail/templates/subscriptionEmail";

export async function updateSubscription(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { ok: false, error: "User not found" };
    }

    const newExpirationDate = new Date();
    newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionExpirationDate: newExpirationDate,
      },
    });

    await sendSubscriptionEmail(user.email);

    return { ok: true, data: null };
  } catch (error) {
    console.error("Error updating user subscription:", error);
    return { ok: false, error: "Error updating user subscription" };
  }
}

export async function requireSubscription(
  userId: number,
): Promise<ActionResult<boolean>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionExpirationDate: true },
    });

    if (!user) {
      return { ok: false, error: "User not found" };
    }

    if (
      !user.subscriptionExpirationDate ||
      user.subscriptionExpirationDate < new Date()
    ) {
      return {
        ok: false,
        error: "An active subscription is required to perform this action.",
      };
    }

    return { ok: true, data: true };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return {
      ok: false,
      error: "Error checking subscription status",
    };
  }
}
