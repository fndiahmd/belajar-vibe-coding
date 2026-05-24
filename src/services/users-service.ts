import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterUserInput) {
  const hashedPassword = await Bun.password.hash(data.password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  const [createdUser] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    })
    .$returningId();

  if (!createdUser) {
    throw new Error("Failed to create user");
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, createdUser.id));

  return user;
}
