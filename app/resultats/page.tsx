export default function ResultatsPage() {
  const resultats = [
    {
      date: "15/07",
      competition: "Ligue 1",
      match: "PSG vs Marseille",
      pronostic: "Victoire PSG",
      cote: "1.85",
      statut: "Gagné",
    },
    {
      date: "14/07",
      competition: "Premier League",
      match: "Liverpool vs Arsenal",
      pronostic: "Plus de 2.5 buts",
      cote: "1.70",
      statut: "Gagné",
    },
    {
      date: "13/07",
      competition: "Serie A",
      match: "Juventus vs Inter",
      pronostic: "Inter ou nul",
      cote: "1.60",
      statut: "Gagné",
    },
    {
      date: "12/07",
      competition: "Liga",
      match: "Real Madrid vs Séville",
      pronostic: "Real Madrid gagne",
      cote: "1.55",
      statut: "Perdu",
    },
    {
      date: "11/07",
      competition: "NBA",
      match: "Lakers vs Celtics",
      pronostic: "Lakers +4.5",
      cote: "1.90",
      statut: "Gagné",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-[#d4a64a]">
          ← Retour accueil
        </a>

        <div className="mt-8 rounded-[28px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[36px] md:p-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#d4a64a]">
            Historique premium
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-7xl">
            Résultats des pronostics
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            Consulte l'historique des sélections publiées avec un suivi
            transparent des performances.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Taux de réussite
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">78%</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              ROI moyen
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">+18%</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Paris publiés
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">426</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Abonnés VIP
            </p>
            <p className="mt-3 text-4xl font-black text-[#d4a64a]">128</p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#2a2013] bg-[#111111] p-4 md:rounded-[36px] md:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black md:text-4xl">
                Historique des pronostics
              </h2>
              <p className="mt-2 text-sm text-white/45">
                Résultats des dernières sélections publiées.
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#5e4318] bg-[#1b140b] px-4 py-2 text-xs font-bold text-[#efc56f]">
              Mise à jour quotidienne
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-xs uppercase tracking-[0.18em] text-white/35">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Compétition</th>
                  <th className="px-4 py-2">Match</th>
                  <th className="px-4 py-2">Pronostic</th>
                  <th className="px-4 py-2">Cote</th>
                  <th className="px-4 py-2">Résultat</th>
                </tr>
              </thead>

              <tbody>
                {resultats.map((item) => (
                  <tr
                    key={`${item.date}-${item.match}`}
                    className="bg-[#151515]"
                  >
                    <td className="rounded-l-2xl px-4 py-5 text-sm text-white/60">
                      {item.date}
                    </td>

                    <td className="px-4 py-5 text-sm text-white/60">
                      {item.competition}
                    </td>

                    <td className="px-4 py-5 font-bold text-white">
                      {item.match}
                    </td>

                    <td className="px-4 py-5 text-sm text-white/70">
                      {item.pronostic}
                    </td>

                    <td className="px-4 py-5 font-bold text-[#d4a64a]">
                      {item.cote}
                    </td>

                    <td className="rounded-r-2xl px-4 py-5">
                      <span
                        className={
                          item.statut === "Gagné"
                            ? "rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-bold text-green-400"
                            : "rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400"
                        }
                      >
                        {item.statut === "Gagné" ? "✅ Gagné" : "❌ Perdu"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#4f3814] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] p-6 md:rounded-[36px] md:p-9">
          <h2 className="text-2xl font-black md:text-4xl">
            Transparence totale
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
            Tous les résultats sont affichés publiquement afin de garantir une
            transparence maximale. Chaque sélection est archivée et accessible
            afin de suivre les performances réelles sur le long terme.
          </p>
        </div>
      </section>
    </main>
  );
}