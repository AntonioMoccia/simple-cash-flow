import { Router } from "express";
import { CategoryController } from "@/controllers/category.controller";
import { wrap } from "@/lib/wrapAsync";

const router = Router();
const categoryController = new CategoryController();
const categporyWrapper = wrap(categoryController);

router.post("/", categporyWrapper(categoryController.creteCategory));
router.get("/",categporyWrapper(categoryController.getCategories))
export default router