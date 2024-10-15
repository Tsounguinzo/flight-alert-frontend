"use server";

import { redirect } from "next/navigation";
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";
import { getURL, getErrorRedirect, getStatusRedirect } from "@/utils/helpers";

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get("pathName")).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      "Hmm... Something went wrong.",
      "You could not be signed out.",
    );
  }

  return "/";
}

export async function signInWithEmail(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();
  let redirectPath: string;

  const supabase = createClient();
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  };

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin",
      "You could not be signed in.",
      error.message,
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      "/signin",
      "Success!",
      "Please check your email for a magic link. You may now close this tab.",
      true,
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin",
      "Hmm... Something went wrong.",
      "You could not be signed in.",
    );
  }

  return redirectPath;
}

export async function resendConfirmationEmail(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  // Get form data
  const email = String(formData.get("email")).trim();
  let redirectPath: string;

  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/verification?email=" + email,
      "Hmm... Something went wrong.",
      "Confirmation email could not be sent.",
    );
  } else {
    redirectPath = getStatusRedirect(
      "/verification?email=" + email,
      "Success!",
      "Please check your email for a confirmation link.",
    );
  }

  return redirectPath;
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL("/auth/reset_password");

  // Get form data
  const email = String(formData.get("email")).trim();
  let redirectPath: string;

  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/reset-password",
      error.message,
      "Please try again.",
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      "/reset-password",
      "Success!",
      "Please check your email for a password reset link. You may now close this tab.",
      true,
    );
  } else {
    redirectPath = getErrorRedirect(
      "/reset-password",
      "Hmm... Something went wrong.",
      "Password reset email could not be sent.",
    );
  }

  return redirectPath;
}

export async function signInWithPassword(formData: FormData) {
  let redirectPath: string;

  const data: SignInWithPasswordCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const supabase = createClient();
  const { error, data: res } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin",
      "Sign in failed.",
      error.message,
    );
  } else if (res.user) {
    redirectPath = getStatusRedirect(
      "/dashboard",
      "Success!",
      "You are now signed in.",
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin",
      "Hmm... Something went wrong.",
      "You could not be signed in.",
    );
  }

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  const data: SignUpWithPasswordCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        heard_about_us: formData.get("heard-about-us") as string,
        emailRedirectTo: callbackURL,
      },
    },
  };

  let redirectPath: string;

  const supabase = createClient();
  const { error, data: res } = await supabase.auth.signUp(data);

  if (error) {
    redirectPath = getErrorRedirect(
      "/signup",
      "Sign up failed.",
      error.message,
    );
  } else if (res.session) {
    redirectPath = getStatusRedirect(
      "/dashboard",
      "Success!",
      "You are now signed in.",
    );
  } else if (
    res.user &&
    res.user.identities &&
    res.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      "/signup",
      "Sign up failed.",
      "There is already an account associated with this email address. Try resetting your password.",
    );
  } else if (res.user) {
    redirectPath = getStatusRedirect(
      "/verification?email=" + data.email,
      "Success!",
      "Please check your email for a confirmation link. You may now close this tab.",
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signup",
      "Hmm... Something went wrong.",
      "You could not be signed up.",
    );
  }

  return redirectPath;
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password")).trim();
  let redirectPath: string;

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/update-password",
      "Your password could not be updated.",
      error.message,
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      "/dashboard",
      "Success!",
      "Your password has been updated.",
    );
  } else {
    redirectPath = getErrorRedirect(
      "/update-password",
      "Hmm... Something went wrong.",
      "Your password could not be updated.",
    );
  }

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get("email")).trim();

  const supabase = createClient();

  const callbackUrl = getURL(
    getStatusRedirect("/dashboard", "Success!", `Your email has been updated.`),
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    },
  );

  if (error) {
    return getErrorRedirect(
      "/dashboard",
      "Your email could not be updated.",
      error.message,
    );
  } else {
    return getStatusRedirect(
      "/dashboard",
      "Confirmation emails sent.",
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`,
    );
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get("fullName")).trim();

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (error) {
    return getErrorRedirect(
      "/dashboard",
      "Your name could not be updated.",
      error.message,
    );
  } else if (data.user) {
    return getStatusRedirect(
      "/dashboard",
      "Success!",
      "Your name has been updated.",
    );
  } else {
    return getErrorRedirect(
      "/dashboard",
      "Hmm... Something went wrong.",
      "Your name could not be updated.",
    );
  }
}
