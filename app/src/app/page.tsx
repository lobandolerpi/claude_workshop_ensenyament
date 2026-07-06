import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const STEPS = [
  { n: "1", t: "Tria el professor", d: "Explora els professors i la seva especialitat." },
  { n: "2", t: "Mira els seus buits", d: "Veuràs només les franges lliures per a la data." },
  { n: "3", t: "Confirma la sessió", d: "Reserva i gestiona-la des del teu dashboard." },
];

const PROFESSORS = [
  { name: "Ana Martín", subject: "Frontend & React", initials: "AM" },
  { name: "Bruno Sáez", subject: "Backend & APIs", initials: "BS" },
  { name: "Carla Ferrer", subject: "Producto & UX", initials: "CF" },
  { name: "David Ortega", subject: "DevOps & Cloud", initials: "DO" },
  { name: "Elena Ruiz", subject: "Data & IA", initials: "ER" },
  { name: "Pedro Bonilla", subject: "Testing & QA", initials: "PB" },
];

const FEATURES = [
  {
    icon: Users,
    t: "Mentors experts",
    d: "Professionals interns de frontend, backend, dades, producte i QA.",
  },
  {
    icon: Clock,
    t: "Reserva en segons",
    d: "Tria data i franja lliure i confirma en pocs clics.",
  },
  {
    icon: CalendarCheck,
    t: "Gestió senzilla",
    d: "Consulta i cancel·la les teves sessions des del dashboard.",
  },
  {
    icon: ShieldCheck,
    t: "El teu compte, segur",
    d: "Accés protegit: només tu veus les teves reserves.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero-band">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Sessions 1-a-1 amb mentors interns
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Reserva de Sessions de Treball
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            Reserva sessions 1-a-1 amb els nostres professors i mentors interns.
            Tria el professor, mira els seus buits i confirma la teva sessió en
            pocs clics.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/register">
                Crear compte
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/login">Iniciar sessió</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Com funciona */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Com funciona
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Tres passos i ja tens la teva sessió reservada.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((pas) => (
            <div key={pas.n} className="rounded-xl border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {pas.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{pas.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{pas.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Professors */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Els nostres professors
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Un equip intern per acompanyar-te en cada àrea.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROFESSORS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-xl border bg-card p-5"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Avantatges */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Per què reservar amb nosaltres
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA final */}
      <section className="px-6 pb-20">
        <div className="hero-band mx-auto max-w-5xl rounded-3xl px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Reserva la teva sessió avui
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Comença en menys d&apos;un minut. Sense complicacions.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-white text-primary hover:bg-white/90"
          >
            <Link href="/register">
              Comença ara
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-xs text-muted-foreground">
          © 2026 Reserva de Sessions de Treball
        </div>
      </footer>
    </main>
  );
}
