# DESIGN.md: Techno Challenge, "Il lucchetto stellato"

Marchio v2.3, scelto il 2026-09-30 senza round interattivo (decisioni delegate dall'utente).
Prodotto: vedi PRODUCT.md. Kit del marchio (SVG, PNG, favicon) e sua fonte unica:
`alx/brand/app-icons/techno-challenge/` (`marchio.mjs`, `build.mjs`).

## La scelta: Magia, non Cyber-Detective

Il brief chiedeva di prendere come riferimento uno dei due temi. Due bozze a confronto (palette,
caratteri, logo, una schermata): **Accademia di Magia** e **Cyber-Detective**.

- **L'atmosfera per 9-10 anni.** La magia trasforma il meccanismo del gioco in una storia che i
  bambini capiscono da soli: il PIN dell'insegnante e' la *parola magica* che apre la prova. Il
  detective racconta invece un furto, un ladro e un'indagine. Nastro giallo, timbri e caratteri
  stencil sono piu' freddi, quasi da polizia.
- **Un ombrello vero.** Una "parola magica" sta bene in tutti e quattro i mondi: formula, codice di
  accesso, autorizzazione, PIN. "Caso" e "indagine", invece, funzionano solo nel tema Cyber.
- **Il logo.** Tutti e due i simboli si leggono a 64 px. La lente con la serratura, pero', e'
  l'icona universale del "cerca", e il suo blu notte con il giallo si confonde con la palette di
  ALX. Il lucchetto d'oro aperto racconta invece il gesto del prodotto (si sblocca) ed e' solo suo.
- **Niente scuro + verde acido.** Il cliche' era gia' la pelle del tema Cyber; il marchio non lo ripete.

## Il marchio

- **Simbolo:** un lucchetto d'oro gia' aperto (la gamba destra dell'arco fuori dal corpo), con la
  serratura a stella a quattro punte e una scintilla in alto a destra. Due forme piene, un arco
  spesso: regge a 16 px. Griglia 100 x 100: arco con tratto 11, corpo 72 x 48 con raggio 15,
  spessore di 2 unita' sotto in oro scuro.
- **Scritta:** "TECHNO" in Lexend 700, spaziato di 0,42 em, sopra "Challenge" in Texturina 900
  (optical size 72). Nei file e' in contorni, quindi non serve il font. Nell'app la scritta in linea
  (`<Marchio />`) e' testo vero in Texturina: si legge, si seleziona e prende il colore del contesto.
- **Composizioni:** orizzontale (simbolo alto quanto la scritta, fuga 22), verticale (simbolo
  150 sopra, centrato), in linea (simbolo + "Techno Challenge" su una riga, per le barre).
- **Varianti:** `notte` (oro sul buio, la principale), `giorno` (scritta in viola accademia su fondo
  chiaro), `mono-chiaro` e `mono-scuro` (un colore, serratura forata), `mono` (currentColor).
- **Icona d'app:** il lucchetto (72% del lato) sul velluto `#2A1A52`, con un alone viola dietro.
  Per la versione maskable il lucchetto scende al 56%, dentro la zona sicura. Il favicon e' l'icona
  con gli angoli al 22%: su una scheda chiara il solo lucchetto d'oro sparirebbe.
- **Spazio di rispetto:** mezza altezza del simbolo su ogni lato. **Misura minima:** simbolo 16 px,
  scritta in linea 14 px di corpo.
- **Non si fa:** ricolorare l'oro (tranne nelle varianti mono); mettere il lucchetto d'oro su fondi
  chiari senza la variante `giorno`; aggiungere ombre, bagliori o gradienti al simbolo; chiudere
  l'arco; sostituire la stella con un buco rotondo; comporre la scritta in un altro carattere.

## L'ombrello sopra i quattro temi

Le squadre giocano ancora in Mario, Magia, Cyber e Spazio, con i loro colori, caratteri, sfondi e
testi (`src/lib/themes.ts`, `src/data/lessons/`), che non si toccano. Al marchio spettano:

- la **parte comune**: home, pannello docente, 404, favicon, icone, manifest, `theme-color`;
- la **firma** nella barra di ogni lobby: `<Marchio variante="mono">` nel colore del testo del tema
  (bianco su rosso Mario, lilla su viola Magia, verde su nero Cyber, azzurro su blu Spazio);
- il **carattere di lettura**: Lexend e' il testo di base di tutta l'app, anche dentro i temi. I
  titoli dei temi restano Press Start 2P, Cinzel Decorative, Share Tech Mono e Orbitron.
- il **focus visibile**: anello d'oro di 3 px, dove il tema non ne disegna uno suo.

## Palette

Canali RGB in `src/app/globals.css` (`:root`), nomi in `tailwind.config.ts`. Niente hex nei componenti.

| Token | Hex | Ruolo | Contrasto |
|---|---|---|---|
| `notte` | `#1A1033` | fondo | luna 15,6:1, oro 11,1:1 |
| `velluto` | `#2A1A52` | superfici, card, icona | luna 13,3:1, muto 7,7:1, oro 9,4:1 |
| `viola` | `#3B2574` | bordi, superfici alte | |
| `accademia` | `#4B2A91` | viola pieno; accento del progetto in ALX | 9,4:1 sulla tela di ALX |
| `oro` | `#F4C542` | azione, PIN, marchio | notte su oro 11,1:1 |
| `oro-scuro` | `#B8860B` | spessore del lucchetto | solo decorativo |
| `luce` | `#FFF1B8` | scintille, risposte corrette | |
| `luna` | `#F1ECFF` | testo | |
| `muto` | `#BDB2DD` | testo secondario | 9,1:1 sulla notte |

Un solo accento: l'oro. Il colore di ogni mondo compare solo come anello sulla sua miniatura (home,
pannello docente).

## Caratteri (OFL, self-host)

- **Texturina 900** (istanza opsz 40, pesi 600-900, 36 KB): titoli e cifre del PIN, sempre con
  `lining-nums` (classe `tabular`), perche' di base ha le cifre "da libro". Deriva dalla textura dei
  manoscritti, ma e' leggibile: e' la pergamena dell'accademia.
- **Lexend** (300-700, 30 KB): testo corrente e interfaccia. E' stato disegnato per migliorare la
  fluidita' di lettura, quindi e' adatto a chi a 9-10 anni legge ancora piano.
- I font dei temi sono self-host anche loro: in `src/fonts/`, caricati con `next/font/local`
  (`src/lib/fonts.ts`) e senza preload. Niente Google Fonts a runtime: nelle reti delle scuole e'
  spesso bloccato e manda dati a terzi.

## Tono

Italiano semplice, frasi brevi, alla seconda persona plurale verso la squadra ("Aprite",
"Controllate"), alla seconda singolare verso l'insegnante ("Tocca", "Scegli"). Le parole sono quelle
del gioco: missione, squadra, prova, PIN, parola magica. Niente emoji nell'interfaccia comune (le
emoji delle squadre sono contenuto e restano).

## Schermate comuni

1. **Home** (`/`): il marchio in alto; "Quattro mondi, una parola magica." con il PIN che si compone;
   il lucchetto grande; i quattro mondi (miniatura, titolo e missione, non sono link: la classe entra
   dall'indirizzo che le da' l'insegnante); una riga su privacy e classi.
2. **Pannello docente** (`/teacher`, `noindex`): barra con marchio e "Pannello docente"; tre sezioni
   (Tabella dei PIN, Storia e avvio, Monitoraggio) come controllo segmentato; tabella con colonna
   degli step fissa, PIN nascosti di default, celle da segnare in oro (anche da tastiera); dettaglio
   della prova in un dialog (Esc chiude). Icone Phosphor, un solo peso.
3. **404**: "Questa porta non si apre." con il ritorno all'ingresso.
4. **Barra delle lobby**: la firma del marchio in monocromo.

## Forma e movimento

- Raggi: card 16 px (`rounded-2xl`), bottoni e campi 12 px (`rounded-xl`), pillole piene per i
  filtri di tema. Target di almeno 44 px.
- Ombre lunghe e morbide, tinte di notte (`rgb(8 4 20 / 0.6)`), mai a blocco.
- **Il gesto** (una volta, solo in home): le quattro stelle del PIN diventano cifre d'oro (260 ms
  l'una, 220 ms di scarto, ease-out `cubic-bezier(0.23, 1, 0.32, 1)`), poi l'arco del lucchetto si
  alza di 9 unita' (340 ms) e la scintilla si accende. Con movimento ridotto si vede subito lo stato
  finale.
- Pressione: `scale(0.97)` in 150 ms. Nessuna animazione sulle azioni ripetute del pannello, solo i
  cambi di colore.

## Dove vive

- `src/components/Marchio.tsx`: `Simbolo` e `Marchio` (geometria copiata da `marchio.mjs` del kit).
- `src/app/globals.css`: token, cielo stellato (`.cielo`), gesto (`.tc-cifra`, `.tc-arco`).
- `public/`: `favicon.ico`, `favicon.svg`, `icons/` (192, 512, maskable, apple-touch, simbolo),
  `manifest.webmanifest`. Si rigenerano dal repo alx:
  `node brand/app-icons/techno-challenge/build.mjs --app ../techno-challenge`.
- `public/images/mondi/`: miniature 360 px dei quattro sfondi, per home e pannello.
