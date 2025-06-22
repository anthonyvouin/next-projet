"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

interface SignInData {
  email: string;
  password: string;
}

export async function authenticate(data: SignInData) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.password) {
      return {
        success: false,
        message: "Email ou mot de passe incorrect.",
      };
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Email ou mot de passe incorrect.",
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la connexion.",
    };
  }
} 