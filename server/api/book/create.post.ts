import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

const createBookSchema = z.object({
  title: z.string(),
});

export type CreateBookSchema = z.input<typeof createBookSchema>;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = createBookSchema.parse(body);

  return await prisma.book.create({
    data,
  });
});
