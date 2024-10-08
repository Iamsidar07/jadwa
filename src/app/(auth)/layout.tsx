import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwa | Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex h-screen">
        <div className="hidden lg:inline-flex text-[7rem] font-semibold lg:w-1/3 lg:max-w-[450px] flex-col items-center justify-center bg-gradient-to-bl from-zinc-950 to-zinc-800 text-zinc-800 p-4 overflow-hidden">
          Continue with Jadwa
        </div>
        <div className="w-full lg:flex-1 flex flex-col items-center justify-center border-l">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
