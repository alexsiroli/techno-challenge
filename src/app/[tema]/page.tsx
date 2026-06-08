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
  params: Promise<{ tema: string }>
}

export default async function ThemeLobbyPage({ params }: Props) {
  const { tema } = await params

  const lesson = lessons.find((l) => l.slug === tema)
  if (!lesson) notFound()

  const themeData = teams[lesson.id]
  if (!themeData) notFound()

  const theme = getTheme(lesson.id)

  const bgClasses: Record<string, string> = {
    mario: "bg-[url('/images/bg-mario.png')] bg-cover bg-center",
    magia: "bg-[url('/images/bg-magia.png')] bg-cover bg-center",
    cyber: "bg-[url('/images/bg-cyber.png')] bg-cover bg-center",
    spazio: "bg-[url('/images/bg-spazio.png')] bg-cover bg-center",
  }

  const headerDecorations: Record<string, string> = {
    mario: '🍄⭐🪙',
    magia: '✨🔮🌙',
    cyber: '💻🔐⚡',
    spazio: '🚀🌟🛸',
  }

  return (
    <main className={`min-h-screen ${bgClasses[lesson.id] ?? 'bg-gray-900'} flex flex-col relative`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className={`${theme.headerBg} border-b border-white/10 shadow-2xl py-5 px-8 flex items-center justify-between backdrop-blur-xl`}>
          <span className={`font-bold text-xl ${theme.text} tracking-widest uppercase`}>TECHNO CHALLENGE</span>
          <div className="text-3xl drop-shadow-lg">{headerDecorations[lesson.id]}</div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full">
          <div className="text-center mb-16 relative">
            <div className={`text-8xl mb-6 drop-shadow-2xl ${theme.id === 'mario' ? 'animate-bounce' : ''}`}>
              {theme.icon}
            </div>
            <h1 className={`text-6xl md:text-7xl font-extrabold ${theme.text} mb-4 ${theme.titleFontClass} tracking-tight drop-shadow-lg ${theme.id === 'cyber' ? 'text-shadow-glow animate-pulse' : ''}`}>
              {lesson.title}
            </h1>
            <p className={`text-xl md:text-2xl font-medium ${theme.subtext} opacity-90 tracking-wide`}>{lesson.subtitle}</p>
          </div>

          <div className="w-full max-w-4xl">
            <h2 className={`text-center text-2xl md:text-3xl font-bold ${theme.text} mb-8 ${theme.titleFontClass} tracking-wider opacity-90`}>
              Scegli la tua squadra
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themeData.teams.map((team) => (
                <Link
                  key={team.id}
                  href={`/${lesson.slug}/${team.id}`}
                  className={`
                    relative overflow-hidden flex flex-col items-center gap-4 p-8 rounded-2xl
                    border border-white/10 ${theme.cardBg}
                    ${theme.text} font-bold text-xl
                    hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                    transform transition-all duration-300 ease-out
                    cursor-pointer group
                    ${theme.id === 'cyber' ? 'neon-border' : ''}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-5xl mb-2 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{team.emoji}</span>
                  <span className={`${theme.fontClass} text-center tracking-wide z-10`}>{team.name}</span>
                  
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${theme.buttonBg} ${theme.buttonText || 'text-white'} shadow-md`}>Seleziona →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
