// import Sidebar from "@/components/shared/Sidebar";
// import TopNavbar from "@/components/shared/TopNavbar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div>{children}</div>
//     // <div className="flex h-screen bg-background">
//     //   <Sidebar />

//     //   <div className="flex-1 flex flex-col">
//     //     <TopNavbar />
//     //     <main className="flex-1 overflow-hidden">{children}</main>
//     //   </div>
//     // </div>
//   );
// }
// app/(dashboard)/layout.tsx

import Sidebar from "@/components/shared/Sidebar";
import ChatList from "@/components/shared/ChatList";

export default function DashboardLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <div className="bg-background text-on-surface h-screen overflow-hidden flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="ml-20 flex flex-1 h-screen">

        {/* Lista de chats SIEMPRE visible */}
        <ChatList />

        {/* Contenido dinámico (chat, settings, etc) */}
        <section className="flex-1 flex flex-col bg-surface">
          {children}
        </section>

      </main>
    </div>
  );
}
