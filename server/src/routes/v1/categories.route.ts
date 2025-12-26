import { Router } from "express";
import { CategoryController } from "@/controllers/category.controller";
import { wrap } from "@/lib/wrapAsync";

const router = Router();
const categoriesController = new CategoryController();
const categoriesWrapper = wrap(categoriesController);

router.post("/", categoriesWrapper(categoriesController.creteCategory));
router.get("/",categoriesWrapper(categoriesController.getCategories))
export default router