import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export default defineEventHandler(async (event) => {
  const id = z.string().parse(event.context.params.id);

  return await prisma.bookChapter.findMany({
    where: {
      Book: {
        id,
      },
      isVersion: false,
    },
  });
});
