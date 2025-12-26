import { prisma } from "@/lib/prisma-client";
import { Category } from "@/types";

export class CategoryService {
  constructor() {}

  async getAll() {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  } 

  async create(category: Category) {
    if (!category) throw Error("Category undefined");
    try {
      const newCategory = await prisma.category.create({
        data: {
          description: category.description,
        },
      });

      return newCategory;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      throw Error("Qualcosa è andato storto nella creazione della categoria");
    }
  }
}
