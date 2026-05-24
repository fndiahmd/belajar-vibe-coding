import { Elysia, t } from "elysia";
import { loginUser } from "../services/auth-service";

export const authRoute = new Elysia({ prefix: "/api/auth" }).post(
  "/login",
  async ({ body }) => {
    try {
      const result = await loginUser(body);
      return { data: result };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);
