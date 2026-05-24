import { Elysia } from "elysia";
import { authRoute } from "./routes/auth-route";
import { usersRoute } from "./routes/users-route";

const app = new Elysia()
  .get("/", () => ({ message: "Hello World from Elysia!" }))
  .use(usersRoute)
  .use(authRoute)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
