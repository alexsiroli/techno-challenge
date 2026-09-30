'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowSquareOut, Binoculars, BookOpenText, CaretLeft, CaretRight, Eraser, Eye, EyeSlash,
  FileText, FilmSlate, FlagCheckered, Lightbulb, Table, Trophy, X,
} from '@phosphor-icons/react'
import marioLesson from '@/data/lessons/mario.json'
import magiaLesson from '@/data/lessons/magia.json'
import cyberLesson from '@/data/lessons/cyber.json'
import spazioLesson from '@/data/lessons/spazio.json'
import teamsData from '@/data/teams.json'
import type { Lesson, ThemeData, Step } from '@/types'
import { Marchio } from '@/components/Marchio'

const lessons = [marioLesson, magiaLesson, cyberLesson, spazioLesson] as Lesson[]
const teams = teamsData as Record<string, ThemeData>

// La prova finta dello sblocco finale (step 16): stessa struttura di una prova vera
const VITTORIA: Step = {
  id: 99,
  title: 'Vittoria finale',
  description: 'Date questo codice alla squadra per far comparire a sorpresa la schermata di vittoria e completare la sfida!',
  answer: "Verificare l'ultimo compito a schermo e dare il PIN per far comparire la schermata di vittoria.",
}

const TABS = [
  { id: 'codes', label: 'Tabella dei PIN', Icon: Table },
  { id: 'story', label: 'Storia e avvio', Icon: BookOpenText },
  { id: 'monitor', label: 'Monitoraggio', Icon: Binoculars },
] as const

// Classi ricorrenti del pannello (token del marchio, niente hex)
const card = 'rounded-2xl border border-viola bg-velluto'
const btnGhost = 'inline-flex min-h-11 items-center gap-2 rounded-xl border border-viola bg-notte/60 px-4 text-sm font-medium text-luna transition-[background-color,transform] duration-150 ease-uscita hover:bg-viola active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40'
const select = 'min-h-11 w-full rounded-xl border border-viola bg-notte px-3 text-base text-luna focus-visible:border-oro disabled:opacity-40'

function Mondo({ id, className = '' }: { id: string; className?: string }) {
  return <Image src={`/images/mondi/${id}.webp`} alt="" width={28} height={28} className={`shrink-0 rounded-full object-cover ${className}`} />
}

export default function TeacherPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>(lessons[0].id)
  const [monitorTheme, setMonitorTheme] = useState<string>(lessons[0].id)
  const [monitorTeam, setMonitorTeam] = useState<string>('')
  const [monitorStep, setMonitorStep] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'codes' | 'story' | 'monitor'>('codes')

  const [revealedPins, setRevealedPins] = useState<Record<string, boolean>>({})
  const [highlights, setHighlights] = useState<string[]>([])
  const [modalChallenge, setModalChallenge] = useState<Step | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('techno_challenge_teacher_highlights')
      if (raw) {
        try {
          // Il localStorage si legge solo dopo l'idratazione: l'HTML dell'export statico non lo conosce
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setHighlights(JSON.parse(raw))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  // Esc chiude il dettaglio della prova
  useEffect(() => {
    if (!modalChallenge) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalChallenge(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalChallenge])

  function toggleHighlight(cellKey: string) {
    setHighlights((prev) => {
      const next = prev.includes(cellKey)
        ? prev.filter((k) => k !== cellKey)
        : [...prev, cellKey]
      localStorage.setItem('techno_challenge_teacher_highlights', JSON.stringify(next))
      return next
    })
  }

  const lesson = lessons.find((l) => l.id === selectedTheme)!
  const themeData = teams[selectedTheme]

  const monitorLesson = lessons.find((l) => l.id === monitorTheme)!
  const monitorThemeData = teams[monitorTheme]
  const monitorTeamData = monitorThemeData?.teams.find((t) => t.id === monitorTeam)
  const monitorStepOrder = monitorTeamData ? monitorThemeData.order[monitorTeam] : null
  const monitorChallengeIndex = monitorStepOrder ? monitorStepOrder[monitorStep] : null
  const isMonitorVictory = monitorStep === 15
  const monitorChallenge = isMonitorVictory
    ? VITTORIA
    : (monitorChallengeIndex !== null && monitorChallengeIndex !== undefined
        ? monitorLesson.steps[monitorChallengeIndex]
        : null)

  return (
    <main className="min-h-screen bg-notte text-luna">
      <header className="border-b border-viola bg-velluto/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <Marchio className="text-lg text-oro md:text-xl" />
            <span className="hidden h-6 w-px bg-viola sm:block" aria-hidden="true" />
            <h1 className="text-base font-semibold text-luna md:text-lg">Pannello docente</h1>
          </div>
          <p className="text-sm text-muto">I PIN restano nascosti finché non li mostri.</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <nav aria-label="Sezioni del pannello" className="mb-8 grid grid-cols-3 gap-1.5 rounded-2xl border border-viola bg-velluto/50 p-1.5 sm:inline-flex">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`inline-flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-sm font-semibold transition-colors duration-150 sm:flex-row sm:gap-2 sm:px-4 sm:text-base ${activeTab === id ? 'bg-oro text-notte' : 'text-muto hover:bg-viola/60 hover:text-luna'}`}
            >
              <Icon size={20} weight={activeTab === id ? 'fill' : 'regular'} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        {(activeTab === 'codes' || activeTab === 'story') && (
          <div className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Tema">
            {lessons.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={selectedTheme === l.id}
                onClick={() => setSelectedTheme(l.id)}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors duration-150 ${selectedTheme === l.id ? 'border-oro bg-oro/15 text-luna' : 'border-viola text-muto hover:border-muto hover:text-luna'}`}
              >
                <Mondo id={l.id} />
                {l.title}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'codes' && (
          <div>
            <div className={`${card} overflow-hidden`}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-viola px-5 py-4">
                <div>
                  <h2 className="font-brand text-xl font-extrabold">{lesson.title}: PIN per squadra e step</h2>
                  <p className="mt-1 text-sm text-muto">
                    Tocca una cella per segnarla. L&apos;occhio mostra o nasconde il PIN.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setHighlights([]);
                    localStorage.removeItem('techno_challenge_teacher_highlights');
                  }}
                  className={btnGhost}
                >
                  <Eraser size={18} aria-hidden="true" />
                  Cancella i segni
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-notte/50">
                      <th scope="col" className="sticky left-0 z-10 w-16 border-r border-viola bg-velluto px-3 py-3 text-left font-semibold text-muto">Step</th>
                      {themeData.teams.map((t) => (
                        <th scope="col" key={t.id} className="border-r border-viola px-3 py-3 text-left font-semibold text-luna last:border-r-0">
                          <span className="mr-1.5" aria-hidden="true">{t.emoji}</span>{t.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 16 }).map((_, stepIndex) => (
                      <tr key={stepIndex} className="border-t border-viola/70">
                        <th scope="row" className="sticky left-0 z-10 border-r border-viola bg-velluto px-3 py-3 text-center font-brand text-lg font-extrabold text-oro tabular">
                          {stepIndex === 15 ? <Trophy size={22} weight="fill" className="mx-auto" aria-label="Vittoria" /> : stepIndex + 1}
                        </th>
                        {themeData.teams.map((t) => {
                          const isVictory = stepIndex === 15
                          const challengeIndex = isVictory ? null : themeData.order[t.id][stepIndex]
                          const challenge = isVictory ? VITTORIA : lesson.steps[challengeIndex!]
                          const pin = themeData.pins[t.id][stepIndex]
                          const cellKey = `${selectedTheme}_${t.id}_${stepIndex}`
                          const isHighlighted = highlights.includes(cellKey)
                          const isRevealed = revealedPins[cellKey]
                          return (
                            <td
                              key={t.id}
                              onClick={() => toggleHighlight(cellKey)}
                              className={`cursor-pointer select-none border-r border-viola/70 px-2.5 py-2.5 align-top transition-colors duration-150 last:border-r-0 ${
                                isHighlighted ? 'bg-oro/15 shadow-[inset_0_0_0_2px_rgb(var(--oro))]' : 'hover:bg-viola/40'
                              }`}
                            >
                              <div className="text-xs text-muto">
                                {isVictory ? 'Sblocco finale' : `Prova ${challengeIndex! + 1}`}
                              </div>
                              <div className="mb-2 mt-0.5 line-clamp-1 text-[0.8125rem] text-luna" title={challenge?.title}>
                                {challenge?.title}
                              </div>
                              <div className="flex items-center justify-between gap-1 rounded-lg border border-viola bg-notte py-1 pl-2.5 pr-1">
                                <span className="font-brand text-lg font-extrabold tracking-[0.18em] text-oro tabular">
                                  {isRevealed ? (pin || 'n.d.') : '••••'}
                                </span>
                                <span className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setModalChallenge(challenge ?? null)
                                    }}
                                    className="grid h-9 w-9 place-items-center rounded-md text-muto transition-colors hover:bg-viola hover:text-luna"
                                    title="Vedi la prova"
                                    aria-label={`Vedi la prova: ${challenge?.title}`}
                                  >
                                    <FileText size={18} aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setRevealedPins((prev) => ({ ...prev, [cellKey]: !prev[cellKey] }))
                                    }}
                                    className="grid h-9 w-9 place-items-center rounded-md text-muto transition-colors hover:bg-viola hover:text-luna"
                                    title={isRevealed ? 'Nascondi PIN' : 'Mostra PIN'}
                                    aria-label={`${isRevealed ? 'Nascondi' : 'Mostra'} il PIN di ${t.name}, step ${stepIndex + 1}`}
                                    aria-pressed={!!isRevealed}
                                  >
                                    {isRevealed ? <EyeSlash size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                                  </button>
                                </span>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-5 flex max-w-[80ch] gap-3 text-sm leading-relaxed text-muto">
              <Lightbulb size={20} weight="fill" className="mt-0.5 shrink-0 text-oro" aria-hidden="true" />
              <span>
                Segna in oro la cella dello step raggiunto da ogni squadra: il segno resta anche se ricarichi la pagina.
                I PIN sono nascosti per evitare sguardi indiscreti sulla cattedra; mostrali solo quando devi dirli alla squadra.
              </span>
            </p>
          </div>
        )}

        {activeTab === 'story' && (
          <div className={`${card} p-5 md:p-7`}>
            <h2 className="font-brand text-2xl font-extrabold">Storia e avvio: {lesson.title}</h2>

            <div className="mt-6 grid gap-6 rounded-2xl border border-viola bg-notte/60 p-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-10">
              <div>
                <h3 className="text-sm font-semibold text-muto">Indirizzo per le squadre</h3>
                <Link href={`/${lesson.slug}`} target="_blank" className="mt-2 inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-oro underline decoration-oro/40 underline-offset-4 hover:decoration-oro">
                  /{lesson.slug} <ArrowSquareOut size={18} aria-hidden="true" />
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muto">PIN di avvio (primo step)</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {themeData.teams.map((t) => {
                    const startPin = themeData.pins[t.id][0]
                    return (
                      <li key={t.id} className="flex items-center gap-2 rounded-xl border border-viola bg-velluto px-3 py-2 text-sm">
                        <span aria-hidden="true">{t.emoji}</span>
                        <span className="font-medium text-luna">{t.name}</span>
                        <strong className="font-brand text-base font-extrabold tracking-[0.14em] text-oro tabular">{startPin}</strong>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-2xl border border-viola bg-notte/60 p-5">
                <h3 className="flex items-center gap-2 font-brand text-lg font-extrabold text-oro">
                  <FilmSlate size={20} aria-hidden="true" /> Introduzione
                </h3>
                <p className="mt-3 max-w-[70ch] whitespace-pre-wrap leading-relaxed text-luna/90">{lesson.intro}</p>
              </section>
              <section className="rounded-2xl border border-viola bg-notte/60 p-5">
                <h3 className="flex items-center gap-2 font-brand text-lg font-extrabold text-oro">
                  <FlagCheckered size={20} aria-hidden="true" /> Conclusione
                </h3>
                <p className="mt-3 max-w-[70ch] whitespace-pre-wrap leading-relaxed text-luna/90">{lesson.outro}</p>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'monitor' && (
          <div>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className={`${card} block p-4`}>
                <span className="mb-2 block text-sm font-semibold text-muto">Tema</span>
                <select
                  value={monitorTheme}
                  onChange={(e) => {
                    setMonitorTheme(e.target.value)
                    setMonitorTeam('')
                    setMonitorStep(0)
                  }}
                  className={select}
                >
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
              </label>

              <label className={`${card} block p-4`}>
                <span className="mb-2 block text-sm font-semibold text-muto">Squadra</span>
                <select
                  value={monitorTeam}
                  onChange={(e) => {
                    setMonitorTeam(e.target.value)
                    setMonitorStep(0)
                  }}
                  className={select}
                >
                  <option value="">Scegli la squadra</option>
                  {monitorThemeData?.teams.map((t) => (
                    <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
                  ))}
                </select>
              </label>

              <label className={`${card} block p-4`}>
                <span className="mb-2 block text-sm font-semibold text-muto">Step corrente</span>
                <select
                  value={monitorStep}
                  onChange={(e) => setMonitorStep(Number(e.target.value))}
                  disabled={!monitorTeam}
                  className={select}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <option key={i} value={i}>{i === 15 ? 'Vittoria finale' : `Step ${i + 1}`}</option>
                  ))}
                </select>
              </label>
            </div>

            {monitorTeam && monitorChallenge ? (
              <article className="overflow-hidden rounded-2xl border border-oro/50 bg-velluto">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-viola bg-accademia/40 px-5 py-4 md:px-6">
                  <div>
                    <p className="text-sm text-muto">
                      {monitorLesson.title}, {monitorTeamData?.name}, {isMonitorVictory ? 'vittoria' : `step ${monitorStep + 1}`}
                    </p>
                    <h3 className="mt-1 font-brand text-2xl font-extrabold">{monitorChallenge.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muto">
                      {isMonitorVictory ? 'Sblocco finale' : `Prova ${(monitorChallengeIndex ?? 0) + 1}`}
                    </p>
                    <p className="font-brand text-3xl font-black tracking-[0.16em] text-oro tabular">
                      {monitorThemeData.pins[monitorTeam]?.[monitorStep] ?? 'n.d.'}
                    </p>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <p className="max-w-[75ch] text-base leading-relaxed text-luna/90">{monitorChallenge.description}</p>
                  <div className="mt-5 rounded-xl border border-viola bg-notte p-4">
                    <p className="text-sm font-semibold text-muto">Risposta corretta</p>
                    <p className="mt-1 text-base font-medium text-luce">{monitorChallenge.answer}</p>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setMonitorStep(Math.max(0, monitorStep - 1))}
                      disabled={monitorStep === 0}
                      className={btnGhost}
                    >
                      <CaretLeft size={18} aria-hidden="true" /> Step precedente
                    </button>
                    <button
                      type="button"
                      onClick={() => setMonitorStep(Math.min(14, monitorStep + 1))}
                      disabled={monitorStep === 14}
                      className={btnGhost}
                    >
                      Step successivo <CaretRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <div className={`${card} flex flex-col items-center px-6 py-14 text-center`}>
                <Binoculars size={40} className="text-oro" aria-hidden="true" />
                <p className="mt-4 max-w-[40ch] text-muto">Scegli tema, squadra e step: qui compare la prova che la squadra sta affrontando, con la risposta.</p>
              </div>
            )}

            {monitorTeam && (
              <div className={`${card} mt-6 p-5`}>
                <h4 className="font-semibold text-luna">Sequenza completa di {monitorTeamData?.name}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {monitorThemeData?.order[monitorTeam]?.map((challengeIdx, stepIdx) => (
                    <button
                      key={stepIdx}
                      type="button"
                      onClick={() => setMonitorStep(stepIdx)}
                      aria-pressed={stepIdx === monitorStep}
                      className={`grid h-11 min-w-11 place-items-center rounded-xl px-2 font-brand text-base font-extrabold tabular transition-colors duration-150 ${
                        stepIdx === monitorStep ? 'bg-oro text-notte' : 'border border-viola bg-notte text-muto hover:border-muto hover:text-luna'
                      }`}
                      title={monitorLesson.steps[challengeIdx]?.title}
                    >
                      {stepIdx + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setMonitorStep(15)}
                    aria-pressed={monitorStep === 15}
                    className={`inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-colors duration-150 ${
                      monitorStep === 15 ? 'bg-oro text-notte' : 'border border-viola bg-notte text-muto hover:border-muto hover:text-luna'
                    }`}
                    title="Vittoria finale"
                  >
                    <Trophy size={18} weight="fill" aria-hidden="true" /> Vittoria
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {modalChallenge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-notte/85 p-4"
          onClick={() => setModalChallenge(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="t-prova"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-viola bg-velluto shadow-[0_24px_60px_rgb(8_4_20/0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-viola px-6 py-4">
              <h3 id="t-prova" className="font-brand text-xl font-extrabold">{modalChallenge.title}</h3>
              <button
                type="button"
                onClick={() => setModalChallenge(null)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-muto transition-colors hover:bg-viola hover:text-luna"
                aria-label="Chiudi"
                autoFocus
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-muto">Testo della prova</p>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed text-luna">{modalChallenge.description}</p>
              <div className="mt-5 rounded-xl border border-viola bg-notte p-4">
                <p className="text-sm font-semibold text-muto">Risposta corretta</p>
                <p className="mt-1 whitespace-pre-wrap font-medium text-luce">{modalChallenge.answer}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
