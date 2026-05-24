import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api" }).post(
  "/users",
  async ({ body }) => {
    try {
      const createdUser = await registerUser(body);

      return {
        message: "User created successfully",
        data: createdUser,
      };
    } catch (error: any) {
      return {
        error: error?.message?.toLowerCase().includes("duplicate")
          ? "email sudah terdaftar"
          : error.message,
      };
    }
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  }
);
