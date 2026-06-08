'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import lessonsData from '@/data/lessons.json'
import teamsData from '@/data/teams.json'
import type { Lesson, ThemeData } from '@/types'

const lessons = lessonsData as Lesson[]
const teams = teamsData as Record<string, ThemeData>

export default function TeacherPage() {
  const [selectedTheme, setSelectedTheme] = useState<string>(lessons[0].id)
  const [monitorTheme, setMonitorTheme] = useState<string>(lessons[0].id)
  const [monitorTeam, setMonitorTeam] = useState<string>('')
  const [monitorStep, setMonitorStep] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'codes' | 'story' | 'monitor'>('codes')

  const [revealedPins, setRevealedPins] = useState<Record<string, boolean>>({})
  const [highlights, setHighlights] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('techno_challenge_teacher_highlights')
      if (raw) {
        try {
          setHighlights(JSON.parse(raw))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

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
  const monitorChallenge = monitorChallengeIndex !== null && monitorChallengeIndex !== undefined
    ? monitorLesson.steps[monitorChallengeIndex]
    : null

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-700 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-2xl">🔑</span>
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard Insegnante</h1>
            <p className="text-xs text-gray-400">Techno Challenge — Pannello di controllo</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-indigo-400 tracking-wider">PANNELLO DOCENTE</span>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex gap-4 mb-8 border-b border-gray-700 pb-4 flex-wrap">
          <button
            onClick={() => setActiveTab('codes')}
            className={`px-6 py-3 rounded-t-lg font-semibold transition-colors ${activeTab === 'codes' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            📋 Tabella Codici PIN
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-6 py-3 rounded-t-lg font-semibold transition-colors ${activeTab === 'story' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            📖 Storia e Avvio
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-6 py-3 rounded-t-lg font-semibold transition-colors ${activeTab === 'monitor' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            🖥️ Monitoraggio Squadre
          </button>
        </div>

        {(activeTab === 'codes' || activeTab === 'story') && (
          <div className="mb-6 flex gap-3 flex-wrap">
            {lessons.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedTheme(l.id)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${selectedTheme === l.id ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                {l.title}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'codes' && (
          <div>
            <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 bg-gray-800 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="font-bold text-lg">{lesson.title} — Codici PIN per Squadra e Step</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Fai clic su una cella per colorarla/selezionarla. Clicca sull&apos;occhietto per rivelare il PIN.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setHighlights([]);
                    localStorage.removeItem('techno_challenge_teacher_highlights');
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancella Evidenziature
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-3 text-left font-semibold text-gray-300 border-r border-gray-700 w-20">Step</th>
                      {themeData.teams.map((t) => (
                        <th key={t.id} className="px-4 py-3 text-center font-semibold text-gray-300 border-r border-gray-700 last:border-r-0">
                          {t.emoji} {t.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 15 }).map((_, stepIndex) => (
                      <tr key={stepIndex} className="border-t border-gray-800 hover:bg-gray-800/20 transition-colors">
                        <td className="px-4 py-3 font-bold text-indigo-400 border-r border-gray-700 text-center">
                          {stepIndex + 1}
                        </td>
                        {themeData.teams.map((t) => {
                          const challengeIndex = themeData.order[t.id][stepIndex]
                          const challenge = lesson.steps[challengeIndex]
                          const pin = themeData.pins[t.id][stepIndex]
                          const cellKey = `${selectedTheme}_${t.id}_${stepIndex}`
                          const isHighlighted = highlights.includes(cellKey)
                          const isRevealed = revealedPins[cellKey]
                          return (
                            <td
                              key={t.id}
                              onClick={() => toggleHighlight(cellKey)}
                              className={`px-3 py-3 border-r border-gray-700 last:border-r-0 cursor-pointer select-none transition-all duration-200 ${
                                isHighlighted
                                  ? 'bg-amber-950/70 border border-amber-500 hover:bg-amber-900/60'
                                  : 'hover:bg-gray-800/40'
                              }`}
                            >
                              <div className="text-[10px] text-gray-500 mb-1">Prova #{challengeIndex + 1}</div>
                              <div className="text-xs text-gray-300 mb-2 line-clamp-1" title={challenge?.title}>
                                {challenge?.title}
                              </div>
                              <div className="flex items-center justify-between gap-1 bg-gray-950 rounded px-2 py-1 border border-gray-700">
                                <span className="font-mono font-bold text-base text-yellow-400 tracking-widest pl-1">
                                  {isRevealed ? pin : '••••'}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setRevealedPins((prev) => ({ ...prev, [cellKey]: !prev[cellKey] }))
                                  }}
                                  className="text-gray-400 hover:text-white transition-colors p-1"
                                  title={isRevealed ? "Nascondi PIN" : "Mostra PIN"}
                                >
                                  {isRevealed ? '👁️' : '🙈'}
                                </button>
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

            <div className="mt-6 bg-indigo-950/40 border border-indigo-800 rounded-xl p-4">
              <p className="text-indigo-300 text-sm">
                <span className="font-bold">💡 Istruzioni Tabellone:</span> Clicca su qualsiasi cella della griglia per evidenziarla in arancione. Questo ti aiuta a ricordare quale step ha raggiunto ogni squadra. I PIN sono nascosti di default per evitare sguardi indiscreti sulla tua cattedra; clicca sull&apos;icona dell&apos;occhio per rivelarli quando devi comunicarli.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'story' && (
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-3">
              📖 Storia e Avvio del Tema: {lesson.title}
            </h2>

            <div className="bg-indigo-950/40 border border-indigo-800 rounded-xl p-5 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">Link di Gioco per gli Studenti</span>
                <div className="text-lg font-bold text-white mt-1">
                  <Link href={`/${lesson.slug}`} target="_blank" className="hover:underline flex items-center gap-2 text-indigo-400">
                    <span>🔗</span> /{lesson.slug}
                  </Link>
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">PIN di Avvio (Primo Step)</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {themeData.teams.map((t) => {
                    const startPin = themeData.pins[t.id][0]
                    return (
                      <span key={t.id} className="bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800 text-xs font-mono flex items-center gap-1.5 shadow-md">
                        <span>{t.emoji}</span>
                        <span className="font-semibold text-gray-300">{t.name}:</span>
                        <strong className="text-yellow-400 text-sm tracking-wider">{startPin}</strong>
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-950 p-5 rounded-xl border border-gray-800">
                <h4 className="font-bold text-indigo-400 mb-3 border-b border-gray-800 pb-2 flex items-center gap-2">
                  <span>🎬</span> Introduzione (Intro)
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{lesson.intro}</p>
              </div>
              <div className="bg-gray-950 p-5 rounded-xl border border-gray-800">
                <h4 className="font-bold text-indigo-400 mb-3 border-b border-gray-800 pb-2 flex items-center gap-2">
                  <span>🏁</span> Conclusione (Outro)
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{lesson.outro}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitor' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Tema</label>
                <select
                  value={monitorTheme}
                  onChange={(e) => {
                    setMonitorTheme(e.target.value)
                    setMonitorTeam('')
                    setMonitorStep(0)
                  }}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Squadra</label>
                <select
                  value={monitorTeam}
                  onChange={(e) => {
                    setMonitorTeam(e.target.value)
                    setMonitorStep(0)
                  }}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">— Seleziona squadra —</option>
                  {monitorThemeData?.teams.map((t) => (
                    <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Step corrente</label>
                <select
                  value={monitorStep}
                  onChange={(e) => setMonitorStep(Number(e.target.value))}
                  disabled={!monitorTeam}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40"
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <option key={i} value={i}>Step {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {monitorTeam && monitorChallenge ? (
              <div className="bg-gray-900 border border-indigo-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-indigo-900 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-indigo-300 uppercase tracking-widest mb-1">
                        {monitorLesson.title} → {monitorTeamData?.name} → Step {monitorStep + 1}
                      </div>
                      <h3 className="text-xl font-bold text-white">{monitorChallenge.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-indigo-300 mb-1">Prova #{(monitorChallengeIndex ?? 0) + 1}</div>
                      <div className="font-mono text-2xl font-bold text-yellow-400 tracking-widest">
                        {monitorChallenge.pin}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed text-base">{monitorChallenge.description}</p>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setMonitorStep(Math.max(0, monitorStep - 1))}
                      disabled={monitorStep === 0}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-40"
                    >
                      ← Step Prec.
                    </button>
                    <button
                      onClick={() => setMonitorStep(Math.min(14, monitorStep + 1))}
                      disabled={monitorStep === 14}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-40"
                    >
                      Step Succ. →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="text-5xl mb-4">🖥️</div>
                <p>Seleziona tema, squadra e step per vedere i dettagli della prova.</p>
              </div>
            )}

            {monitorTeam && (
              <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-5">
                <h4 className="font-bold text-gray-300 mb-3">Sequenza completa di {monitorTeamData?.name}</h4>
                <div className="flex gap-2 flex-wrap">
                  {monitorThemeData?.order[monitorTeam]?.map((challengeIdx, stepIdx) => (
                    <button
                      key={stepIdx}
                      onClick={() => setMonitorStep(stepIdx)}
                      className={`
                        px-3 py-2 rounded-lg text-xs font-semibold transition-all
                        ${stepIdx === monitorStep
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }
                      `}
                      title={monitorLesson.steps[challengeIdx]?.title}
                    >
                      {stepIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
