"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, type JSX } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export const SignInForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign in to Selma</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              min={8}
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <Button
              className="w-full"
              disabled={loading}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </Field>
        </FieldGroup>
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
