"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

interface UpdateProfileData {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export async function updateProfile(data: UpdateProfileData) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return {
        success: false,
        message: "Vous devez être connecté pour mettre à jour votre profil.",
      };
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return {
        success: false,
        message: "Utilisateur non trouvé.",
      };
    }

    const updateData: any = {};

    if (data.name) {
      updateData.name = data.name;
    }

    if (data.email && data.email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return {
          success: false,
          message: "Cet email est déjà utilisé par un autre compte.",
        };
      }

      updateData.email = data.email;
    }

    if (data.currentPassword && data.newPassword) {
      if (!currentUser.password) {
        return {
          success: false,
          message: "Impossible de mettre à jour le mot de passe.",
        };
      }

      const passwordMatch = await bcrypt.compare(
        data.currentPassword,
        currentUser.password
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: "Le mot de passe actuel est incorrect.",
        };
      }

      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: "Aucune information à mettre à jour.",
      };
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    revalidatePath("/profile");
    revalidatePath("/");

    return {
      success: true,
      message: "Profil mis à jour avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour du profil.",
    };
  }
} 