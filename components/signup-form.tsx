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

export const SignUpForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    });
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign Up for Selma</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password*</FieldLabel>
            <Input
              id="password"
              type="password"
              min={8}
              autoComplete="new-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username*</FieldLabel>
            <Input
              id="username"
              autoComplete="username"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <Button
              className="w-full"
              disabled={loading}
              onClick={handleSignUp}
            >
              Create account
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
