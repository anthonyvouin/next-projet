import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navigation/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid items-center justify-items-center min-h-[calc(100vh-64px)] p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Bienvenue sur mon projet Next.js</h1>
          <p className="text-lg text-muted-foreground">
            Ce projet utilise Next.js, Prisma, Shadcn UI et NextAuth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prisma ORM</CardTitle>
                <CardDescription>Gestion de base de données simplifiée</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Base de données configurée avec Prisma pour une gestion facile des données.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Documentation</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shadcn UI</CardTitle>
                <CardDescription>Composants React accessibles</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Interface utilisateur construite avec des composants réutilisables et accessibles.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Explorer les composants</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild>
              <a href="/auth/signin">Commencer</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
