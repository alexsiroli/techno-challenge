# Product

<!-- impeccable:product-schema 1 -->

> Dedotto da PDR.md e dal codice il 2026-09-30, senza intervista: l'utente ha delegato le
> decisioni (brief del redesign di ottobre 2026). Le voci segnate "(dedotto)" vanno confermate.

## Platform

web

## Users

- **Squadre di alunni di quarta e quinta primaria** (9-10 anni), 4-6 bambini davanti a un PC o a
  una LIM della scuola. Leggono lentamente, si entusiasmano, toccano tutto: servono testi grandi,
  un'azione alla volta, feedback immediato.
- **L'insegnante** che guida la lezione: apre `/teacher` sul suo portatile in cattedra, tiene
  d'occhio 5 squadre in parallelo, comunica i PIN a voce senza farli vedere ai bambini.

## Product Purpose

Trasformare una lezione di informatica e logica in una missione a squadre: ogni squadra affronta
15 prove in un ordine diverso e sblocca la successiva con il PIN a 4 cifre che l'insegnante da'
solo quando la prova e' superata davvero. Successo: nessuna squadra aspetta il turno, la classe
arriva alla schermata di vittoria, l'insegnante sa sempre chi sta facendo cosa.

## Positioning

Il lucchetto e' l'insegnante: l'app non corregge nulla, custodisce la storia e aspetta il codice
detto a voce. Un gioco di classe senza account, senza server e senza dati personali, che si apre
da un link.

## Operating Context

- Aula scolastica, PC condivisi o LIM, spesso Chrome/Edge su Windows; connessione a volte debole
  (sito statico, i progressi restano nel `localStorage` del browser).
- Quattro temi di gioco con storia, titoli e sfondi propri: Regno dei Funghi (`/regno-dei-funghi`),
  Accademia di Magia (`/accademia-magia`), Cyber-Detective (`/cyber-detective`), Naufragio Spaziale
  (`/naufragio-spaziale`). Ogni tema ha 5 squadre con nome ed emoji.
- Flusso: lobby del tema, scelta della squadra, PIN di avvio, 15 prove, PIN finale, vittoria.
- `/teacher` non e' linkata dalla home: tabella dei PIN (nascosti di default), storia e avvio,
  monitoraggio di una squadra con la risposta corretta.

## Capabilities and Constraints

- Next.js in export statico (`output: 'export'`, `trailingSlash`), Tailwind 3, dati in JSON
  (`src/data/lessons/*.json`, `src/data/teams.json`), nessun backend.
- La logica dei PIN, l'ordine delle prove e i contenuti dei quattro temi non si toccano nel
  redesign del marchio (vincolo del brief).
- I temi usano oggi riferimenti a personaggi di terzi (Mario): l'utente ha detto di non
  preoccuparsene in questa fase.

## Brand Commitments

- Nome: **Techno Challenge** (dedotto: nessun logo precedente oltre all'icona del portfolio).
- Italiano, tono da gioco di classe: "missione", "squadra", "prova", "PIN" (dal codice).
- Il marchio e' un ombrello sopra i quattro temi: le squadre continuano a giocare in Mario, Magia,
  Cyber e Spazio (brief v2.3).

## Evidence on Hand

- Storie e prove vere dei quattro temi in `src/data/lessons/`.
- Sfondi illustrati dei temi in `public/images/bg-*.png`.
- Nessuna testimonianza, nessun dato d'uso: non vanno inventati.

## Product Principles

1. Un'azione alla volta: la squadra vede la prova e il lucchetto, nient'altro.
2. Il segreto e' dell'insegnante: i PIN non si vedono mai per sbaglio.
3. Ogni tema e' un mondo, il marchio e' la porta d'ingresso comune.
4. Funziona in classe cosi' com'e': niente installazioni, niente account, niente rete necessaria
   dopo il primo caricamento.

## Accessibility & Inclusion

Bambini di 9-10 anni, anche con difficolta' di lettura (dedotto dall'eta'): testo corrente grande,
contrasto AA, target ampi per mouse e dita sulla LIM, movimento ridotto rispettato.
