import { Hono } from "hono";
import { authRoute } from "./routes/auth";

// main app
export const app = new Hono().route("/auth", authRoute);

export type ApiRoute = typeof app;
