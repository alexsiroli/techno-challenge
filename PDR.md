### PRD: Techno Challenge

**1. Panoramica del Progetto**
L'applicazione è una piattaforma web statica progettata per gestire un'attività di gamification in classe (4ª e 5ª elementare). Gli studenti, divisi in squadre, affronteranno una serie di prove informatiche e logiche per completare una "missione" basata su 4 temi differenti. L'avanzamento avviene tramite lo sblocco di "step" protetti da codici PIN a 4 cifre forniti dall'insegnante al superamento delle prove fisiche/informatiche.

**2. Stack Tecnologico Consigliato**

* **Framework:** Next.js o React SPA (ideali per importare nativamente file JSON e gestire viste dinamiche senza backend).
* **Styling:** Tailwind CSS o CSS Modules per garantire un'interfaccia "pulita", minimale e rigorosamente desktop-first.
* **Gestione Stato:** React State + LocalStorage (fondamentale per evitare che i progressi dei bambini vadano persi ricaricando la pagina, dato che non c'è un database).
* **Dati:** File `.json` statici archiviati nel progetto.

**3. Architettura dei Dati (JSON)**
Il cuore dell'app si baserà su due strutture dati principali:

* **Configurazione Lezioni (`lessons.json`):** Conterrà ID tema, titolo, testo introduttivo, testo conclusivo e un array di 15 oggetti "prova" (titolo prova, descrizione, codice di sblocco necessario per vederla).
* **Configurazione Squadre (`teams.json`):** Conterrà i nomi delle 5 squadre per ciascun tema e un mapping per definire l'ordine *randomizzato* delle prove per ogni squadra, così da evitare che procedano tutte in parallelo sullo stesso task.

**4. Mappa del Sito (Sitemap)**

* **`/` (Home):** Menu principale per selezionare una delle 4 lezioni (Temi).
* **`/[tema]` (Lobby Lezione):** Pagina tematizzata. Mostra il testo/storia iniziale e i bottoni per selezionare la propria squadra (es. "Scegli la tua squadra per iniziare").
* **`/[tema]/[squadra]` (Dashboard Squadra):** L'area di gioco vera e propria.
* **`/teacher` (Dashboard Insegnante):** Area di controllo (non indicizzata e non linkata dalla home, accessibile solo via URL diretto).

**5. Flussi Utente e Funzionalità**

**Lato Studente (Gameplay)**

* I ragazzi navigano sulla rotta della lezione e cliccano sul nome della loro squadra.
* L'interfaccia mostra lo Step attuale (es. Step 1 di 15).
* Per leggere il testo della prova, è presente un campo input (stile lucchetto o terminale) che richiede un PIN a 4 cifre.
* All'inserimento del PIN corretto, si svela il testo della prova da completare.
* Superata la prova fisicamente/al PC, chiamano l'insegnante. Se la prova è superata, l'insegnante fornisce a voce il PIN dello Step successivo.
* L'app salva lo step corrente nel LocalStorage.

**Lato Insegnante (Dashboard Controllo)**

* **Tabella Codici:** Una vista chiara (a griglia o tabella) che incrocia Squadre e Step, mostrando tutti i codici PIN generati a sistema.
* **Monitoraggio Simulato:** Una sezione con dei menu a tendina. L'insegnante può selezionare "Tema X" -> "Squadra Y" -> "Step Z" per leggere immediatamente a schermo quale prova stanno affrontando quei ragazzi in quel momento (utile vista la randomizzazione dell'ordine delle prove).

**6. Temi e Stile Visivo (UI/UX)**
L'interfaccia deve mantenere una struttura di base coerente per non confondere i ragazzi, ma il *look and feel* (colori di sfondo, font dei titoli, icone) cambierà in base alla rotta:

* **Tema 1 (Super Mario):** Colori saturi (rosso, verde, azzurro cielo), font pixel-art o giocosi.
* **Tema 2 (Accademia di Magia):** Colori scuri (viola, oro, nero), font graziati stile pergamena.
* **Tema 3 (Cyber-Detective):** Stile terminale (sfondo nero, testo verde fluo) o ufficio investigativo (fascicoli, timbri).
* **Tema 4 (Naufragio Spaziale):** Interfaccia hi-tech, metallica, con luci al neon azzurre e bottoni "futuristici".
