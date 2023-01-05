import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

export default defineNuxtPlugin(() => {
  return { provide: { prisma } };
});
