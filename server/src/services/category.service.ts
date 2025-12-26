import { prisma } from "@/lib/prisma-client";
import { ICategory } from "@/types";

export class CategoryService {
  constructor() {}

  async getAll(userId?: string) {
    try {
      const categories = await prisma.category.findMany({
        where: {
          OR: [
            {
              userId: "null",
            },
            {
              userId: userId,
            },
          ],
        },
      });
      return categories;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  }

  async create(category: ICategory) {
    if (!category) throw Error("Category undefined");
    try {
      const newCategory = await prisma.category.create({
        data: {
          name: category.name,
        },
      });

      return newCategory;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      throw Error("Qualcosa è andato storto nella creazione della categoria");
    }
  }
}
