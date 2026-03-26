"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type JSX } from "react";
import { toast } from "sonner";

export const SignOutButton = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/signin");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to sign out");
        },
      },
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignOut}>
      <Button variant="destructive" type="submit" disabled={loading}>
        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </Button>
    </form>
  );
};
