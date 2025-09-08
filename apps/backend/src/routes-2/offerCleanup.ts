import { prisma } from "@repo/db";
import cron from "node-cron";


cron.schedule("*5 * * * *", async () => {
    try {
        const deleted = await prisma.offer.deleteMany({
            where: {
                validTill: {
                    lt: new Date(),
                }
            }
        })

        if (deleted.count > 0) {
            console.log(`Deleted ${deleted.count} expired offers`);
        }
    } catch (error) {
        console.log("failed to delete expired offers");
    }
})