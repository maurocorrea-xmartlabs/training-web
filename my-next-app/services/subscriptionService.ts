import { prisma } from "@/prisma/prisma";
//import { sendSubscriptionEmail } from "./utils/mail/templates/subscriptionEmail";

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

    //await sendSubscriptionEmail(user.email);

    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, error: "Error updating user subscription" };
  }
}
