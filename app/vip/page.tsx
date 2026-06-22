export default function VipPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-[#d4a64a]">
          ← Retour accueil
        </a>

        <div className="mt-8 rounded-[30px] border border-[#4f3814] bg-[radial-gradient(circle_at_top_left,rgba(212,166,74,0.16),transparent_30%),linear-gradient(180deg,#171717_0%,#0f0f0f_100%)] p-6 md:rounded-[42px] md:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#d4a64a]">
            Espace VIP
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Rejoins le cercle
            <span className="block bg-gradient-to-r from-[#fff1cc] via-[#e0b45c] to-[#b37b1f] bg-clip-text text-transparent">
              premium.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 md:text-xl">
            Accède aux pronostics réservés, aux analyses détaillées, aux
            matchs du jour et au suivi des performances dans une expérience
            haut de gamme.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#offres"
              className="rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-7 py-3.5 text-sm font-bold text-black shadow-[0_10px_28px_rgba(212,166,74,0.18)] md:px-9 md:py-4 md:text-base"
            >
              Voir les offres
            </a>

            <a
              href="/resultats"
              className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white md:px-9 md:py-4 md:text-base"
            >
              Voir les résultats
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[26px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[32px] md:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d4a64a]">
              Pronostics
            </p>
            <h2 className="text-2xl font-black md:text-3xl">
              Sélections VIP quotidiennes
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
              Accès aux meilleurs matchs sélectionnés avec une logique claire
              et un niveau de confiance.
            </p>
          </div>

          <div className="rounded-[26px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[32px] md:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d4a64a]">
              Analyse
            </p>
            <h2 className="text-2xl font-black md:text-3xl">
              Lecture détaillée des matchs
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
              Chaque sélection est accompagnée d’un contexte, d’une analyse et
              d’une approche structurée.
            </p>
          </div>

          <div className="rounded-[26px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[32px] md:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d4a64a]">
              Suivi
            </p>
            <h2 className="text-2xl font-black md:text-3xl">
              Résultats transparents
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
              Historique des pronostics, taux de réussite et ROI pour suivre
              les performances proprement.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[30px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[40px] md:p-10">
          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d4a64a]">
              Contenu réservé
            </p>
            <h2 className="text-3xl font-black md:text-5xl">
              Ce que tu débloques en VIP
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Pronostics du jour réservés aux membres",
              "Analyses détaillées avant match",
              "Historique complet des résultats",
              "Accès aux meilleures sélections",
              "Suivi du ROI et des performances",
              "Expérience premium simple et directe",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4 text-sm font-semibold text-white/75 md:p-5 md:text-base"
              >
                <span className="mr-2 text-[#d4a64a]">✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div id="offres" className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[36px] md:p-8">
            <h3 className="text-2xl font-black">Mensuel</h3>
            <p className="mt-5 text-5xl font-black text-[#d4a64a]">19€</p>
            <p className="mt-2 text-sm text-white/45">par mois</p>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>Pronostics VIP</li>
              <li>Analyses détaillées</li>
              <li>Résultats suivis</li>
            </ul>

            <button className="mt-8 w-full rounded-full border border-[#d4a64a] py-3.5 text-sm font-bold text-[#d4a64a]">
              Choisir mensuel
            </button>
          </div>

          <div className="rounded-[28px] border border-[#d4a64a] bg-[linear-gradient(180deg,#221708_0%,#111111_100%)] p-6 shadow-[0_0_45px_rgba(212,166,74,0.14)] md:rounded-[36px] md:p-8">
            <p className="mb-4 inline-block rounded-full bg-[#d4a64a] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-black">
              Populaire
            </p>

            <h3 className="text-2xl font-black">Trimestriel</h3>
            <p className="mt-5 text-5xl font-black text-[#f3ce82]">49€</p>
            <p className="mt-2 text-sm text-white/45">tous les 3 mois</p>

            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>Tout le contenu VIP</li>
              <li>Meilleur rapport qualité/prix</li>
              <li>Accès prioritaire aux sélections</li>
            </ul>

            <button className="mt-8 w-full rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] py-3.5 text-sm font-black text-black">
              Rejoindre le VIP
            </button>
          </div>

          <div className="rounded-[28px] border border-[#2a2013] bg-[#111111] p-6 md:rounded-[36px] md:p-8">
            <h3 className="text-2xl font-black">Annuel</h3>
            <p className="mt-5 text-5xl font-black text-[#d4a64a]">149€</p>
            <p className="mt-2 text-sm text-white/45">par an</p>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>Accès complet toute l’année</li>
              <li>Offre la plus rentable</li>
              <li>Suivi premium continu</li>
            </ul>

            <button className="mt-8 w-full rounded-full border border-[#d4a64a] py-3.5 text-sm font-bold text-[#d4a64a]">
              Choisir annuel
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-[30px] border border-[#4f3814] bg-[#120f0a] p-6 text-center md:rounded-[40px] md:p-10">
          <h2 className="text-3xl font-black md:text-5xl">
            Prêt à rejoindre le VIP ?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Sélectionne ton abonnement et accède à un espace pensé pour les
            passionnés qui veulent suivre les pronostics sérieusement.
          </p>

          <button className="mt-7 rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-8 py-4 text-sm font-black text-black md:text-base">
            Commencer maintenant
          </button>
        </div>
      </section>
    </main>
  );
}