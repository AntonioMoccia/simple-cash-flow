import { CategoryService } from "@/services/category.service";
import { Category } from "@/types/index";
import { success } from "@/lib/send-success";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }
  async creteCategory(req: Request, res: Response, next: NextFunction) {
    const { description }: Category = req.body;
   
    try {
      const newCategory = await this.categoryService.create({ description });

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
