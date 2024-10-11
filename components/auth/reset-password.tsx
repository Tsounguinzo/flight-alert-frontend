"use client";
import React from "react";
import { Button, Input, Link } from "@nextui-org/react";

export default function ResetPassword() {
  return (
    <div className="flex h-full w-full justify-center mb-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-4xl font-medium">Forgot your password?</p>
          <p className="text-small text-default-500">
            We&#39;ll email you instructions on how to reset it.
          </p>
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Button color="primary" type="submit">
            Reset Password
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/signin" size="sm">
            Cancel
          </Link>
        </p>
      </div>
    </div>
  );
}
