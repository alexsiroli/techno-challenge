export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center text-white">
      <div className="max-w-md w-full border border-gray-800 bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <div className="text-4xl mb-4">🎮</div>
        <h1 className="text-2xl font-bold mb-3 tracking-tight">Techno Challenge</h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Benvenuto! Per iniziare a giocare, inserisci l&apos;indirizzo specifico fornito dal tuo insegnante.
        </p>
      </div>
    </main>
  )
}

