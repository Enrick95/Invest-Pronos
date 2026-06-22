import Link from "next/link";
import LogoutButton from "./logout-button";

export default function DashboardPage() {
  const tickets = [
    {
      titre: "🛡️ Ticket Safe",
      sport: "Football",
      date: "Aujourd'hui",
      pronostic: "Victoire Argentine",
      cote: "1.60",
      confiance: "Élevée",
      image: "/tickets/ticket-safe.jpg",
      analyse:
        "Sélection principale du jour avec une gestion du risque plus prudente.",
    },
    {
      titre: "🔥 Ticket Fun",
      sport: "Football",
      date: "Aujourd'hui",
      pronostic: "Combiné",
      cote: "4.80",
      confiance: "Moyenne",
      image: "/tickets/ticket-fun.jpg",
      analyse:
        "Ticket plus ambitieux avec une cote plus élevée pour tenter un plus gros gain.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8 md:py-12">
      <section className="mx-auto max-w-7xl">
       <div className="mb-6 flex items-center justify-between gap-4">
  <Link href="/" className="text-sm font-semibold text-[#d4a64a]">
    ← Accueil
  </Link>

  <div className="flex items-center gap-3">
    <Link
      href="/resultats"
      className="rounded-full border border-[#d4a64a] px-4 py-2 text-sm font-bold text-[#d4a64a]"
    >
      Résultats
    </Link>

    <LogoutButton />
  </div>
</div>

        <div className="rounded-[30px] border border-[#4f3814] bg-[linear-gradient(180deg,#171717_0%,#0f0f0f_100%)] p-6 md:rounded-[42px] md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#d4a64a]">
            Dashboard membre
          </p>

          <h1 className="text-4xl font-black md:text-6xl">Espace VIP 👑</h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Retrouve ici les tickets du jour, les analyses, les cotes et le
            niveau de confiance.
          </p>

          <div className="mt-5 w-fit rounded-full border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm font-black text-green-400">
            VIP ACTIF
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 text-center">
            <p className="text-4xl font-black text-[#d4a64a]">2</p>
            <p className="mt-2 text-sm text-white/55">Tickets du jour</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 text-center">
            <p className="text-4xl font-black text-[#d4a64a]">SAFE</p>
            <p className="mt-2 text-sm text-white/55">Ticket prudent</p>
          </div>

          <div className="rounded-[24px] border border-[#2a2013] bg-[#111111] p-5 text-center">
            <p className="text-4xl font-black text-[#d4a64a]">FUN</p>
            <p className="mt-2 text-sm text-white/55">Ticket ambitieux</p>
          </div>
        </div>

        <div className="mt-10 mb-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#d4a64a]">
            Sélections VIP
          </p>

          <h2 className="text-3xl font-black md:text-5xl">
            Tickets du jour
          </h2>
        </div>

        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.titre}
              className="rounded-[28px] border border-[#2a2013] bg-[#111111] p-5 md:rounded-[36px] md:p-8"
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4a64a]">
                    {ticket.sport} · {ticket.date}
                  </p>

                  <h3 className="mt-3 text-3xl font-black md:text-5xl">
                    {ticket.titre}
                  </h3>
                </div>

                <span className="w-fit rounded-full border border-[#5e4318] bg-[#1b140b] px-4 py-2 text-xs font-bold text-[#efc56f]">
                  Confiance {ticket.confiance}
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-[#2a2013] bg-[#151515] p-4">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                    Capture du ticket
                  </p>

                  <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black">
                    <img
                      src={ticket.image}
                      alt={ticket.titre}
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                        Pronostic
                      </p>
                      <p className="mt-2 text-xl font-black text-[#d4a64a]">
                        {ticket.pronostic}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                        Cote
                      </p>
                      <p className="mt-2 text-xl font-black text-white">
                        {ticket.cote}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#2a2013] bg-[#151515] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                      Analyse VIP
                    </p>

                    <p className="text-sm leading-7 text-white/65 md:text-base md:leading-8">
                      {ticket.analyse}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#5e4318] bg-[#1b140b] p-5">
                    <p className="text-sm leading-7 text-[#efc56f]">
                      ⚠️ Mise responsable : garde toujours une gestion de
                      bankroll disciplinée. Aucun pari n'est garanti.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}