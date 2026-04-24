// components/layout/ChatList.tsx

import Link from "next/link";

export default function ChatList() {
  return (
    <section className="w-80 bg-surface-container-low flex flex-col">

      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">Messages</h1>

        <input
          className="w-full bg-surface-container rounded-xl py-2 px-3 text-sm"
          placeholder="Search..."
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-2">

        <Link href="/messages/1" className="p-3 bg-surface-container-high rounded-xl block">
          Evelyn Vance
        </Link>

        <Link href="/messages/2" className="p-3 hover:bg-surface-container rounded-xl block">
          Julian Thorne
        </Link>

      </div>

    </section>
  );
}
