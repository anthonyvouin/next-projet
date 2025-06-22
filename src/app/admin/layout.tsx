"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/profile");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Chargement...</h2>
          <p className="text-muted-foreground">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xl font-bold">
              Tableau de bord
            </Link>
          
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-background py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} - Interface d'administration
        </div>
      </footer>
    </div>
  );
} 