import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

import { Router } from "express";

const router = Router();

router.get("/session", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
