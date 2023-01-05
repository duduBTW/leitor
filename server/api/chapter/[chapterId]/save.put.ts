import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

const saveChapterSchema = z.object({
  html: z.string(),
  json: z.string(),
  miniature: z.string(),
});

export type SaveChapterSchema = z.input<typeof saveChapterSchema>;

export default defineEventHandler(async (event) => {
  const chapterId = z.string().parse(event.context.params.chapterId);
  const data = saveChapterSchema.parse(await readBody(event));

  return await prisma.bookChapter.update({
    where: {
      id: chapterId,
    },
    data: {
      ...data,
      title: JSON.parse(data.json)?.content?.[0]?.content?.[0]?.text ?? "",
    },
  });
});
