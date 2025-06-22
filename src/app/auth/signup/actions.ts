"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Cet email est déjà utilisé.",
      };
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // Rôle par défaut
      },
    });

    return {
      success: true,
      message: "Compte créé avec succès. Vous pouvez maintenant vous connecter.",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de l'inscription.",
    };
  }
} 