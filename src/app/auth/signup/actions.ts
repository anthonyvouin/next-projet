"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export async function signUp(data: SignUpData) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Cet email est déjà utilisé.",
      };
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Créer l'utilisateur
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Compte créé avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de l'inscription.",
    };
  }
} 