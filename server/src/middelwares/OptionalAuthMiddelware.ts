import { auth } from "@lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";

export async function OptionalAuthMiddelware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  req.user = session?.user;
  req.userId = session?.user?.id;
  next();
}
