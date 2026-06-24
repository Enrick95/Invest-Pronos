"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function InscriptionPage() {
  const router = useRouter();
  const supabase = createClient();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [chargement, setChargement] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setMessage("");
    setChargement(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          pseudo,
        },
      },
    });

    setChargement(false);

    if (error || !data.user) {
      setErreur(error?.message || "Erreur inconnue");
      return;
    }

    setMessage("Compte créé avec succès. Tu peux maintenant te connecter.");

    setTimeout(() => {
      router.push("/connexion");
    }, 1200);
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
              Inscription gratuite
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Crée ton compte
              <span className="block bg-gradient-to-r from-[#fff1cc] via-[#e0b45c] to-[#b37b1f] bg-clip-text text-transparent">
                gratuitement
              </span>
            </h1>

            <p className="mt-6 text-sm leading-7 text-white/60 md:text-base">
              Inscris-toi pour participer au challenge Coupe du Monde, faire tes
              pronostics gratuits et apparaître dans le classement.
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="rounded-[28px] border border-[#2a2013] bg-[#111111] p-6">
              <h2 className="text-2xl font-black">Inscription</h2>

              <form onSubmit={handleSignup} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/70">
                    Pseudo
                  </label>

                  <input
                    type="text"
                    placeholder="Ton pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full rounded-xl border border-[#2a2013] bg-[#0c0c0c] px-4 py-3 text-white outline-none transition focus:border-[#d4a64a]"
                    required
                  />
                </div>

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
                    placeholder="Minimum 6 caractères"
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

                {message && (
                  <p className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={chargement}
                  className="w-full rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] py-4 font-black text-black disabled:opacity-60"
                >
                  {chargement ? "Création..." : "Créer mon compte"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/50">Déjà inscrit ?</p>

                <Link
                  href="/connexion"
                  className="mt-2 inline-block font-bold text-[#d4a64a]"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}