"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ConnexionPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setChargement(false);

    if (error) {
      setErreur("Email ou mot de passe incorrect.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6 md:py-12">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-[#d4a64a]">
          ← Retour accueil
        </Link>

        <div className="mt-8 overflow-hidden rounded-[32px] border border-[#4f3814] bg-[linear-gradient(180deg,#171717_0%,#0f0f0f_100%)] md:grid md:grid-cols-2">
          <div className="border-b border-[#2a2013] p-8 md:border-b-0 md:border-r md:p-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#d4a64a]">
              Connexion VIP
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Accède à ton
              <span className="block bg-gradient-to-r from-[#fff1cc] via-[#e0b45c] to-[#b37b1f] bg-clip-text text-transparent">
                dashboard premium
              </span>
            </h1>

            <p className="mt-6 text-sm leading-7 text-white/60 md:text-base">
              Connecte-toi pour accéder aux tickets VIP, aux analyses et aux
              pronostics du jour.
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="rounded-[28px] border border-[#2a2013] bg-[#111111] p-6">
              <h2 className="text-2xl font-black">Connexion</h2>

              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/70">
                    Adresse email
                  </label>

                  <input
                    type="email"
                    placeholder="ton@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#2a2013] bg-[#0c0c0c] px-4 py-3 text-white outline-none transition focus:border-[#d4a64a]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/70">
                    Mot de passe
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#2a2013] bg-[#0c0c0c] px-4 py-3 text-white outline-none transition focus:border-[#d4a64a]"
                    required
                  />
                </div>

                {erreur && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {erreur}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={chargement}
                  className="w-full rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] py-4 font-black text-black disabled:opacity-60"
                >
                  {chargement ? "Connexion..." : "Se connecter"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/50">Pas encore membre ?</p>

                <Link href="/vip" className="mt-2 inline-block font-bold text-[#d4a64a]">
                  Rejoindre le VIP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}