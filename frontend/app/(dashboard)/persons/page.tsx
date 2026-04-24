import Link from "next/link"

export default function PersonsPage() {
  return (
    <>
      {/* Header */}
      <header className="h-16 flex items-center px-6 border-b">
        <span className="font-semibold">Personas</span>
      </header>

      {/* Search */}
      <div className="p-6">
        <input
          className="w-full bg-surface-container p-3 rounded-xl"
          placeholder="Buscar contactos..."
        />
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto px-6 space-y-3">

        <div className="flex items-center justify-between p-3 bg-surface-container-high rounded-xl">
          <span>Alex</span>

          <Link
            href="/messages/1"
            className="flex flex-col items-center gap-1 text-primary">
            Iniciar chat
          </Link>
        </div>

        <div className="flex items-center justify-between p-3 hover:bg-surface-container rounded-xl">
          <span>María</span>
          <Link
            href="/messages/2"
            className="flex flex-col items-center gap-1 text-primary">
            Iniciar chat
          </Link>
        </div>

      </div >
    </>
  );
}
