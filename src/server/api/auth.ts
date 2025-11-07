import { toNodeHandler } from "better-auth/node";
import express from "express";

import { auth } from "@/lib/auth";

const authRouter = express.Router();

authRouter.all("/api/auth/{*any}", toNodeHandler(auth));

export { authRouter };
