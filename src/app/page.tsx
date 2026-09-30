import Image from 'next/image'
import marioLesson from '@/data/lessons/mario.json'
import magiaLesson from '@/data/lessons/magia.json'
import cyberLesson from '@/data/lessons/cyber.json'
import spazioLesson from '@/data/lessons/spazio.json'
import { Marchio, Simbolo, STELLA } from '@/components/Marchio'

// La porta dell'accademia: il marchio, la parola magica e i quattro mondi. I mondi non sono link
// (come prima): la classe entra dall'indirizzo che le da' l'insegnante.
const MONDI = [
  { lesson: marioLesson, img: '/images/mondi/mario.webp', anello: '#FACC15' },
  { lesson: magiaLesson, img: '/images/mondi/magia.webp', anello: '#C084FC' },
  { lesson: cyberLesson, img: '/images/mondi/cyber.webp', anello: '#22C55E' },
  { lesson: spazioLesson, img: '/images/mondi/spazio.webp', anello: '#22D3EE' },
]

const PIN = ['4', '8', '1', '5']

export default function HomePage() {
  return (
    <main className="cielo flex min-h-[100dvh] flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center px-5 pt-6 md:px-8 md:pt-8">
        <Marchio className="text-xl text-oro md:text-2xl" />
      </header>

      <section className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-5 pb-6 pt-10 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:gap-10 md:px-8 md:pt-12">
        <div>
          <h1 className="font-brand text-[clamp(2.6rem,5.4vw,4.5rem)] font-black leading-[1] tracking-[-0.015em]">
            Quattro mondi, <span className="text-oro md:block">una parola magica.</span>
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muto md:text-xl">
            Aprite l&apos;indirizzo che vi dà l&apos;insegnante. Ogni prova della missione si apre con il suo PIN, la parola magica della squadra.
          </p>
          <div className="mt-8 flex gap-2.5" aria-hidden="true">
            {PIN.map((c, i) => (
              <span key={i} className="tc-cifra relative grid h-16 w-14 place-items-center rounded-2xl border-2 border-oro/45 bg-velluto md:h-[4.5rem] md:w-16" style={{ '--i': i } as React.CSSProperties}>
                <b className="tabular font-brand text-4xl font-black text-oro">{c}</b>
                <i className="absolute inset-0 grid place-items-center">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-luce"><path d={STELLA} /></svg>
                </i>
              </span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-[min(62vw,340px)] md:w-full md:max-w-[360px]" aria-hidden="true">
          <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--viola)/0.9),transparent)]" />
          <Simbolo apri className="relative w-full drop-shadow-[0_18px_30px_rgb(8_4_20/0.55)]" />
        </div>
      </section>

      <section aria-labelledby="t-mondi" className="mx-auto w-full max-w-6xl px-5 pb-10 md:px-8">
        <h2 id="t-mondi" className="sr-only">I quattro mondi</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
          {MONDI.map(({ lesson, img, anello }) => (
            <li key={lesson.id} className="flex flex-col items-start gap-3 sm:flex-row sm:items-center md:gap-4">
              <Image src={img} alt="" width={72} height={72} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-offset-2 ring-offset-notte md:h-[4.5rem] md:w-[4.5rem]" style={{ '--tw-ring-color': anello } as React.CSSProperties} />
              <p className="min-w-0 leading-tight">
                <span className="block font-brand text-base font-extrabold md:text-lg">{lesson.title}</span>
                <span className="mt-1 block text-sm text-muto">{lesson.subtitle}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 border-t border-viola pt-5 text-sm text-muto">
          Per la quarta e la quinta primaria. Niente account: i progressi della squadra restano nel browser di questo computer.
        </p>
      </section>
    </main>
  )
}
