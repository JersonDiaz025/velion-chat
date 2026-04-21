import Sidebar from "@/components/shared/Sidebar";
import TopNavbar from "@/components/shared/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
    // <div className="flex h-screen bg-background">
    //   <Sidebar />

    //   <div className="flex-1 flex flex-col">
    //     <TopNavbar />
    //     <main className="flex-1 overflow-hidden">{children}</main>
    //   </div>
    // </div>
  );
}
