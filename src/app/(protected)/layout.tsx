import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import MobileHeader from "@/components/MobileHeader";
import MobileNavbar from "@/components/MobileNavbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:inline-block h-[94px] border-b w-full sticky top-0">
        <Header />
      </div>
      <MobileHeader />

      <div className="flex flex-col-reverse sm:flex-row relative h-[calc(100vh-94px)]">
        <div className="hidden border-t sm:border-t-0 sm:border-r sticky top-0 bottom-0 lg:w-full lg:max-w-[250px] flex-shrink-0 md:flex flex-col">
          <Navbar />
        </div>
        <div className="border-t sticky bottom-0 right-0 left-0 w-full md:hidden">
          <MobileNavbar />
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
