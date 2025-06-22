"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
  const { data: session, status } = useSession({
    required: false,
  });
  const pathname = usePathname();
  const isLoading = status === "loading";

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl pl-2 md:pl-4">
            Mon Projet
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Accueil
            </Link>
            {session && (
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/profile" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mon Profil
              </Link>
            )}
          </nav>
          <ModeToggle />
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Button variant="ghost" disabled>
                Chargement...
              </Button>
            ) : session ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Déconnexion
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Inscription</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 