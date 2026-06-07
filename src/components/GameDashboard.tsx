'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Lesson, Team } from '@/types'
import { getTheme } from '@/lib/themes'
import { getProgress, unlockStep } from '@/lib/storage'

interface Props {
  lesson: Lesson
  team: Team
  stepOrder: number[]
  teamPins: string[]
}

export default function GameDashboard({ lesson, team, stepOrder, teamPins }: Props) {
  const theme = getTheme(lesson.id)
  const totalSteps = stepOrder.length

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([])
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [revealedStep, setRevealedStep] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const pinRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const progress = getProgress(lesson.id, team.id)
    setCurrentStepIndex(progress.currentStep)
    setUnlockedSteps(progress.unlockedSteps)
    if (progress.unlockedSteps.length > 0) {
      setRevealedStep(progress.unlockedSteps[progress.unlockedSteps.length - 1])
    }
    if (progress.unlockedSteps.length >= totalSteps) {
      setIsComplete(true)
    }
  }, [lesson.id, team.id, totalSteps])

  const currentChallengeIndex = stepOrder[currentStepIndex]
  const currentChallenge = lesson.steps[currentChallengeIndex]

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!currentChallenge) return

    const correctPin = teamPins[currentStepIndex]
    if (pinInput === correctPin) {
      setPinError(false)
      setPinInput('')
      unlockStep(lesson.id, team.id, currentStepIndex)
      setUnlockedSteps((prev) => [...new Set([...prev, currentStepIndex])])
      setRevealedStep(currentStepIndex)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    } else {
      setPinError(true)
      setPinInput('')
      setTimeout(() => setPinError(false), 1500)
      pinRef.current?.focus()
    }
  }

  function handleNextStep() {
    if (currentStepIndex < totalSteps - 1) {
      const next = currentStepIndex + 1
      setCurrentStepIndex(next)
      setRevealedStep(null)
      setPinInput('')
      setPinError(false)

      const progress = getProgress(lesson.id, team.id)
      progress.currentStep = next
      import('@/lib/storage').then(({ saveProgress }) => saveProgress(lesson.id, team.id, progress))

      setTimeout(() => pinRef.current?.focus(), 100)
    } else {
      setIsComplete(true)
    }
  }

  const bgClasses: Record<string, string> = {
    mario: 'bg-blue-500 mario-clouds',
    magia: 'bg-purple-950 magic-stars',
    cyber: 'bg-gray-950 cyber-grid',
    spazio: 'bg-slate-950 star-bg space-grid',
  }

  const pinPlaceholders: Record<string, string> = {
    mario: '????',
    magia: '✦✦✦✦',
    cyber: '____',
    spazio: '0000',
  }

  if (isComplete) {
    return (
      <main className={`min-h-screen ${bgClasses[lesson.id] ?? 'bg-gray-900'} flex flex-col items-center justify-center p-8`}>
        <div className="max-w-2xl w-full text-center">
          <div className="text-8xl mb-6 animate-float">🏆</div>
          <h1 className={`text-4xl font-bold ${theme.text} mb-6 ${theme.titleFontClass}`}>
            MISSIONE COMPLETATA!
          </h1>
          <div className={`${theme.cardBg} border-2 ${theme.border} rounded-2xl p-8 mb-8`}>
            <p className={`${theme.text} text-lg leading-relaxed ${theme.fontClass}`}>
              {lesson.outro}
            </p>
          </div>
          <div className="text-5xl mb-4">🎉🎊🎉🎊🎉</div>
          <Link href={`/${lesson.slug}`} className={`inline-block mt-4 px-6 py-3 ${theme.buttonBg} ${theme.buttonHover} text-white font-bold rounded-xl transition-colors`}>
            Torna alla Lobby
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen ${bgClasses[lesson.id] ?? 'bg-gray-900'} flex flex-col`}>
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-9xl animate-bounce">⭐</div>
        </div>
      )}

      <header className={`${theme.headerBg} border-b-4 ${theme.border} py-4 px-6 flex items-center justify-between`}>
        <Link href={`/${lesson.slug}`} className={`${theme.text} opacity-70 hover:opacity-100 transition-opacity text-sm flex items-center gap-2`}>
          ← {lesson.title}
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{team.emoji}</span>
          <span className={`font-bold ${theme.text} ${theme.fontClass}`}>{team.name}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center p-6 max-w-3xl mx-auto w-full">
        <div className="w-full mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${theme.subtext} ${theme.fontClass}`}>
              Avanzamento
            </span>
            <span className={`text-sm font-bold ${theme.accentText} ${theme.fontClass}`}>
              {unlockedSteps.length} / {totalSteps}
            </span>
          </div>
          <div className={`w-full h-3 ${theme.inputBg} rounded-full border ${theme.border} overflow-hidden`}>
            <div
              className={`h-full ${theme.accent} rounded-full transition-all duration-500`}
              style={{ width: `${(unlockedSteps.length / totalSteps) * 100}%` }}
            />
          </div>

          <div className="flex gap-1 mt-3 flex-wrap">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  if (unlockedSteps.includes(i)) {
                    setCurrentStepIndex(i)
                    setRevealedStep(i)
                  }
                }}
                className={`
                  w-7 h-7 rounded text-xs font-bold flex items-center justify-center
                  transition-all duration-200
                  ${i === currentStepIndex
                    ? `${theme.accent} text-white ring-2 ring-white ring-opacity-60`
                    : unlockedSteps.includes(i)
                      ? `${theme.buttonBg} text-white opacity-70 cursor-pointer hover:opacity-100`
                      : `${theme.inputBg} ${theme.subtext} opacity-40`
                  }
                `}
              >
                {unlockedSteps.includes(i) ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className={`w-full ${theme.cardBg} border-2 ${theme.border} rounded-2xl overflow-hidden`}>
          <div className={`${theme.headerBg} px-6 py-4 flex items-center justify-between`}>
            <div>
              <span className={`text-xs uppercase tracking-widest ${theme.subtext} ${theme.fontClass}`}>
                Step {currentStepIndex + 1} di {totalSteps}
              </span>
              <h2 className={`text-xl font-bold ${theme.text} mt-1 ${theme.titleFontClass}`}>
                {currentChallenge?.title}
              </h2>
            </div>
            <div className="text-3xl">{theme.icon}</div>
          </div>

          <div className="p-6">
            {revealedStep === currentStepIndex ? (
              <div>
                <div className={`${theme.text} leading-relaxed text-base ${theme.fontClass} mb-6 p-4 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                  {currentChallenge?.description}
                </div>
                <div className={`flex items-center gap-3 p-4 rounded-xl border ${theme.border} ${theme.cardBg} mb-4`}>
                  <span className="text-2xl">💡</span>
                  <p className={`text-sm ${theme.subtext} ${theme.fontClass}`}>
                    Completa la prova e chiama l&apos;insegnante per ottenere il PIN dello step successivo!
                  </p>
                </div>
                {currentStepIndex < totalSteps - 1 && (
                  <button
                    onClick={handleNextStep}
                    className={`w-full py-4 rounded-xl font-bold text-white text-lg ${theme.buttonBg} ${theme.buttonHover} transition-all transform hover:scale-105 ${theme.fontClass}`}
                  >
                    Prova Superata! → Step {currentStepIndex + 2}
                  </button>
                )}
                {currentStepIndex === totalSteps - 1 && (
                  <button
                    onClick={() => setIsComplete(true)}
                    className={`w-full py-4 rounded-xl font-bold text-white text-lg ${theme.buttonBg} ${theme.buttonHover} transition-all transform hover:scale-105 ${theme.fontClass}`}
                  >
                    🏆 Missione Completata!
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className={`text-center py-8 mb-6`}>
                  <div className="text-5xl mb-4">
                    {theme.id === 'cyber' ? '🔐' : theme.id === 'magia' ? '📜' : theme.id === 'spazio' ? '🔒' : '🔒'}
                  </div>
                  <p className={`${theme.subtext} text-sm mb-2 ${theme.fontClass}`}>
                    {theme.id === 'cyber'
                      ? 'INSERISCI CODICE DI ACCESSO'
                      : theme.id === 'magia'
                        ? 'Pronuncia l\'incantesimo segreto'
                        : theme.id === 'spazio'
                          ? 'CODICE DI AUTORIZZAZIONE RICHIESTO'
                          : 'Inserisci il PIN per sbloccare la prova'}
                  </p>
                  <p className={`${theme.text} text-xs opacity-50 ${theme.fontClass}`}>
                    L&apos;insegnante ti darà il codice a 4 cifre
                  </p>
                </div>

                <form onSubmit={handlePinSubmit} className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <input
                      ref={pinRef}
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      value={pinInput}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 4)
                        setPinInput(val)
                        setPinError(false)
                      }}
                      placeholder={pinPlaceholders[lesson.id] ?? '????'}
                      className={`
                        pin-input w-48 py-5 px-4 text-3xl font-bold rounded-xl border-2
                        outline-none transition-all duration-200
                        ${theme.inputBg} ${theme.text}
                        ${pinError
                          ? 'border-red-500 animate-pulse'
                          : `${theme.border} focus:ring-4 focus:ring-opacity-40`
                        }
                        ${theme.id === 'cyber' ? 'font-mono bg-black text-green-400 placeholder-green-800' : ''}
                      `}
                      autoFocus
                    />
                  </div>

                  {pinError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm font-bold">
                      <span>❌</span>
                      <span className={theme.fontClass}>
                        {theme.id === 'cyber' ? 'ACCESSO NEGATO' : theme.id === 'magia' ? 'Incantesimo sbagliato!' : 'Codice errato!'}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={pinInput.length !== 4}
                    className={`
                      px-10 py-4 rounded-xl font-bold text-white text-lg
                      ${theme.buttonBg} ${theme.buttonHover}
                      transition-all transform hover:scale-105
                      disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
                      ${theme.fontClass}
                      ${theme.id === 'cyber' ? 'border border-green-500' : ''}
                    `}
                  >
                    {theme.id === 'cyber' ? '> ACCEDI_' : theme.id === 'magia' ? '✨ Apri!' : theme.id === 'spazio' ? '⚡ AUTORIZZA' : '🔓 Sblocca!'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
