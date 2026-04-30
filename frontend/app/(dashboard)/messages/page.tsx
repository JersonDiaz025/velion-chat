export default function MessagesPage() {
  return (
    <>
      <header className='h-16 flex items-center px-6 border-b'>
        <span className='font-semibold'>Selecciona un chat</span>
      </header>
      <div className='flex-1 flex items-center justify-center text-sm opacity-60'>
        Elige una conversación para comenzar
      </div>
    </>
    // <div className="bg-background text-on-surface h-screen overflow-hidden flex">

    //   {/* Sidebar Left */}
    //   <aside className="fixed left-0 top-0 h-full z-50 w-20 flex flex-col items-center py-6 bg-black text-sm">
    //     <div className="mb-10">
    //       <span className="text-lg font-bold text-[#e0e6f1]">NA</span>
    //     </div>

    //     <nav className="flex flex-col gap-8 flex-1">
    //       <button className="flex flex-col items-center gap-1 text-primary border-r-2 border-primary pr-2">
    //         <span className="material-symbols-outlined">chat_bubble</span>
    //         <span className="text-[10px]">Chats</span>
    //       </button>

    //       <button className="flex flex-col items-center gap-1 text-secondary hover:text-white">
    //         <span className="material-symbols-outlined">group</span>
    //         <span className="text-[10px]">Contacts</span>
    //       </button>
    //     </nav>
    //   </aside>

    //   {/* Main */}
    //   <main className="ml-20 flex flex-1 h-screen">

    //     {/* Chat List */}
    //     <section className="w-80 bg-surface-container-low flex flex-col">
    //       <div className="p-6">
    //         <h1 className="text-xl font-bold mb-6">Messages</h1>

    //         <input
    //           className="w-full bg-surface-container rounded-xl py-2 px-3 text-sm"
    //           placeholder="Search..."
    //         />
    //       </div>

    //       <div className="flex-1 overflow-y-auto px-3 space-y-2">
    //         <div className="p-3 bg-surface-container-high rounded-xl">
    //           Evelyn Vance
    //         </div>
    //         <div className="p-3 hover:bg-surface-container rounded-xl">
    //           Julian Thorne
    //         </div>
    //       </div>
    //     </section>

    //     {/* Chat Area */}
    //     <section className="flex-1 flex flex-col bg-surface">

    //       {/* Header */}
    //       <header className="h-16 flex items-center justify-between px-6 border-b">
    //         <span className="font-semibold">Evelyn Vance</span>
    //       </header>

    //       {/* Messages */}
    //       <div className="flex-1 overflow-y-auto p-6 space-y-4">
    //         <div className="bg-surface-container-high p-3 rounded-xl max-w-md">
    //           Hola 👋
    //         </div>

    //         <div className="bg-primary text-black p-3 rounded-xl max-w-md ml-auto">
    //           ¿Cómo estás?
    //         </div>
    //       </div>

    //       {/* Input */}
    //       <div className="p-4 border-t">
    //         <input
    //           className="w-full bg-surface-container p-3 rounded-xl"
    //           placeholder="Escribe un mensaje..."
    //         />
    //       </div>

    //     </section>
    //   </main>
    // </div>
  );
}
