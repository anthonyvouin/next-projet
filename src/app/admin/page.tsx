import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStats } from "./actions";
import Link from "next/link";

export default async function AdminDashboard() {
  const statsResult = await getAdminStats();
  
  const stats = statsResult.success 
    ? statsResult.data 
    : { totalUsers: 0, newUsersToday: 0, adminUsers: 0 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Bienvenue sur le tableau de bord d'administration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats?.totalUsers}</CardTitle>
            <CardDescription>Utilisateurs totaux</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nombre total d'utilisateurs inscrits sur la plateforme.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats?.newUsersToday}</CardTitle>
            <CardDescription>Nouveaux utilisateurs aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Utilisateurs inscrits au cours des dernières 24 heures.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats?.adminUsers}</CardTitle>
            <CardDescription>Administrateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Nombre d'utilisateurs avec des privilèges d'administration.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Gérez votre application</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Gestion des utilisateurs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ajouter, modifier ou supprimer des utilisateurs.
            </p>
            <Link href="/admin/users" className="text-primary hover:underline text-sm">
              Gérer les utilisateurs →
            </Link>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Paramètres du site</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configurer les paramètres généraux de l'application.
            </p>
            <Link href="/admin/settings" className="text-primary hover:underline text-sm">
              Modifier les paramètres →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 