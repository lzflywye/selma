"use client";

import { authClient } from "@/lib/auth-client";
import type { User } from "better-auth";
import { useState, type JSX } from "react";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SignOutButton } from "./signout-button";

export const ProfileForm = ({ user }: { user: User }): JSX.Element => {
  const [name, setName] = useState(user.name);

  const updateProfile = async () => {
    await authClient.updateUser({
      name: name,
    });
    alert("Profile updated");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={user.email}
            disabled
            className="bg-muted"
          />
        </Field>
        <Field>
          <Button className="w-full" onClick={updateProfile}>
            Save
          </Button>
        </Field>
      </CardContent>
      <CardFooter>
        <SignOutButton />
      </CardFooter>
    </Card>
  );
};
