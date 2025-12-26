import { InferUser } from "better-auth";
import { auth } from "@lib/auth";
import { Transaction, SubCategory, Category, Currency } from "@lib/generated/prisma";

type TypeModel<T, K extends keyof any> = Omit<T, K>;

export type ITransaction = TypeModel<Transaction, "id">;
export type ICategory = TypeModel<Category, "id">;
export type ISubCategory = TypeModel<SubCategory, "id">;
export type ICurrency = TypeModel<Currency, "id">;

export type User = InferUser<typeof auth>;
declare global {
  namespace Express {
    interface Request {
      user?: User;
      userId?: string;
    }
  }
}
