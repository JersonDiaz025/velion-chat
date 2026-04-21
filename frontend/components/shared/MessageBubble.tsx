export default function MessageBubble({
  text,
  isOwn,
}: {
  text: string;
  isOwn?: boolean;
}) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 text-sm rounded-subtle max-w-xs ${
          isOwn ? "bg-primary text-black" : "bg-surface-high"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
