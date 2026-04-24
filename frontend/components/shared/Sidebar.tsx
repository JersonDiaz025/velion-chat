// components/layout/Sidebar.tsx

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full z-50 w-20 flex flex-col items-center py-6 bg-black text-sm">

      <div className="mb-10">
        <span className="text-lg font-bold text-[#e0e6f1]">NA</span>
      </div>

      <nav className="flex flex-col gap-8 flex-1">

        <Link
          href="/messages"
          className="flex flex-col items-center gap-1 text-primary"
        >
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="text-[10px]">Chats</span>
        </Link>

        <Link
          href="/persons"
          className="flex flex-col items-center gap-1 text-secondary hover:text-white"
        >
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px]">Contacts</span>
        </Link>

      </nav>
    </aside>
  );
}
