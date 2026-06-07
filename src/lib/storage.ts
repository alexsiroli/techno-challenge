'use client'

const PREFIX = 'techno_challenge_'

export interface TeamProgress {
  currentStep: number
  unlockedSteps: number[]
}

export function getProgress(themeId: string, teamId: string): TeamProgress {
  if (typeof window === 'undefined') return { currentStep: 0, unlockedSteps: [] }
  const key = `${PREFIX}${themeId}_${teamId}`
  const raw = localStorage.getItem(key)
  if (!raw) return { currentStep: 0, unlockedSteps: [] }
  try {
    return JSON.parse(raw) as TeamProgress
  } catch {
    return { currentStep: 0, unlockedSteps: [] }
  }
}

export function saveProgress(themeId: string, teamId: string, progress: TeamProgress): void {
  if (typeof window === 'undefined') return
  const key = `${PREFIX}${themeId}_${teamId}`
  localStorage.setItem(key, JSON.stringify(progress))
}

export function unlockStep(themeId: string, teamId: string, stepIndex: number): void {
  const progress = getProgress(themeId, teamId)
  if (!progress.unlockedSteps.includes(stepIndex)) {
    progress.unlockedSteps.push(stepIndex)
  }
  if (stepIndex >= progress.currentStep) {
    progress.currentStep = stepIndex
  }
  saveProgress(themeId, teamId, progress)
}

export function resetProgress(themeId: string, teamId: string): void {
  if (typeof window === 'undefined') return
  const key = `${PREFIX}${themeId}_${teamId}`
  localStorage.removeItem(key)
}
