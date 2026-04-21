export default function Sidebar() {
  return (
    <aside className="w-72 bg-surface-medium p-4">
      <h2 className="text-sm text-muted mb-4">Chats</h2>

      <div className="space-y-2">
        <div className="p-2 rounded-subtle bg-surface-high cursor-pointer">
          Juan Pérez
        </div>
        <div className="p-2 rounded-subtle hover:bg-surface-high cursor-pointer">
          María Gómez
        </div>
      </div>
    </aside>
  );
}
