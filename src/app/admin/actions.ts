"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function checkAdminPermission() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("Non authentifié");
  }
  
  if (session.user.role !== "ADMIN") {
    throw new Error("Accès non autorisé");
  }
  
  return session.user;
}

export async function getAdminStats() {
  try {
    await checkAdminPermission();
    
    const totalUsers = await prisma.user.count();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newUsersToday = await prisma.user.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });
    
    const adminUsers = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });
    
    return {
      success: true,
      data: {
        totalUsers,
        newUsersToday,
        adminUsers,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

