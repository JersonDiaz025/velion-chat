// app/(dashboard)/messages/[chatId]/page.tsx

interface Props {
  params: {
    chatId: string;
  };
}

export default function ChatPage({ params }: Props) {
  return (
    <>
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b">
        <span className="font-semibold">Chat {params.chatId}</span>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="bg-surface-container-high p-3 rounded-xl max-w-md">
          Hola 👋
        </div>

        <div className="bg-primary text-black p-3 rounded-xl max-w-md ml-auto">
          ¿Cómo estás?
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <input
          className="w-full bg-surface-container p-3 rounded-xl"
          placeholder="Escribe un mensaje..."
        />
      </div>
    </>
  );
}
