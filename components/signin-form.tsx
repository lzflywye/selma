"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(12, "Please enter a password of 12 characters or more."),
});

export const SignInForm = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    await authClient.signIn.email(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          toast.success("I signed in");
          router.push("/profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Sign in failed");
        },
      },
    );

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign in to Selma</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          id="signin-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signin-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="signin-form-email"
                    aria-invalid={fieldState.invalid}
                    type="email"
                    autoComplete="email"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signin-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="signin-form-password"
                    aria-invalid={fieldState.invalid}
                    type="password"
                    autoComplete="current-password"
                    required
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
                Sign in
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          New to Selma?{" "}
          <Link
            href="/signup"
            className="text-primary underline underline-offset-4"
          >
            Create an account
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
