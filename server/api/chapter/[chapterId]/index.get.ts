import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export default defineEventHandler(async (event) => {
  const chapterId = z.string().parse(event.context.params.chapterId);

  return await prisma.bookChapter.findUnique({
    where: {
      id: chapterId,
    },
  });
});
