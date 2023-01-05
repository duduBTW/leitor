import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query"],
});

export default defineEventHandler(async (event) => {
  const id = z.string().parse(event.context.params.id);

  const book = await prisma.book.findFirst({
    where: {
      id,
    },
    include: {
      chapters: {
        where: {
          isVersion: false,
        },
      },
    },
  });
  if (!book || book.chapters.length <= 0)
    throw new Error("No chapters found on this book");

  const { count } = await prisma.bookVersion.updateMany({
    where: {
      book: {
        id,
      },
    },
    data: {
      isActive: false,
    },
  });

  return await prisma.bookVersion.create({
    data: {
      book: {
        connect: {
          id,
        },
      },
      isActive: true,
      version: count + 1,
      chapters: {
        create: book.chapters.map((chapter) => {
          const { bookId, html, json, miniature, title } = chapter;

          return {
            Book: {
              connect: {
                id: bookId,
              },
            },
            html,
            json,
            title,
            miniature,
            isVersion: true,
          };
        }),
      },
      finalHtml: book.chapters.reduce(
        (current, chapter) => (current += chapter.html),
        ""
      ),
      createdDate: new Date().toISOString(),
    },
  });
});
