import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

const updateBookSchema = z.object({
  title: z.string(),
  cover: z.string().nullable(),
  publishing_company: z.string().nullable(),
  author_picture_url: z.string().nullable(),
  author_author_name: z.string().nullable(),
});

export type UpdateBookSchema = z.input<typeof updateBookSchema>;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = z.string().parse(event.context.params.id);

  const data = updateBookSchema.parse(body);

  return await prisma.book.update({
    where: {
      id,
    },
    data,
  });
});
