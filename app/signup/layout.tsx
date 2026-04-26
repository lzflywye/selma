import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up for Selma",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Selma</h1>
      </div>

      <div className="w-full max-w-md">{children}</div>

      <p className="text-muted-foreground mt-8 text-center text-sm">
        &copy; 2026 Selma project. All rights reserved.
      </p>
    </div>
  );
}
