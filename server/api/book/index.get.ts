import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export default defineEventHandler(async (event) => {
  return await prisma.book.findMany();
});
