"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

import { redirect } from "next/navigation";

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const iin = formData.get("iin") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !iin || !email || !phone || !password || !confirmPassword) {
    return { error: "Все поля обязательны для заполнения" };
  }

  if (password !== confirmPassword) {
    return { error: "Пароли не совпадают" };
  }

  try {
    // Проверка уникальности
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { iin },
          { phone }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) return { error: "Пользователь с таким email уже существует" };
      if (existingUser.iin === iin) return { error: "Пользователь с таким ИИН уже существует" };
      if (existingUser.phone === phone) return { error: "Пользователь с таким номером телефона уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        iin,
        phone,
        password: hashedPassword,
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    return { error: "Ошибка при регистрации" };
  }
  
  redirect("/login");
}

export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Неверные учетные данные" };
        default:
          return { error: "Ошибка авторизации" };
      }
    }
    throw error;
  }
}
