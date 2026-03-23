import { db } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../types/user";

const usersCollection = db.collection<User>("users");

export const registerUser = async (email: string, password: string) => {
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const result = await usersCollection.insertOne(newUser);

  return {
    id: result.insertedId,
    email,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await usersCollection.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { token };
};