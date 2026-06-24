import Link from "next/link";
import { addContestPrediction } from "@/app/admin/actions";
import { createClient } from "@/utils/supabase/server";

type ContestMatch = {
  id: string;
  date: string;
  time: string;
  team_a: string;
  team_b: string;
  team_a_flag: string | null;
  team_b_flag: string | null;
  status: string;
  winner: "team_a" | "team_b" | "draw" | null;
};

type ContestPrediction = {
  user_id: string;
  point: number | null;
};

type Profile = {
  user_id: string;
  pseudo: string;
};

type UserPrediction = {
  match_id: string;
  prediction: string;
};

function getStatusStyles(status: string) {
  if (status === "Terminé") {
    return "border-green-500/40 bg-green-500/15 text-green-400";
  }

  if (status === "Ouvert") {
    return "border-[#d4a64a]/40 bg-[#d4a64a] text-black";
  }

  return "border-white/15 bg-white/10 text-white/80";
}

function getWinnerLabel(match: ContestMatch) {
  if (match.winner === "team_a") return match.team_a;
  if (match.winner === "team_b") return match.team_b;
  if (match.winner === "draw") return "Match nul";
  return null;
}

function getMedal(index: number) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  return "🥉";
}

function getPredictionLabel(prediction: string, match: ContestMatch) {
  if (prediction === "team_a") return match.team_a;
  if (prediction === "team_b") return match.team_b;
  return "Match nul";
}

function getDateBadge(date: string) {
  const normalized = date.trim();

  if (normalized === "24/06/2026") return "Aujourd’hui";
  if (normalized === "25/06/2026") return "Demain";

  return normalized;
}

function TeamFlag({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 md:h-14 md:w-14" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 rounded-full border-2 border-white/10 object-cover shadow-lg md:h-14 md:w-14"
    />
  );
}

export default async function ChallengePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: matches } = await supabase
    .from("contest_matches")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  const { data: predictions } = await supabase
    .from("contest_predictions")
    .select("user_id, point");

  const { data: profiles } = await supabase
    .from("profiles")
    .select("user_id, pseudo");

  const profilesMap = new Map<string, string>();

  for (const profile of (profiles ?? []) as Profile[]) {
    profilesMap.set(profile.user_id, profile.pseudo);
  }

  const rankingMap = new Map<string, number>();

  for (const prediction of (predictions ?? []) as ContestPrediction[]) {
    const currentPoints = rankingMap.get(prediction.user_id) ?? 0;
    rankingMap.set(
      prediction.user_id,
      currentPoints + (prediction.point ?? 0)
    );
  }

  const ranking = Array.from(rankingMap.entries())
    .map(([userId, points]) => ({
      userId,
      points,
      pseudo: profilesMap.get(userId) || `Joueur ${userId.slice(0, 6)}`,
    }))
    .sort((a, b) => b.points - a.points);

  const topThree = ranking.slice(0, 3);
  const restRanking = ranking.slice(3);

  let myPredictions: UserPrediction[] = [];

  if (user) {
    const { data } = await supabase
      .from("contest_predictions")
      .select("match_id, prediction")
      .eq("user_id", user.id);

    myPredictions = (data ?? []) as UserPrediction[];
  }

  return (
    <main className="min-h-screen bg-[#050505] px-3 py-4 text-white md:px-8 md:py-8">
      <section className="mx-auto max-w-6xl">
        {/* TOP BAR */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link href="/" className="text-xs font-bold text-[#d4a64a] md:text-sm">
            ← Retour accueil
          </Link>

          {user ? (
            <span className="text-xs font-bold text-green-400 md:text-sm">
              Connecté ✅
            </span>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/connexion"
                className="text-xs font-bold text-[#d4a64a] md:text-sm"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="text-xs font-bold text-[#d4a64a] md:text-sm"
              >
                Inscription →
              </Link>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-[26px] border border-[#4f3814] bg-[#111111] shadow-2xl md:rounded-[34px]">
          {/* HERO */}
          <div className="relative overflow-hidden border-b border-[#2a2013]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(212,166,74,0.18),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(212,166,74,0.12),transparent_28%)]" />

            <div className="relative z-10 px-4 py-8 md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:px-12 md:py-14">
              <div>
                <p className="mb-4 w-fit rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase text-black md:px-4 md:text-xs">
                  Gratuit
                </p>

                <h1 className="text-3xl font-black uppercase leading-[0.95] md:text-7xl">
                  Challenge
                  <span className="block">Coupe du Monde</span>
                  <span className="block text-[#d4a64a]">2026</span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 md:mt-5 md:text-lg md:leading-7">
                  Pronostique gratuitement chaque match, marque des points et
                  grimpe au classement pour tenter de gagner les lots.
                </p>

                <div className="mt-5 inline-flex rounded-full border border-[#d4a64a]/40 bg-black/40 px-4 py-2 text-xs font-bold text-[#efc56f] md:mt-7 md:px-5 md:py-3 md:text-sm">
                  🗓️ Fin du concours : après la finale
                </div>
              </div>

              <div className="relative z-10 mt-6 hidden items-center justify-center md:flex">
                <div className="rounded-[28px] border border-[#d4a64a]/20 bg-[radial-gradient(circle_at_center,rgba(212,166,74,0.18),transparent_60%)] p-10">
                  <div className="text-[140px] leading-none drop-shadow-[0_0_25px_rgba(212,166,74,0.25)]">
                    🏆
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOTS */}
          <div className="border-b border-[#2a2013] px-4 py-6 md:px-12 md:py-8">
            <h2 className="text-xl font-black md:text-2xl">🏆 Lots à gagner</h2>

            <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-4">
              <div className="rounded-[20px] border border-white/15 bg-[#151515] p-4 text-center md:rounded-[24px] md:p-6">
                <p className="text-4xl md:text-5xl">🥈</p>
                <p className="mt-2 text-lg font-black md:mt-3 md:text-xl">
                  2ème place
                </p>
                <p className="mt-1 text-xs text-white/50 md:text-sm">
                  Lot à définir
                </p>
              </div>

              <div className="rounded-[22px] border border-[#d4a64a] bg-[#1b140b] p-5 text-center shadow-[0_0_35px_rgba(212,166,74,0.18)] md:scale-105 md:rounded-[28px] md:p-7">
                <p className="text-5xl md:text-6xl">🥇</p>
                <p className="mt-2 text-xl font-black text-[#d4a64a] md:mt-3 md:text-2xl">
                  1ère place
                </p>
                <p className="mt-1 text-sm font-bold">Grand gagnant</p>
                <p className="mt-1 text-xs text-white/50 md:text-sm">
                  Lot à définir
                </p>
              </div>

              <div className="rounded-[20px] border border-orange-500/30 bg-[#151515] p-4 text-center md:rounded-[24px] md:p-6">
                <p className="text-4xl md:text-5xl">🥉</p>
                <p className="mt-2 text-lg font-black md:mt-3 md:text-xl">
                  3ème place
                </p>
                <p className="mt-1 text-xs text-white/50 md:text-sm">
                  Lot à définir
                </p>
              </div>
            </div>
          </div>

          {/* MATCHS */}
          <div className="border-b border-[#2a2013] px-4 py-6 md:px-12 md:py-8">
            <div className="mb-4 flex items-center justify-between gap-3 md:mb-5">
              <h2 className="text-xl font-black md:text-2xl">
                ⚽ Matchs du challenge
              </h2>

              <span className="rounded-full border border-[#5e4318] bg-[#1b140b] px-3 py-1.5 text-[10px] font-bold text-[#efc56f] md:px-4 md:py-2 md:text-xs">
                1 prono par match
              </span>
            </div>

            {(matches ?? []).length === 0 ? (
              <div className="rounded-[22px] border border-[#3a2a14] bg-[#151515] p-5 text-center text-sm text-white/50 md:rounded-[24px] md:p-6">
                Aucun match disponible pour le moment.
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {(matches as ContestMatch[]).map((match) => {
                  const userPrediction = myPredictions.find(
                    (prediction) => prediction.match_id === match.id
                  );

                  const winnerLabel = getWinnerLabel(match);

                  return (
                    <div
                      key={match.id}
                      className="rounded-[22px] border border-[#3a2a14] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] p-4 md:rounded-[26px] md:p-6"
                    >
                      {/* HEADER MATCH */}
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div
                          className={`w-fit rounded-full border px-3 py-1 text-[10px] font-black uppercase md:text-[11px] ${getStatusStyles(
                            match.status
                          )}`}
                        >
                          {match.status}
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-wide text-white/45 md:text-sm">
                          {getDateBadge(match.date)} • {match.time}
                        </p>
                      </div>

                      {/* VERSION MOBILE */}
                      <div className="md:hidden">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                          <div className="flex flex-col items-center text-center">
                            <TeamFlag src={match.team_a_flag} alt={match.team_a} />
                            <p className="mt-2 text-[13px] font-black uppercase leading-tight">
                              {match.team_a}
                            </p>
                          </div>

                          <div className="px-1 text-center">
                            {match.status === "Terminé" ? (
                              <>
                                <p className="text-2xl font-black text-white">
                                  1 - 0
                                </p>
                                <p className="mt-1 text-[10px] font-bold uppercase text-green-400">
                                  {winnerLabel
                                    ? `Victoire ${winnerLabel}`
                                    : "Résultat"}
                                </p>
                              </>
                            ) : (
                              <p className="text-lg font-black uppercase text-[#d4a64a]">
                                VS
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-center text-center">
                            <TeamFlag src={match.team_b_flag} alt={match.team_b} />
                            <p className="mt-2 text-[13px] font-black uppercase leading-tight">
                              {match.team_b}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* VERSION DESKTOP */}
                      <div className="hidden items-center gap-5 md:grid md:grid-cols-[1fr_auto_1fr]">
                        <div className="flex items-center gap-4">
                          <TeamFlag src={match.team_a_flag} alt={match.team_a} />
                          <p className="text-2xl font-black uppercase leading-tight">
                            {match.team_a}
                          </p>
                        </div>

                        <div className="text-center">
                          {match.status === "Terminé" ? (
                            <>
                              <p className="text-4xl font-black text-white">
                                1 - 0
                              </p>
                              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-green-400">
                                {winnerLabel
                                  ? `Victoire ${winnerLabel}`
                                  : "Résultat validé"}
                              </p>
                            </>
                          ) : (
                            <p className="text-3xl font-black uppercase text-[#d4a64a]">
                              VS
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-4 text-right">
                          <p className="text-2xl font-black uppercase leading-tight">
                            {match.team_b}
                          </p>
                          <TeamFlag src={match.team_b_flag} alt={match.team_b} />
                        </div>
                      </div>

                      {/* BAS MATCH */}
                      {match.status === "Terminé" ? (
                        <div className="mt-4 flex justify-center md:mt-6 md:justify-end">
                          <div className="rounded-full border border-green-500/35 bg-green-500/10 px-4 py-2 text-xs font-black text-green-400 md:px-5 md:text-sm">
                            Voir résultats
                          </div>
                        </div>
                      ) : !user ? (
                        <div className="mt-4 rounded-2xl border border-[#d4a64a]/30 bg-[linear-gradient(180deg,#1b140b_0%,#120d07_100%)] p-3 md:mt-6 md:p-4">
                          <p className="text-center text-sm font-black text-[#f0c86d] md:text-base">
                            Inscris-toi gratuitement pour pronostiquer ce match
                          </p>

                          <p className="mt-1 text-center text-[11px] text-white/55 md:text-xs">
                            1 prono par match • classement en direct • challenge
                            gratuit
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:gap-3">
                            <Link
                              href="/connexion"
                              className="rounded-xl border border-[#d4a64a]/40 bg-black/30 px-3 py-3 text-center text-xs font-black text-white"
                            >
                              Connexion
                            </Link>

                            <Link
                              href="/inscription"
                              className="rounded-xl bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-3 py-3 text-center text-xs font-black text-black"
                            >
                              S’inscrire
                            </Link>
                          </div>
                        </div>
                      ) : userPrediction ? (
                        <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center md:mt-6 md:py-4">
                          <p className="text-sm font-black text-green-400">
                            ✅ Prono validé
                          </p>

                          <p className="mt-1 text-[11px] text-white/60 md:text-sm">
                            Ton choix :{" "}
                            {getPredictionLabel(
                              userPrediction.prediction,
                              match
                            )}
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* MOBILE */}
                          <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
                            <form action={addContestPrediction}>
                              <input type="hidden" name="match_id" value={match.id} />
                              <input type="hidden" name="prediction" value="team_a" />
                              <button className="w-full rounded-xl border border-[#d4a64a]/40 bg-[#1b140b] px-2 py-3 text-[11px] font-black leading-tight text-[#d4a64a]">
                                {match.team_a}
                              </button>
                            </form>

                            <form action={addContestPrediction}>
                              <input type="hidden" name="match_id" value={match.id} />
                              <input type="hidden" name="prediction" value="draw" />
                              <button className="w-full rounded-xl border border-[#d4a64a]/40 bg-[#1b140b] px-2 py-3 text-[11px] font-black leading-tight text-[#d4a64a]">
                                Nul
                              </button>
                            </form>

                            <form action={addContestPrediction}>
                              <input type="hidden" name="match_id" value={match.id} />
                              <input type="hidden" name="prediction" value="team_b" />
                              <button className="w-full rounded-xl border border-[#d4a64a]/40 bg-[#1b140b] px-2 py-3 text-[11px] font-black leading-tight text-[#d4a64a]">
                                {match.team_b}
                              </button>
                            </form>
                          </div>

                          {/* DESKTOP */}
                          <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
                            <form action={addContestPrediction}>
                              <input type="hidden" name="match_id" value={match.id} />
                              <input type="hidden" name="prediction" value="team_a" />
                              <button className="w-full rounded-xl border border-[#d4a64a]/40 bg-[#1b140b] px-3 py-3 text-sm font-black text-[#d4a64a] transition hover:bg-[#241808]">
                                {match.team_a}
                              </button>
                            </form>

                            <form action={addContestPrediction}>
                              <input type="hidden" name="match_id" value={match.id} />
                              <input type="hidden" name="prediction" value="draw" />
                              <button className="w-full rounded-xl border border-[#d4a64a]/40 bg-[#1b140b] px-3 py-3 text-sm font-black text-[#d4a64a] transition hover:bg-[#241808]">
                                Match nul
                              </button>
                            </form>

                            <form action={addContestPrediction}>
                              <input type="hidden" name="match_id" value={match.id} />
                              <input type="hidden" name="prediction" value="team_b" />
                              <button className="w-full rounded-xl border border-[#d4a64a]/40 bg-[#1b140b] px-3 py-3 text-sm font-black text-[#d4a64a] transition hover:bg-[#241808]">
                                {match.team_b}
                              </button>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CLASSEMENT */}
          <div className="border-b border-[#2a2013] px-4 py-6 md:px-12 md:py-8">
            <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
              <h2 className="text-xl font-black md:text-2xl">
                📊 Classement en direct
              </h2>
            </div>

            {ranking.length === 0 ? (
              <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-6 text-center text-sm text-white/50 md:p-8">
                Aucun joueur pour le moment.
              </div>
            ) : (
              <>
                <div className="grid gap-3 md:grid-cols-3 md:gap-4">
                  {topThree.map((player, index) => (
                    <div
                      key={player.userId}
                      className={`rounded-[22px] border p-4 text-center md:rounded-[24px] md:p-5 ${
                        index === 0
                          ? "border-[#d4a64a] bg-[#1b140b] shadow-[0_0_35px_rgba(212,166,74,0.15)] md:scale-105"
                          : "border-[#2a2013] bg-[#151515]"
                      }`}
                    >
                      <p className="text-4xl md:text-5xl">{getMedal(index)}</p>

                      <p className="mt-2 text-base font-black md:mt-3 md:text-lg">
                        {player.pseudo}
                      </p>

                      {user?.id === player.userId && (
                        <p className="mt-2 inline-flex rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase text-black md:text-[11px]">
                          C’est toi
                        </p>
                      )}

                      <p className="mt-2 text-xl font-black text-[#d4a64a] md:mt-3 md:text-2xl">
                        {player.points} pts
                      </p>
                    </div>
                  ))}
                </div>

                {restRanking.length > 0 && (
                  <div className="mt-4 space-y-2 md:mt-5 md:space-y-3">
                    {restRanking.map((player, index) => (
                      <div
                        key={player.userId}
                        className="flex items-center justify-between rounded-2xl border border-[#2a2013] bg-[#151515] px-4 py-3 md:px-5 md:py-4"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-black text-white md:h-9 md:w-9 md:text-sm">
                            {index + 4}
                          </span>

                          <div>
                            <p className="text-sm font-black md:text-base">
                              {player.pseudo}
                            </p>
                            {user?.id === player.userId && (
                              <p className="text-[10px] font-bold text-green-400 md:text-xs">
                                C’est toi
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-base font-black text-[#d4a64a] md:text-lg">
                          {player.points} pts
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <p className="mt-5 text-center text-xs text-[#d4a64a] md:mt-6 md:text-sm">
              Le classement se met à jour automatiquement après les résultats.
            </p>
          </div>

          {/* VIP */}
          <div className="bg-[#0b0b0b] px-4 py-6 text-center md:px-12 md:py-8">
            <h2 className="text-xl font-black md:text-3xl">
              Tu veux mes vrais pronostics premium ?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 md:leading-7">
              Le challenge est gratuit. L’espace VIP te donne accès aux analyses
              détaillées, tickets premium et sélections privées.
            </p>

            <Link
              href="/vip"
              className="mt-5 inline-flex rounded-full bg-[#d4a64a] px-6 py-3 text-sm font-black text-black md:mt-6 md:px-7"
            >
              Découvrir le VIP
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}