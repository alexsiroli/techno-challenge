import Link from 'next/link'
import lessonsData from '@/data/lessons.json'
import type { Lesson } from '@/types'

const lessons = lessonsData as Lesson[]

const themeVisuals = {
  mario: {
    gradient: 'from-red-500 via-blue-500 to-green-500',
    cardBg: 'bg-gradient-to-br from-red-500 to-red-700',
    border: 'border-yellow-400',
    icon: '🎮',
    label: 'Tema 1',
    decorations: ['🍄', '⭐', '🪙', '🌟'],
    textColor: 'text-white',
    hoverRing: 'hover:ring-yellow-400',
  },
  magia: {
    gradient: 'from-purple-900 via-purple-700 to-yellow-600',
    cardBg: 'bg-gradient-to-br from-purple-900 to-indigo-900',
    border: 'border-yellow-500',
    icon: '🔮',
    label: 'Tema 2',
    decorations: ['✨', '🌙', '⚗️', '🦉'],
    textColor: 'text-yellow-100',
    hoverRing: 'hover:ring-yellow-500',
  },
  cyber: {
    gradient: 'from-gray-900 via-green-900 to-gray-900',
    cardBg: 'bg-gradient-to-br from-gray-900 to-gray-950',
    border: 'border-green-500',
    icon: '💻',
    label: 'Tema 3',
    decorations: ['🔐', '⚡', '🖥️', '🕵️'],
    textColor: 'text-green-400',
    hoverRing: 'hover:ring-green-500',
  },
  spazio: {
    gradient: 'from-slate-900 via-blue-900 to-slate-900',
    cardBg: 'bg-gradient-to-br from-slate-800 to-slate-950',
    border: 'border-cyan-500',
    icon: '🚀',
    label: 'Tema 4',
    decorations: ['🌟', '🪐', '🛸', '🌌'],
    textColor: 'text-cyan-300',
    hoverRing: 'hover:ring-cyan-500',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-float inline-block">🏆</div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Techno Challenge
          </h1>
          <p className="text-xl text-purple-200 max-w-xl mx-auto">
            Scegli il tuo tema e inizia la missione!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => {
            const visual = themeVisuals[lesson.id as keyof typeof themeVisuals]
            return (
              <Link
                key={lesson.id}
                href={`/${lesson.slug}`}
                className={`
                  relative overflow-hidden rounded-2xl border-2 ${visual.border}
                  ${visual.cardBg} p-8
                  transform transition-all duration-300
                  hover:scale-105 hover:-translate-y-1
                  hover:ring-4 ${visual.hoverRing} hover:ring-opacity-60
                  cursor-pointer group block
                `}
              >
                <div className="absolute top-3 right-3 opacity-20 text-4xl">
                  {visual.decorations.map((d, i) => (
                    <span key={i} className="ml-1">{d}</span>
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-2">
                    {visual.label}
                  </div>
                  <div className="text-5xl mb-3">{visual.icon}</div>
                  <h2 className={`text-2xl font-bold ${visual.textColor} mb-2 group-hover:scale-105 transition-transform`}>
                    {lesson.title}
                  </h2>
                  <p className={`${visual.textColor} opacity-80 text-sm`}>
                    {lesson.subtitle}
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <span className={`text-sm font-medium ${visual.textColor} opacity-70`}>
                      15 prove • 5 squadre
                    </span>
                    <span className={`ml-auto ${visual.textColor} opacity-90 text-lg group-hover:translate-x-2 transition-transform`}>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            <span>🔑</span>
            <span>Area Insegnante</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
