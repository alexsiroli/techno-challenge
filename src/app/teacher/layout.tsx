import type { Metadata } from 'next'

// Il pannello non e' linkato dalla home e non va nei motori di ricerca (PDR.md)
export const metadata: Metadata = {
  title: 'Pannello docente',
  robots: { index: false, follow: false },
}

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return children
}
