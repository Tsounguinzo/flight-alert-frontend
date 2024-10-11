import { Suspense } from "react";

import AuthCodeErrorComponent from "@/components/auth/auth-error";

const AuthCodeError = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCodeErrorComponent />
    </Suspense>
  );
};

export default AuthCodeError;
