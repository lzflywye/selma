"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "better-auth";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { SignOutButton } from "./signout-button";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string(),
  email: z.email("Please enter a valid email address"),
});

export const ProfileForm = ({ user }: { user: User }): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (user.name !== values.name) {
      await authClient.updateUser(
        { name: values.name },
        {
          onSuccess: () => {
            toast.success("Profile updated");
            router.push("/profile");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Profile update failed");
          },
        },
      );
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="profile-form-name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-form-name">Email</FieldLabel>
                  <Input
                    {...field}
                    id="profile-form-name"
                    aria-invalid={fieldState.invalid}
                    type="email"
                    autoComplete="email"
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <SignOutButton />
      </CardFooter>
    </Card>
  );
};
