import { notFound } from 'next/navigation'
import Link from 'next/link'
import lessonsData from '@/data/lessons.json'
import teamsData from '@/data/teams.json'
import type { Lesson, ThemeData } from '@/types'
import { getTheme } from '@/lib/themes'

const lessons = lessonsData as Lesson[]
const teams = teamsData as Record<string, ThemeData>

export function generateStaticParams() {
  return lessons.map((l) => ({ tema: l.slug }))
}

interface Props {
  params: { tema: string }
}

export default function ThemeLobbyPage({ params }: Props) {
  const lesson = lessons.find((l) => l.slug === params.tema)
  if (!lesson) notFound()

  const themeData = teams[lesson.id]
  if (!themeData) notFound()

  const theme = getTheme(lesson.id)

  const bgClasses: Record<string, string> = {
    mario: 'bg-blue-500 mario-clouds',
    magia: 'bg-purple-950 magic-stars',
    cyber: 'bg-gray-950 cyber-grid',
    spazio: 'bg-slate-950 star-bg space-grid',
  }

  const headerDecorations: Record<string, string> = {
    mario: '🍄⭐🪙',
    magia: '✨🔮🌙',
    cyber: '💻🔐⚡',
    spazio: '🚀🌟🛸',
  }

  return (
    <main className={`min-h-screen ${bgClasses[lesson.id] ?? 'bg-gray-900'} flex flex-col`}>
      <header className={`${theme.headerBg} border-b-4 ${theme.border.replace('border', 'border')} py-6 px-8 flex items-center justify-between`}>
        <Link href="/" className={`${theme.text} opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm`}>
          ← Torna alla Home
        </Link>
        <div className="text-2xl">{headerDecorations[lesson.id]}</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className={`text-7xl mb-4 ${theme.id === 'mario' ? 'animate-float' : ''}`}>
            {theme.icon}
          </div>
          <h1 className={`text-4xl font-bold ${theme.text} mb-3 ${theme.titleFontClass} ${theme.id === 'cyber' ? 'text-shadow-glow animate-flicker' : ''}`}>
            {lesson.title}
          </h1>
          <p className={`text-lg ${theme.subtext} mb-8`}>{lesson.subtitle}</p>

          <div className={`${theme.cardBg} border-2 ${theme.border} rounded-2xl p-6 mb-10 max-w-2xl mx-auto`}>
            <p className={`${theme.text} leading-relaxed text-base ${theme.fontClass}`}>
              {lesson.intro}
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <h2 className={`text-center text-xl font-bold ${theme.text} mb-6 ${theme.titleFontClass}`}>
            Scegli la tua squadra
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themeData.teams.map((team) => (
              <Link
                key={team.id}
                href={`/${lesson.slug}/${team.id}`}
                className={`
                  flex items-center gap-4 p-5 rounded-xl
                  border-2 ${theme.border} ${theme.cardBg}
                  ${theme.text} font-semibold text-lg
                  hover:scale-105 hover:brightness-110
                  transform transition-all duration-200
                  cursor-pointer group
                  ${theme.id === 'cyber' ? 'neon-border' : ''}
                `}
              >
                <span className="text-3xl">{team.emoji}</span>
                <span className={theme.fontClass}>{team.name}</span>
                <span className="ml-auto opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
