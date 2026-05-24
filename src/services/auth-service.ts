import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export type LoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser(data: LoginUserInput) {
  const [user] = await db.select().from(users).where(eq(users.email, data.email));

  if (!user) {
    throw new Error("email sudah terdaftar");
  }

  const isPasswordMatch = await Bun.password.verify(data.password, user.password);

  if (!isPasswordMatch) {
    throw new Error("email sudah terdaftar");
  }

  return "OK";
}
