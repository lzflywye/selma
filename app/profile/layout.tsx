import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My profile",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Selma</h1>
      </div>

      <div className="w-full max-w-md">{children}</div>

      <p className="mt-8 text-sm text-muted-foreground text-center">
        &copy; 2026 Selma project. All rights reserved.
      </p>
    </div>
  );
}
