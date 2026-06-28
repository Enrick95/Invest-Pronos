import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  addMatch,
  updateMatch,
  deleteMatch,
  addVipTicket,
  deleteVipTicket,
  updateVipTicket,
  addResult,
  updateResult,
  deleteResult,
  addContestMatch,
  updateContestMatch,
  deleteContestMatch,
} from "./actions";

function SectionCard({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-[30px] border border-[#4f3814] bg-[#111111] p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white md:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-sm text-white/60">{subtitle}</p>
        ) : null}
      </div>

      {children}
    </section>
  );
}

function PhaseSelect({ defaultValue = "groupes" }: { defaultValue?: string }) {
  return (
    <select name="phase" defaultValue={defaultValue} className="input" required>
      <option value="groupes">🌍 Phase de groupes — 3 pts</option>
      <option value="seiziemes">🏆 16es de finale — 5 pts</option>
      <option value="huitiemes">🔥 8es de finale — 7 pts</option>
      <option value="quarts">⭐ Quarts de finale — 10 pts</option>
      <option value="demies">🥇 Demi-finales — 12 pts</option>
      <option value="finale">👑 Finale — 15 pts</option>
    </select>
  );
}

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

  const { data: vipTickets } = await supabase
    .from("vip_tickets")
    .select(
      "id, title, sport, date, pronostic, cote, confiance, analyse, image_url, created_at"
    )
    .order("created_at", { ascending: false });

  const { data: results } = await supabase
    .from("results")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: contestMatches } = await supabase
    .from("contest_matches")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8">
      <section className="mx-auto max-w-7xl">
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
            Gestion du site
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-white/60 md:text-base">
            Gère les matchs de l’accueil, les tickets VIP, les résultats de
            pronostics et les matchs du challenge Coupe du Monde depuis un seul
            endroit.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[28px] border border-[#4f3814] bg-[#111111] p-4">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d4a64a]">
                Navigation admin
              </p>

              <nav className="space-y-2">
                <a
                  href="#matchs-accueil"
                  className="block rounded-2xl border border-[#2a2013] bg-black/20 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#d4a64a] hover:text-[#d4a64a]"
                >
                  ⚽ Matchs accueil
                </a>

                <a
                  href="#tickets-vip"
                  className="block rounded-2xl border border-[#2a2013] bg-black/20 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#d4a64a] hover:text-[#d4a64a]"
                >
                  🎟️ Tickets VIP
                </a>

                <a
                  href="#resultats-pronos"
                  className="block rounded-2xl border border-[#2a2013] bg-black/20 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#d4a64a] hover:text-[#d4a64a]"
                >
                  📊 Résultats pronostics
                </a>

                <a
                  href="#challenge-cdm"
                  className="block rounded-2xl border border-[#2a2013] bg-black/20 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#d4a64a] hover:text-[#d4a64a]"
                >
                  🏆 Challenge Coupe du Monde
                </a>
              </nav>
            </div>
          </aside>

          <div className="space-y-8">
            <SectionCard
              id="matchs-accueil"
              title="⚽ Matchs accueil"
              subtitle="Ajoute, modifie ou supprime les matchs affichés sur la page d’accueil."
            >
              <form
                action={addMatch}
                className="grid gap-3 rounded-[24px] border border-[#2a2013] bg-black/20 p-5 md:grid-cols-6"
              >
                <input
                  name="league"
                  placeholder="Compétition"
                  className="input"
                  required
                />
                <input
                  name="date"
                  placeholder="Aujourd'hui"
                  className="input"
                  required
                />
                <input
                  name="time"
                  placeholder="19:00"
                  className="input"
                  required
                />
                <input
                  name="home"
                  placeholder="Équipe 1"
                  className="input"
                  required
                />
                <input
                  name="away"
                  placeholder="Équipe 2"
                  className="input"
                  required
                />

                <button className="rounded-xl bg-[#d4a64a] px-4 py-3 font-black text-black">
                  Ajouter
                </button>
              </form>

              <div className="mt-6 space-y-4">
                {(matches ?? []).map((match) => (
                  <form
                    key={match.id}
                    action={updateMatch}
                    className="grid gap-3 rounded-[24px] border border-[#2a2013] bg-black/30 p-5 md:grid-cols-7"
                  >
                    <input type="hidden" name="id" defaultValue={match.id} />

                    <input
                      name="league"
                      defaultValue={match.league}
                      className="input"
                    />
                    <input
                      name="date"
                      defaultValue={match.date}
                      className="input"
                    />
                    <input
                      name="time"
                      defaultValue={match.time}
                      className="input"
                    />
                    <input
                      name="home"
                      defaultValue={match.home}
                      className="input"
                    />
                    <input
                      name="away"
                      defaultValue={match.away}
                      className="input"
                    />

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
            </SectionCard>

            <SectionCard
              id="tickets-vip"
              title="🎟️ Tickets VIP"
              subtitle="Ajoute tes tickets premium et modifie les anciens facilement."
            >
              <form action={addVipTicket} className="grid gap-3">
                <input
                  name="title"
                  placeholder="🛡️ Ticket Safe"
                  className="input"
                  required
                />
                <input
                  name="sport"
                  placeholder="Football"
                  className="input"
                  required
                />
                <input
                  name="date"
                  placeholder="Aujourd'hui"
                  className="input"
                  required
                />
                <input
                  name="pronostic"
                  placeholder="Victoire Argentine"
                  className="input"
                  required
                />
                <input name="cote" placeholder="1.60" className="input" required />
                <input
                  name="confiance"
                  placeholder="Élevée"
                  className="input"
                  required
                />

                <textarea
                  name="analyse"
                  placeholder="Analyse VIP"
                  className="input min-h-[120px]"
                  required
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="input"
                />

                <button className="rounded-xl bg-[#d4a64a] px-4 py-3 font-black text-black">
                  Ajouter Ticket
                </button>
              </form>

              <div className="mt-8 space-y-4">
                {(vipTickets ?? []).map((ticket) => (
                  <form
                    key={ticket.id}
                    action={updateVipTicket}
                    className="rounded-[24px] border border-[#2a2013] bg-black/30 p-5"
                  >
                    <input type="hidden" name="id" defaultValue={ticket.id} />

                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        name="title"
                        defaultValue={ticket.title}
                        className="input"
                      />
                      <input
                        name="sport"
                        defaultValue={ticket.sport}
                        className="input"
                      />
                      <input
                        name="date"
                        defaultValue={ticket.date}
                        className="input"
                      />
                      <input
                        name="pronostic"
                        defaultValue={ticket.pronostic}
                        className="input"
                      />
                      <input
                        name="cote"
                        defaultValue={ticket.cote}
                        className="input"
                      />
                      <input
                        name="confiance"
                        defaultValue={ticket.confiance}
                        className="input"
                      />

                      <input
                        name="image_url"
                        defaultValue={ticket.image_url}
                        className="input md:col-span-2"
                      />

                      <textarea
                        name="analyse"
                        defaultValue={ticket.analyse}
                        className="input min-h-[100px] md:col-span-2"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="rounded-xl border border-[#d4a64a] px-4 py-3 font-bold text-[#d4a64a]">
                        Modifier
                      </button>

                      <button
                        formAction={deleteVipTicket}
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 font-bold text-red-400"
                      >
                        Supprimer
                      </button>
                    </div>
                  </form>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              id="resultats-pronos"
              title="📊 Résultats pronostics"
              subtitle="Ajoute les tickets gagnés/perdus à afficher sur la page résultats."
            >
              <form action={addResult} className="grid gap-3">
                <input name="date" placeholder="24/06" className="input" required />
                <input
                  name="competition"
                  placeholder="CAN U20"
                  className="input"
                  required
                />
                <input
                  name="match"
                  placeholder="Nouvelle-Zélande vs Égypte"
                  className="input"
                  required
                />
                <input
                  name="pronostic"
                  placeholder="Mohamed Salah passe décisive"
                  className="input"
                  required
                />
                <input name="cote" placeholder="4.00" className="input" required />
                <select name="statut" className="input" required>
                  <option value="">Choisir un statut</option>
                  <option value="Gagné">Gagné</option>
                  <option value="Perdu">Perdu</option>
                </select>

                <button className="rounded-xl bg-[#d4a64a] px-4 py-3 font-black text-black">
                  Ajouter le résultat
                </button>
              </form>

              <div className="mt-8 space-y-4">
                {results?.map((result) => (
                  <div
                    key={result.id}
                    className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4"
                  >
                    <form action={updateResult} className="grid gap-3">
                      <input type="hidden" name="id" value={result.id} />

                      <input
                        name="date"
                        defaultValue={result.date}
                        className="input"
                        required
                      />
                      <input
                        name="competition"
                        defaultValue={result.competition}
                        className="input"
                        required
                      />
                      <input
                        name="match"
                        defaultValue={result.match}
                        className="input"
                        required
                      />
                      <input
                        name="pronostic"
                        defaultValue={result.pronostic}
                        className="input"
                        required
                      />
                      <input
                        name="cote"
                        defaultValue={result.cote}
                        className="input"
                        required
                      />

                      <select
                        name="statut"
                        defaultValue={result.statut}
                        className="input"
                        required
                      >
                        <option value="Gagné">Gagné</option>
                        <option value="Perdu">Perdu</option>
                      </select>

                      <button className="rounded-xl bg-[#d4a64a] px-4 py-2 font-black text-black">
                        Mettre à jour
                      </button>
                    </form>

                    <form action={deleteResult} className="mt-3">
                      <input type="hidden" name="id" value={result.id} />
                      <button className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 font-black text-red-400">
                        Supprimer
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              id="challenge-cdm"
              title="🏆 Challenge Coupe du Monde"
              subtitle="Ajoute les matchs du challenge, choisis la phase, ferme les paris et mets les gagnants pour attribuer les points."
            >
              <div className="mb-5 rounded-2xl border border-[#d4a64a]/30 bg-[#d4a64a]/10 p-4 text-sm text-white/80">
                <p className="font-black text-[#d4a64a]">
                  Barème automatique du challenge
                </p>
                <p className="mt-2">
                  Groupes : 3 pts · 16es : 5 pts · 8es : 7 pts · Quarts : 10 pts ·
                  Demies : 12 pts · Finale : 15 pts
                </p>
              </div>

              <form action={addContestMatch} className="grid gap-3">
                <input name="date" placeholder="24/06" className="input" required />
                <input name="time" placeholder="21:00" className="input" required />

                <PhaseSelect />

                <input
                  name="team_a"
                  placeholder="France"
                  className="input"
                  required
                />
                <input
                  name="team_b"
                  placeholder="Brésil"
                  className="input"
                  required
                />
                <input
                  name="team_a_flag"
                  placeholder="https://..."
                  className="input"
                  required
                />
                <input
                  name="team_b_flag"
                  placeholder="https://..."
                  className="input"
                  required
                />

                <select name="status" className="input" required>
                  <option value="Ouvert">Ouvert</option>
                  <option value="Fermé">Fermé</option>
                  <option value="Terminé">Terminé</option>
                </select>

                <select name="winner" className="input">
                  <option value="">Aucun gagnant pour l’instant</option>
                  <option value="team_a">Équipe A gagne</option>
                  <option value="draw">Match nul</option>
                  <option value="team_b">Équipe B gagne</option>
                </select>

                <button className="rounded-xl bg-[#d4a64a] px-4 py-3 font-black text-black">
                  Ajouter match challenge
                </button>
              </form>

              <div className="mt-8 space-y-4">
                {contestMatches?.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4"
                  >
                    <form action={updateContestMatch} className="grid gap-3">
                      <input type="hidden" name="id" value={match.id} />

                      <input
                        name="date"
                        defaultValue={match.date}
                        className="input"
                      />
                      <input
                        name="time"
                        defaultValue={match.time}
                        className="input"
                      />

                      <PhaseSelect defaultValue={match.phase ?? "groupes"} />

                      <input
                        name="team_a"
                        defaultValue={match.team_a}
                        className="input"
                      />
                      <input
                        name="team_b"
                        defaultValue={match.team_b}
                        className="input"
                      />
                      <input
                        name="team_a_flag"
                        defaultValue={match.team_a_flag}
                        className="input"
                      />
                      <input
                        name="team_b_flag"
                        defaultValue={match.team_b_flag}
                        className="input"
                      />

                      <select
                        name="status"
                        defaultValue={match.status}
                        className="input"
                      >
                        <option value="Ouvert">Ouvert</option>
                        <option value="Fermé">Fermé</option>
                        <option value="Terminé">Terminé</option>
                      </select>

                      <select
                        name="winner"
                        defaultValue={match.winner ?? ""}
                        className="input"
                      >
                        <option value="">Aucun gagnant</option>
                        <option value="team_a">Équipe A gagne</option>
                        <option value="draw">Match nul</option>
                        <option value="team_b">Équipe B gagne</option>
                      </select>

                      <button className="rounded-xl bg-[#d4a64a] px-4 py-2 font-black text-black">
                        Modifier
                      </button>
                    </form>

                    <form action={deleteContestMatch} className="mt-3">
                      <input type="hidden" name="id" value={match.id} />
                      <button className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 font-black text-red-400">
                        Supprimer
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </section>
    </main>
  );
}