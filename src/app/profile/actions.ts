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
    // Vérifier la session de l'utilisateur
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return {
        success: false,
        message: "Vous devez être connecté pour mettre à jour votre profil.",
      };
    }

    // Récupérer l'utilisateur actuel
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return {
        success: false,
        message: "Utilisateur non trouvé.",
      };
    }

    // Préparer les données à mettre à jour
    const updateData: any = {};

    // Mettre à jour le nom si fourni
    if (data.name) {
      updateData.name = data.name;
    }

    // Mettre à jour l'email si fourni et différent
    if (data.email && data.email !== currentUser.email) {
      // Vérifier si l'email est déjà utilisé
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

    // Mettre à jour le mot de passe si fourni
    if (data.currentPassword && data.newPassword) {
      // Vérifier que l'utilisateur a un mot de passe
      if (!currentUser.password) {
        return {
          success: false,
          message: "Impossible de mettre à jour le mot de passe.",
        };
      }

      // Vérifier le mot de passe actuel
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

      // Hacher le nouveau mot de passe
      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }

    // Si aucune donnée à mettre à jour
    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: "Aucune information à mettre à jour.",
      };
    }

    // Mettre à jour l'utilisateur
    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    // Revalider le chemin pour mettre à jour les données affichées
    revalidatePath("/profile");

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