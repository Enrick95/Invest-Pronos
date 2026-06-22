import Link from "next/link";

export default function EspaceVipPage() {
  const pronostics = [
    {
      sport: "Football",
      competition: "Ligue 1",
      match: "PSG vs Marseille",
      heure: "21:00",
      pronostic: "Victoire PSG",
      cote: "1.85",
      confiance: "Élevée",
    },
    {
      sport: "Football",
      competition: "Premier League",
      match: "Liverpool vs Arsenal",
      heure: "18:30",
      pronostic: "Plus de 2.5 buts",
      cote: "1.70",
      confiance: "Moyenne",
    },
    {
      sport: "Basket",
      competition: "NBA",
      match: "Lakers vs Celtics",
      heure: "02:00",
      pronostic: "Lakers +4.5",
      cote: "1.90",
      confiance: "Élevée",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-[#d4a64a]">
            ← Retour accueil
          </Link>

          <Link
            href="/connexion"
            className="rounded-full border border-[#d4a64a] px-4 py-2 text-sm font-bold text-[#d4a64a]"
          >
            Connexion
          </Link>
        </div>

        <div className="mt-8 rounded-[30px] border border-[#4f3814] bg-[radial-gradient(circle_at_top_left,rgba(212,166,74,0.16),transparent_30%),linear-gradient(180deg,#171717_0%,#0f0f0f_100%)] p-6 md:rounded-[42px] md:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#d4a64a]">
            Espace membre
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Pronostics
            <span className="block bg-gradient-to-r from-[#fff1cc] via-[#e0b45c] to-[#b37b1f] bg-clip-text text-transparent">
              VIP du jour
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 md:text-xl">
            Retrouve ici les sélections réservées aux membres, avec les cotes,
            le niveau de confiance et les analyses.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Pronostics du jour
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">3</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Confiance élevée
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">2</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Cote moyenne
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">1.81</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Mise à jour
            </p>
            <p className="mt-3 text-3xl font-black text-[#d4a64a]">
              12:00
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          {pronostics.map((item) => (
            <div
              key={item.match}
              className="rounded-[28px] border border-[#2a2013] bg-[#111111] p-5 md:rounded-[36px] md:p-8"
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4a64a]">
                    {item.sport} · {item.competition}
                  </p>

                  <h2 className="mt-3 text-3xl font-black md:text-5xl">
                    {item.match}
                  </h2>

                  <p className="mt-2 text-sm text-white/45">
                    Aujourd’hui à {item.heure}
                  </p>
                </div>

                <span className="w-fit rounded-full border border-[#5e4318] bg-[#1b140b] px-4 py-2 text-xs font-bold text-[#efc56f]">
                  Confiance {item.confiance}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Pronostic
                  </p>
                  <p className="mt-2 text-xl font-black text-[#d4a64a]">
                    {item.pronostic}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Cote
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {item.cote}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Statut
                  </p>
                  <p className="mt-2 text-xl font-black text-green-400">
                    Disponible
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#2a2013] bg-[#151515] p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                  Analyse
                </p>

                <p className="text-sm leading-7 text-white/65 md:text-base md:leading-8">
                  Sélection basée sur la forme récente des équipes, le contexte
                  du match et la dynamique actuelle. L’objectif est de garder
                  une approche disciplinée avec une lecture claire du risque.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[30px] border border-[#4f3814] bg-[#120f0a] p-6 text-center md:rounded-[40px] md:p-10">
          <h2 className="text-3xl font-black md:text-5xl">
            Prochaine mise à jour
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Les pronostics sont mis à jour quotidiennement selon les matchs
            disponibles et les meilleures opportunités sélectionnées.
          </p>

          <Link
            href="/resultats"
            className="mt-7 inline-block rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-8 py-4 text-sm font-black text-black md:text-base"
          >
            Voir les résultats
          </Link>
        </div>
      </section>
    </main>
  );
}