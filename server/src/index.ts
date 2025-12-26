import "reflect-metadata";

import { config } from "dotenv";
config();
import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

//routers
import googleRouter from "@routes/google.route";
import eventRouter from "@routes/event.route";
import categoryRouter from "@/routes/category.route";
import eventTypeRouter from "@/routes/event_type.route";

//middelwares
import cors from "cors";
import { authMiddelware } from "@middelwares/authMiddelware";
import { errorHandler } from "@/middelwares/error-handler";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000", // il tuo frontend
    credentials: true, // necessario per cookie / Authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  })
);
app.all("/api/auth/*", toNodeHandler(auth.handler));

app.use(express.json());

app.use("/api/google", googleRouter);
app.use("/api/eventS", eventRouter);
app.use("/api/category", categoryRouter);
app.use("/api/event_type", eventTypeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
