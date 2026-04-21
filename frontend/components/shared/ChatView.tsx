import MessageBubble from "./MessageBubble";

export default function ChatView() {
  return (
    <div className="flex flex-col h-full bg-surface-low">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <MessageBubble text="Hola 👋" />
        <MessageBubble text="¿Cómo estás?" isOwn />
      </div>

      <div className="p-3 border-t border-surface-medium">
        <input
          className="w-full bg-surface-medium rounded-subtle p-2 text-sm outline-none"
          placeholder="Escribe un mensaje..."
        />
      </div>
    </div>
  );
}
