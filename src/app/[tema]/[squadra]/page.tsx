import { notFound } from 'next/navigation'
import lessonsData from '@/data/lessons.json'
import teamsData from '@/data/teams.json'
import type { Lesson, ThemeData } from '@/types'
import GameDashboard from '@/components/GameDashboard'

const lessons = lessonsData as Lesson[]
const teams = teamsData as Record<string, ThemeData>

export function generateStaticParams() {
  const params: { tema: string; squadra: string }[] = []
  for (const lesson of lessons) {
    const themeData = teams[lesson.id]
    if (themeData) {
      for (const team of themeData.teams) {
        params.push({ tema: lesson.slug, squadra: team.id })
      }
    }
  }
  return params
}

interface Props {
  params: Promise<{ tema: string; squadra: string }>
}

export default async function TeamDashboardPage({ params }: Props) {
  const { tema, squadra } = await params

  const lesson = lessons.find((l) => l.slug === tema)
  if (!lesson) notFound()

  const themeData = teams[lesson.id]
  if (!themeData) notFound()

  const team = themeData.teams.find((t) => t.id === squadra)
  if (!team) notFound()

  const stepOrder = themeData.order[team.id]
  const teamPins = themeData.pins[team.id]

  return (
    <GameDashboard
      lesson={lesson}
      team={team}
      stepOrder={stepOrder}
      teamPins={teamPins}
    />
  )
}
