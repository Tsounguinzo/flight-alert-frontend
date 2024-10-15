"use client";
import React from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpSchema, SignUpFormData } from "@/utils/form-schema";
import { handleRequest, signInWithOAuth } from "@/utils/auth-helpers/client";
import { signUp } from "@/utils/auth-helpers/server";

export default function Signup() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      heard_about_us: "",
    },
  });
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("heard-about-us", data.heard_about_us || "");

      await handleRequest(formData, signUp, router);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignUp = async (provider: Provider) => {
    setErrorMessage(null);
    try {
      const formData = new FormData();

      formData.append("provider", provider);
      await signInWithOAuth(formData);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="flex h-full w-full justify-center mb-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-4xl font-medium">Welcome</p>
          <p className="text-small text-default-500">
            Create an account to get started
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onClick={() => handleOAuthSignUp("google")}
          >
            Sign Up with Google
          </Button>
        </div>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleSignUp)}
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
          <Input
            color={errors.heard_about_us ? "danger" : "default"}
            errorMessage={errors.heard_about_us?.message}
            isInvalid={!!errors.heard_about_us}
            label="How did you hear about us"
            placeholder="e.g LinkedIn, Reddit, etc."
            variant="bordered"
            {...register("heard_about_us")}
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button
            color="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>

          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
        </form>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/signin" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
