"use client";
import React from "react";
import { Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import { resendConfirmationEmail } from "@/app/(auth)/actions";

export default function Verification() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const handleClick = () => {
    router.push("/signin");
  };

  const handleResendEmail = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const response = await resendConfirmationEmail(email as string);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Email sent successfully");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex h-full w-full justify-center mb-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-4xl font-medium">
            {" "}
            We&apos;ve sent you an email for Confirmation
          </p>
          <p className="text-small text-default-500">
            If you&apos;ve already confirmed your email, please sign in below
          </p>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 text-center">
            <Button
              className="w-full"
              color="primary"
              size={"lg"}
              onClick={handleClick}
            >
              Sign in
            </Button>
            <div className="mt-4">
              Make sure to check your spam folder if you don&apos;t see it!
            </div>
            {email && (
              <div className="mt-2 text-gray-400">
                Didn&apos;t receive an email?{" "}
                <Button
                  as={Link}
                  className="p-0 text-gray-700 hover:text-primary-800"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  onClick={() => handleResendEmail()}
                >
                  {isSubmitting ? "Resending..." : "Resend email"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
