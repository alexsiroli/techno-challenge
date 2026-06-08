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

function cleanTitle(title: string): string {
  return title.replace(/^(File \d+|Missione \d+|Step \d+):\s*/i, '')
}

export default function GameDashboard({ lesson, team, stepOrder, teamPins }: Props) {
  const theme = getTheme(lesson.id)
  const totalSteps = stepOrder.length

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([])
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const pinRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const progress = getProgress(lesson.id, team.id)
    setCurrentStepIndex(progress.currentStep >= totalSteps ? totalSteps - 1 : progress.currentStep)
    setUnlockedSteps(progress.unlockedSteps)
    if (progress.currentStep >= totalSteps) {
      setIsComplete(true)
    }
  }, [lesson.id, team.id, totalSteps])

  const currentChallengeIndex = stepOrder[currentStepIndex]
  const currentChallenge = lesson.steps[currentChallengeIndex]

  // Il gioco parte sbloccato per la prima prova solo se lo step 0 è sbloccato.
  // Altrimenti, chiede il PIN di partenza (teamPins[0]).
  const isStarted = unlockedSteps.includes(0)

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isStarted) {
      // PIN di partenza per sbloccare la prima missione (Step 1)
      const correctStartPin = teamPins[0]
      if (pinInput === correctStartPin) {
        setPinError(false)
        setPinInput('')
        
        unlockStep(lesson.id, team.id, 0)
        setUnlockedSteps([0])
        setCurrentStepIndex(0)
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 2000)
        setTimeout(() => pinRef.current?.focus(), 100)
      } else {
        setPinError(true)
        setPinInput('')
        setTimeout(() => setPinError(false), 1500)
        pinRef.current?.focus()
      }
      return
    }

    if (!currentChallenge) return

    // PIN per avanzare: sblocca lo step successivo (currentStepIndex + 1)
    const nextStepIndex = currentStepIndex + 1
    const correctPin = teamPins[nextStepIndex]
    if (pinInput === correctPin) {
      setPinError(false)
      setPinInput('')
      
      unlockStep(lesson.id, team.id, nextStepIndex)
      
      const progress = getProgress(lesson.id, team.id)
      progress.currentStep = nextStepIndex
      if (!progress.unlockedSteps.includes(nextStepIndex)) {
        progress.unlockedSteps.push(nextStepIndex)
      }
      import('@/lib/storage').then(({ saveProgress }) => saveProgress(lesson.id, team.id, progress))
      setUnlockedSteps(progress.unlockedSteps)

      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)

      if (nextStepIndex < totalSteps) {
        setCurrentStepIndex(nextStepIndex)
        setTimeout(() => pinRef.current?.focus(), 100)
      } else {
        setIsComplete(true)
      }
    } else {
      setPinError(true)
      setPinInput('')
      setTimeout(() => setPinError(false), 1500)
      pinRef.current?.focus()
    }
  }

  const bgClasses: Record<string, string> = {
    mario: "bg-[url('/images/bg-mario.png')] bg-cover bg-center",
    magia: "bg-[url('/images/bg-magia.png')] bg-cover bg-center",
    cyber: "bg-[url('/images/bg-cyber.png')] bg-cover bg-center",
    spazio: "bg-[url('/images/bg-spazio.png')] bg-cover bg-center",
  }

  const pinPlaceholders: Record<string, string> = {
    mario: '????',
    magia: '✦✦✦✦',
    cyber: '____',
    spazio: '0000',
  }

  if (isComplete) {
    return (
      <main className={`min-h-screen ${bgClasses[lesson.id] ?? 'bg-gray-900'} flex flex-col items-center justify-center p-8 relative`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-none" />
        <div className="max-w-3xl w-full text-center relative z-10 p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
          <div className="text-9xl mb-8 animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">🏆</div>
          <h1 className={`text-6xl md:text-7xl font-extrabold ${theme.text} mb-8 ${theme.titleFontClass} tracking-tight drop-shadow-xl`}>
            MISSIONE COMPLETATA!
          </h1>
          <div className="text-6xl mb-12 flex justify-center gap-4">
            <span className="animate-pulse">🎉</span>
            <span className="animate-pulse delay-75">🎊</span>
            <span className="animate-pulse delay-150">🎉</span>
          </div>
          <Link href={`/${lesson.slug}`} className={`inline-block px-10 py-5 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText || 'text-white'} font-bold rounded-2xl transition-all shadow-2xl text-xl tracking-wide`}>
            Torna alla Lobby
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen ${bgClasses[lesson.id] ?? 'bg-gray-900'} flex flex-col relative`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none" />
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-9xl animate-bounce drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] scale-150 transition-transform">⭐</div>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className={`${theme.headerBg} border-b border-white/10 py-5 px-8 flex items-center justify-between shadow-2xl backdrop-blur-xl`}>
          <Link href={`/${lesson.slug}`} className={`${theme.text} opacity-85 hover:opacity-100 transition-opacity text-sm font-bold tracking-widest flex items-center gap-2 uppercase`}>
            ← LOBBY
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-3xl drop-shadow-md">{team.emoji}</span>
            <span className={`font-bold text-xl ${theme.text} ${theme.fontClass} tracking-wide`}>{team.name}</span>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full">
          <div className={`w-full ${theme.cardBg} border border-white/10 rounded-3xl overflow-hidden relative backdrop-blur-xl transform transition-all`}>
            
            {!isStarted ? (
              // Avvio del Gioco (PIN di Partenza)
              <div>
                <div className={`${theme.headerBg} px-8 py-6 flex items-center justify-between border-b border-white/5`}>
                  <h2 className={`text-2xl font-bold ${theme.text} ${theme.titleFontClass} tracking-wide`}>
                    INIZIA L&apos;AVVENTURA!
                  </h2>
                  <div className="text-4xl drop-shadow-md">🔒</div>
                </div>

                <div className="p-6">
                  {/* Leggibilità: Sfondo monocromo quasi nero per il testo */}
                  <div className="bg-black/95 text-white leading-relaxed text-base font-semibold mb-6 p-5 rounded-xl border border-gray-700/50 shadow-inner text-center">
                    Benvenuti, squadra {team.name}!
                    <br />
                    Inserite il PIN di partenza per ricevere la prima missione e iniziare la sfida.
                  </div>

                  <form onSubmit={handlePinSubmit} className="flex flex-col items-center gap-4 mt-6">
                    <p className={`${theme.subtext} text-sm mb-1 ${theme.fontClass} text-center`}>
                      CODICE DI AVVIO SEGRETO
                    </p>
                    
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
                          ${theme.inputBg} ${theme.inputText || theme.text}
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
                      <div className="flex items-center gap-2 text-red-400 text-sm font-bold animate-bounce text-outline">
                        <span>❌</span>
                        <span className={theme.fontClass}>Codice di avvio errato!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={pinInput.length !== 4}
                      className={`
                        px-10 py-4 rounded-xl font-bold ${theme.buttonText || 'text-white'} text-lg
                        ${theme.buttonBg} ${theme.buttonHover}
                        transition-all transform hover:scale-105
                        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
                        ${theme.fontClass}
                        ${theme.id === 'cyber' ? 'border border-green-500' : ''}
                      `}
                    >
                      🚀 AVVIA SFIDA
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              // Gioco Avviato: Mostra Sfida Corrente
              <div>
                <div className={`${theme.headerBg} px-8 py-6 flex items-center justify-between border-b border-white/5`}>
                  <div>
                    <h2 className={`text-2xl font-bold ${theme.text} mt-1 ${theme.titleFontClass} tracking-wide drop-shadow-sm`}>
                      {currentChallenge ? cleanTitle(currentChallenge.title) : ''}
                    </h2>
                  </div>
                  <div className="text-4xl drop-shadow-md">{theme.icon}</div>
                </div>

                <div className="p-6">
                  <div>
                    {/* Leggibilità: Sfondo monocromo quasi nero per il testo */}
                    <div className="bg-black/95 text-white leading-relaxed text-base font-semibold mb-6 p-5 rounded-xl border border-gray-700/60 shadow-inner">
                      {currentChallenge?.description}
                    </div>

                    {currentStepIndex < totalSteps - 1 ? (
                      // Form per inserire il codice per passare al prossimo step
                      <form onSubmit={handlePinSubmit} className="flex flex-col items-center gap-4 mt-6 border-t pt-6 border-dashed border-gray-600/30">
                        <div className={`text-center mb-2`}>
                          <p className={`${theme.subtext} text-sm mb-1 ${theme.fontClass}`}>
                            {theme.id === 'cyber'
                              ? 'INSERISCI CODICE DI ACCESSO PROSSIMO FILE'
                              : theme.id === 'magia'
                                ? 'Formula magica per la prossima pergamena'
                                : theme.id === 'spazio'
                                  ? 'CODICE DI AUTORIZZAZIONE PROSSIMO SETTORE'
                                  : 'Inserisci il PIN per sbloccare lo step successivo'}
                          </p>
                          <p className={`${theme.text} text-xs opacity-80 ${theme.fontClass}`}>
                            Completa la prova sopra e inserisci il PIN dato dal professore per avanzare
                          </p>
                        </div>

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
                              ${theme.inputBg} ${theme.inputText || theme.text}
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
                          <div className="flex items-center gap-2 text-red-400 text-sm font-bold animate-bounce text-outline">
                            <span>❌</span>
                            <span className={theme.fontClass}>
                              {theme.id === 'cyber' ? 'ACCESSO NEGATO' : theme.id === 'magia' ? 'Formula errata!' : 'Codice errato!'}
                            </span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={pinInput.length !== 4}
                          className={`
                            px-10 py-4 rounded-xl font-bold ${theme.buttonText || 'text-white'} text-lg
                            ${theme.buttonBg} ${theme.buttonHover}
                            transition-all transform hover:scale-105
                            disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
                            ${theme.fontClass}
                            ${theme.id === 'cyber' ? 'border border-green-500' : ''}
                          `}
                        >
                          {theme.id === 'cyber' ? '> SBLOCCA FILE_' : theme.id === 'magia' ? '✨ Avanza!' : theme.id === 'spazio' ? '⚡ CONFERMA' : '🔓 Prova Superata!'}
                        </button>
                      </form>
                    ) : (
                      // Ultimo step sbloccato: solo Bottone di Fine Missione
                      <div className="flex flex-col items-center gap-4 mt-6 border-t pt-6 border-dashed border-gray-600/30 text-center">
                        <div className="mb-2">
                          <p className={`${theme.subtext} text-sm mb-1 ${theme.fontClass}`}>
                            COMPLIMENTI! AVETE ULTIMATO L&apos;ULTIMA MISSIONE
                          </p>
                          <p className={`${theme.text} text-xs opacity-80 ${theme.fontClass}`}>
                            Fate controllare il lavoro finale al professore per completare ufficialmente la sfida
                          </p>
                        </div>
                        <button
                          onClick={() => setIsComplete(true)}
                          className={`
                            px-10 py-5 rounded-xl font-bold ${theme.buttonText || 'text-white'} text-xl
                            ${theme.buttonBg} ${theme.buttonHover}
                            transition-all transform hover:scale-110 shadow-lg animate-pulse-glow
                            ${theme.fontClass}
                          `}
                        >
                          🏆 COMPLETA LA MISSIONE!
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}
