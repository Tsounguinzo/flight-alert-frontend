"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import {
  UpdatePasswordFormData,
  updatePasswordSchema,
} from "@/utils/form-schema";
import { handleRequest } from "@/utils/auth-helpers/client";
import { updatePassword } from "@/utils/auth-helpers/server";

const UpdatePasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const handleUpdatePassword: SubmitHandler<
    UpdatePasswordFormData
  > = async () => {
    if (isSubmitting) return;
    setErrorMessage(null);

    try {
      const formData = new FormData();

      formData.append("password", getValues().password);
      await handleRequest(formData, updatePassword, router);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-full w-full justify-center mb-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-4xl font-medium">Update Password</p>
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleUpdatePassword)}
        >
          <Input
            isRequired
            color={errors.password ? "danger" : "default"}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            {...register("password")}
          />
          <Input
            isRequired
            color={errors.confirmPassword ? "danger" : "default"}
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
            label="Confirm Password"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
            {...register("confirmPassword")}
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
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
