// Il marchio di Techno Challenge: il lucchetto stellato (regole in DESIGN.md).
// Geometria copiata da alx/brand/app-icons/techno-challenge/marchio.mjs, la fonte del kit: se cambia
// li', si ricopia qui. Griglia 100 x 100.
const ARCO = 'M30 50V31a20 20 0 0 1 40 0'
const CORPO = 'M29 44h42a15 15 0 0 1 15 15v18a15 15 0 0 1-15 15H29a15 15 0 0 1-15-15V59a15 15 0 0 1 15-15Z'
const SPESSORE = 'M14 77v2a15 15 0 0 0 15 15h42a15 15 0 0 0 15-15v-2a15 15 0 0 1-15 15H29a15 15 0 0 1-15-15Z'
const SERRATURA = 'M50 53Q52.31 64.7 60.5 68Q52.31 71.3 50 83Q47.69 71.3 39.5 68Q47.69 64.7 50 53Z'
const SCINTILLA = 'M86 5.5Q87.53 12.47 94.5 14Q87.53 15.53 86 22.5Q84.47 15.53 77.5 14Q84.47 12.47 86 5.5Z'

// La stella a quattro punte del marchio, per le cifre nascoste del PIN (griglia 24)
export const STELLA = 'M12 3Q13.8 10.2 21 12Q13.8 13.8 12 21Q10.2 13.8 3 12Q10.2 10.2 12 3Z'

interface SimboloProps {
  /** colore: oro sul buio. mono: tutto nel colore del testo, la serratura e' un foro */
  variante?: 'colore' | 'mono'
  className?: string
  /** true: l'arco parte chiuso e si apre (gesto della home, solo senza movimento ridotto) */
  apri?: boolean
}

export function Simbolo({ variante = 'colore', className = '', apri = false }: SimboloProps) {
  if (variante === 'mono') {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
        <path d={ARCO} fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
        <path fillRule="evenodd" d={CORPO + SERRATURA} />
        <path d={SCINTILLA} />
        <circle cx="91" cy="32" r="2.6" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path className={apri ? 'tc-arco' : undefined} d={ARCO} fill="none" stroke="rgb(var(--oro))" strokeWidth="11" strokeLinecap="round" />
      <path d={SPESSORE} fill="rgb(var(--oro-scuro))" />
      <path d={CORPO} fill="rgb(var(--oro))" />
      <path d={SERRATURA} fill="rgb(var(--notte))" />
      <g className={apri ? 'tc-scintilla' : undefined} fill="rgb(var(--luce))">
        <path d={SCINTILLA} />
        <circle cx="91" cy="32" r="2.6" />
      </g>
    </svg>
  )
}

// La scritta in linea: simbolo + "Techno Challenge" nel carattere del marchio. Testo vero, non
// contorni: si legge, si traduce e segue il colore del contesto (className).
export function Marchio({ className = '', variante = 'colore' }: { className?: string; variante?: 'colore' | 'mono' }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] font-brand font-black leading-none tracking-[-0.01em] ${className}`}>
      <Simbolo variante={variante} className="h-[1.25em] w-[1.25em] shrink-0 -translate-y-[0.06em]" />
      <span>Techno Challenge</span>
    </span>
  )
}
