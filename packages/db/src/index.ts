import { PrismaClient } from "@prisma/client";
// const { PrismaClient } = require("@prisma/client");

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

export const prisma = new PrismaClient();

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// module.exports = prisma;
// export default prisma;