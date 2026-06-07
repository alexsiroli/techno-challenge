export interface Step {
  id: number
  title: string
  description: string
  pin: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  subtitle: string
  intro: string
  outro: string
  steps: Step[]
}

export interface Team {
  id: string
  name: string
  emoji: string
}

export interface ThemeData {
  teams: Team[]
  order: Record<string, number[]>
}

export interface TeamsConfig {
  [themeId: string]: ThemeData
}

export type ThemeId = 'mario' | 'magia' | 'cyber' | 'spazio'

export interface ThemeConfig {
  id: ThemeId
  bg: string
  headerBg: string
  cardBg: string
  accent: string
  accentText: string
  border: string
  text: string
  subtext: string
  inputBg: string
  buttonBg: string
  buttonHover: string
  fontClass: string
  titleFontClass: string
  pinStyle: string
  icon: string
  particles?: string
}
