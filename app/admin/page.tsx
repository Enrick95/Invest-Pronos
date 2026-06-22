import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { addMatch, updateMatch, deleteMatch } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  if (user.email !== "louisiusenrick@gmail.com") {
    redirect("/");
  }

  const { data: matches } = await supabase
    .from("home_matches")
    .select("id, league, date, time, home, away, created_at")
    .order("created_at", { ascending: true });

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-[#d4a64a]">
            ← Retour accueil
          </Link>

          <Link href="/dashboard" className="text-sm font-bold text-[#d4a64a]">
            Dashboard VIP →
          </Link>
        </div>

        <div className="rounded-[30px] border border-[#4f3814] bg-[#111111] p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4a64a]">
            Panel admin
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            Gestion des matchs
          </h1>

          <p className="mt-4 text-sm text-white/60">
            Ajoute, modifie ou supprime les matchs affichés sur la page
            d’accueil.
          </p>
        </div>

        <form
          action={addMatch}
          className="mt-8 grid gap-3 rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:grid-cols-6"
        >
          <input name="league" placeholder="Compétition" className="input" required />
          <input name="date" placeholder="Aujourd'hui" className="input" required />
          <input name="time" placeholder="19:00" className="input" required />
          <input name="home" placeholder="Équipe 1" className="input" required />
          <input name="away" placeholder="Équipe 2" className="input" required />

          <button className="rounded-xl bg-[#d4a64a] px-4 py-3 font-black text-black">
            Ajouter
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {(matches ?? []).map((match) => (
            <form
              key={match.id}
              action={updateMatch}
              className="grid gap-3 rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:grid-cols-7"
            >
              <input type="hidden" name="id" defaultValue={match.id} />

              <input name="league" defaultValue={match.league} className="input" />
              <input name="date" defaultValue={match.date} className="input" />
              <input name="time" defaultValue={match.time} className="input" />
              <input name="home" defaultValue={match.home} className="input" />
              <input name="away" defaultValue={match.away} className="input" />

              <button className="rounded-xl border border-[#d4a64a] px-4 py-3 font-bold text-[#d4a64a]">
                Modifier
              </button>

              <button
                formAction={deleteMatch}
                className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 font-bold text-red-400"
              >
                Supprimer
              </button>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}