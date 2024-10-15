"use client";
import React from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/utils/form-schema";
import { handleRequest } from "@/utils/auth-helpers/client";
import { requestPasswordUpdate } from "@/utils/auth-helpers/server";

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage("");

    try {
      const formData = new FormData();

      formData.append("email", data.email);

      await handleRequest(formData, requestPasswordUpdate, router);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

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
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Input
            isRequired
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            {...register("email")}
          />
          <Button
            color="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
          {successMessage !== "" && (
            <p className="text-center text-green-500">{successMessage}</p>
          )}
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
