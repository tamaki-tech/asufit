import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// sample routes
const bookRoute = new Hono()
  .get("/", (c) => {
    const books = ["吾輩は猫である", "こころ", "人間失格", "銀河鉄道の夜"];
    const randomBook = books[Math.floor(Math.random() * books.length)];
    return c.json({ result: randomBook });
  })
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }))
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string().min(1),
        author: z.string().min(1),
      })
    ),
    async (c) => {
      const body = c.req.valid("json");
      return c.json({ result: "create a book", data: body }, 201);
    }
  );

// main app
export const app = new Hono().route("/book", bookRoute);

export type ApiRoute = typeof app;
