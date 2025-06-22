"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xl font-bold">
              Dashboard Admin
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="hover:underline">
                Tableau de bord
              </Link>
              <Link href="/admin/users" className="hover:underline">
                Utilisateurs
              </Link>
              <Link href="/" className="hover:underline">
                Site public
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="text-sm">
              {session?.user?.name || "Admin"}
            </div>
            <Link
              href="/api/auth/signout"
              className="bg-primary-foreground text-primary px-3 py-1 rounded-md text-sm"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} - Interface d'administration
        </div>
      </footer>
    </div>
  );
} 