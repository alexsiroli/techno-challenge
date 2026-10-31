import Link from 'next/link'
import { Marchio, Simbolo } from '@/components/Marchio'

export default function NotFound() {
  return (
    <main className="cielo flex min-h-[100dvh] flex-col">
      <header className="mx-auto w-full max-w-6xl px-5 pt-6 md:px-8 md:pt-8">
        <Marchio className="text-xl text-oro md:text-2xl" />
      </header>
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center px-5 py-16">
        <Simbolo variante="mono" className="h-16 w-16 text-muto" />
        <h1 className="mt-6 text-balance font-brand text-[clamp(2.25rem,6vw,3.5rem)] font-black leading-none">Questa porta non si apre.</h1>
        <p className="mt-4 text-lg leading-relaxed text-muto">
          L&apos;indirizzo non porta a nessuna missione. Controllate di averlo scritto come ve lo ha dato l&apos;insegnante.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-oro px-6 font-semibold text-notte transition-transform duration-150 ease-uscita active:scale-[0.97]">
          Torna all&apos;ingresso
        </Link>
      </section>
    </main>
  )
}
