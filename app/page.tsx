import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("home_matches")
    .select("id, league, date, time, home, away")
    .order("created_at", { ascending: true });

  const matches = data ?? [];
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-[#2f2415] bg-black/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a64a] text-xs font-black text-[#d4a64a] md:h-14 md:w-14 md:text-lg">
              EP
            </div>

            <div>
              <p className="text-lg font-black text-[#e0b45c] md:text-3xl">
                Enrick Pronos
              </p>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-sm">
                Premium Sports Picks
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/connexion"
              className="rounded-full border border-white/20 px-3 py-2 text-[11px] font-bold md:px-7 md:py-3 md:text-base"
            >
              Connexion
            </Link>

            <Link
              href="/vip"
              className="rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-3 py-2 text-[11px] font-black text-black md:px-8 md:py-3 md:text-base"
            >
              Rejoindre
            </Link>
          </div>
        </div>

        <nav className="border-t border-[#1f160b] px-4 py-3 md:py-4">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
            {[
              ["Accueil", "/"],
              ["Matchs", "#matchs-du-jour"],
              ["Résultats", "/resultats"],
              ["VIP", "/vip"],
            ].map(([label, href], index) =>
              href.startsWith("#") ? (
                <a
                  key={label}
                  href={href}
                  className={
                    index === 0
                      ? "whitespace-nowrap rounded-full border border-[#d4a64a] bg-[#151515] px-4 py-2 text-xs font-bold text-[#d4a64a] md:px-6 md:py-3 md:text-sm"
                      : "whitespace-nowrap rounded-full border border-white/15 bg-[#0c0c0c] px-4 py-2 text-xs font-bold text-white md:px-6 md:py-3 md:text-sm"
                  }
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={
                    index === 0
                      ? "whitespace-nowrap rounded-full border border-[#d4a64a] bg-[#151515] px-4 py-2 text-xs font-bold text-[#d4a64a] md:px-6 md:py-3 md:text-sm"
                      : "whitespace-nowrap rounded-full border border-white/15 bg-[#0c0c0c] px-4 py-2 text-xs font-bold text-white md:px-6 md:py-3 md:text-sm"
                  }
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </nav>
      </header>

      <section className="relative px-4 py-10 text-center md:px-6 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,166,74,0.12),transparent_28%),radial-gradient(circle_at_right,rgba(212,166,74,0.10),transparent_26%)]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#5e4318] bg-[#120f0a] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#efc56f] md:mb-8 md:px-5 md:py-3 md:text-base">
            ⭐ Pronostics premium
          </div>

          <h1 className="mx-auto max-w-4xl text-center text-[42px] font-black leading-[0.95] tracking-[-0.05em] md:text-8xl">
            Des pronostics
            <span className="block bg-gradient-to-r from-[#fff1cc] via-[#e0b45c] to-[#b37b1f] bg-clip-text text-transparent">
              premium,
            </span>
            sportifs
            <span className="block">plus exclusifs.</span>
          </h1>

          <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#d4a64a] md:mt-7 md:w-20" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 md:mt-7 md:text-xl md:leading-8">
            Rejoins un espace VIP avec mes sélections, mes analyses et mes
            statistiques, dans une expérience premium pensée pour les vrais
            passionnés de sport.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:mt-9 md:gap-4">
            <Link
              href="/vip"
              className="rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-7 py-3 text-sm font-black text-black md:px-9 md:py-4 md:text-base"
            >
              Voir les offres
            </Link>

            <Link
              href="/resultats"
              className="rounded-full border border-[#d4a64a]/50 bg-black/40 px-7 py-3 text-sm font-black text-white md:px-9 md:py-4 md:text-base"
            >
              Voir les résultats
            </Link>
          </div>
        </div>
      </section>

      <section
        id="matchs-du-jour"
        className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-12"
      >
        <div className="mb-5 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-[#4f3814]" />
          <h2 className="whitespace-nowrap text-center text-sm font-black uppercase tracking-[0.22em] text-[#d4a64a] md:text-2xl md:tracking-[0.3em]">
            📅 Matchs du jour
          </h2>
          <div className="h-px flex-1 bg-[#4f3814]" />
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#4f3814] bg-[linear-gradient(180deg,#171717_0%,#0b0b0b_100%)] md:rounded-[28px]">
          {matches.map((match) => (
            <div
              key={`${match.home}-${match.away}`}
              className="border-b border-white/10 p-5 last:border-b-0 md:grid md:grid-cols-[180px_1fr_140px] md:items-center md:p-8"
            >
              <div className="flex items-center justify-between gap-4 md:block">
                <div>
                  <p className="text-sm font-black text-[#d4a64a] md:text-base">
                    {match.league}
                  </p>
                  <p className="mt-1 text-xs text-white/65 md:mt-3 md:text-sm">
                    {match.date}
                  </p>
                </div>

                <p className="text-xs text-white/65 md:mt-1 md:text-sm">
                  🕘 {match.time}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3 text-center md:mt-0 md:gap-8">
                <p className="flex-1 text-right text-lg font-black md:text-2xl">
                  {match.home}
                </p>

                <p className="text-base font-black text-[#d4a64a] md:text-xl">
                  VS
                </p>

                <p className="flex-1 text-left text-lg font-black md:text-2xl">
                  {match.away}
                </p>
              </div>

              <Link
                href="/espace-vip"
                className="mt-5 flex items-center justify-center gap-2 rounded-full border border-[#d4a64a]/40 bg-[#1b140b] px-5 py-3 text-sm font-black text-[#d4a64a] md:mt-0"
              >
                🔒 VIP
              </Link>
            </div>
          ))}

          <div className="p-5 md:p-8">
            <Link
              href="/espace-vip"
              className="block rounded-2xl border border-[#d4a64a] py-4 text-center text-sm font-black text-[#d4a64a] md:py-5 md:text-lg"
            >
              Voir tous les matchs du jour →
            </Link>
          </div>
        </div>
      </section>
<section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20">
  <div className="mb-7 text-center md:mb-10">
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4a64a] md:text-xs">
      Pourquoi nous choisir
    </p>

    <h2 className="text-3xl font-black md:text-5xl">
      Pourquoi rejoindre le VIP ?
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:mt-5 md:text-lg">
      Un espace conçu pour accéder à des pronostics suivis sérieusement avec
      une approche transparente.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-3">
    {[
      {
        icon: "⭐",
        title: "Pronostics quotidiens",
        text: "Les meilleures opportunités sélectionnées chaque jour.",
      },
      {
        icon: "📊",
        title: "Résultats transparents",
        text: "Performances, taux de réussite et historique accessibles.",
      },
      {
        icon: "🎯",
        title: "Analyses détaillées",
        text: "Une explication simple pour comprendre le contexte du match.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="rounded-[22px] border border-[#2a2013] bg-[#111111] p-5 md:rounded-[28px] md:p-8"
      >
        <div className="mb-4 text-3xl md:mb-5 md:text-4xl">{item.icon}</div>

        <h3 className="text-xl font-black md:text-2xl">{item.title}</h3>

        <p className="mt-3 text-sm leading-6 text-white/60 md:mt-4 md:leading-7">
          {item.text}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-6 grid gap-3 sm:grid-cols-3 md:mt-10 md:gap-4">
    {[
      ["128+", "Membres VIP"],
      ["426+", "Paris publiés"],
      ["78%", "Taux de réussite"],
    ].map(([value, label]) => (
      <div
        key={label}
        className="rounded-[20px] border border-[#2a2013] bg-[#111111] p-4 text-center md:rounded-[24px] md:p-5"
      >
        <p className="text-3xl font-black text-[#d4a64a] md:text-4xl">
          {value}
        </p>
        <p className="mt-1 text-xs text-white/60 md:mt-2 md:text-sm">
          {label}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-7 text-center md:mt-10">
    <Link
      href="/vip"
      className="inline-block rounded-full bg-gradient-to-r from-[#c99735] via-[#e6bb63] to-[#c99735] px-8 py-3 text-sm font-black text-black md:px-10 md:py-4 md:text-base"
    >
      Rejoindre le VIP →
    </Link>
  </div>
</section>
<footer className="mt-16 border-t border-[#2a2013] bg-[#080808]">
  <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="text-2xl font-black text-[#d4a64a]">
          Enrick Pronos
        </h3>

        <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
          Pronostics premium, analyses détaillées et suivi transparent des
          performances pour les passionnés de sport.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 md:justify-self-end">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#d4a64a]">
            Navigation
          </p>

          <div className="flex flex-col gap-3 text-sm text-white/65">
            <Link href="/">Accueil</Link>
            <Link href="/resultats">Résultats</Link>
            <Link href="/vip">VIP</Link>
            <Link href="/connexion">Connexion</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#d4a64a]">
            VIP
          </p>

          <div className="flex flex-col gap-3 text-sm text-white/65">
            

            <Link href="/vip">
              Offres VIP
            </Link>

            <Link href="/resultats">
              Historique
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-10 border-t border-white/10 pt-6">
      <div className="flex flex-col gap-3 text-center text-xs text-white/40 md:flex-row md:items-center md:justify-between md:text-sm">
        <p>© 2025 Enrick Pronos. Tous droits réservés.</p>

        <p>
          +18 ans • Jouez responsable • Les paris sportifs comportent des risques.
        </p>
      </div>
    </div>
  </div>
</footer>
    </main>
  
  );
}