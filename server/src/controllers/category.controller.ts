import { CategoryService } from "@/services/category.service";
import { ICategory } from "@/types/index";
import { success } from "@/lib/send-success";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }
  async creteCategory(req: Request, res: Response, next: NextFunction) {
    const { name }: ICategory = req.body;
    const userId = req.user?.id
    try {
      const newCategory = await this.categoryService.create({ 
        name:name,
        userId: userId || "null"
       });

      success(res, {
        category: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.getAll();
      return success(res, { categories });
    } catch (error) {
      next(error);
    }
  }
}
