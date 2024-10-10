"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold">OOPS!</h1>
      <p className="text-xl mt-2 ">Something went wrong!</p>
      <p className="mt-5 text-lg ">
        But don’t worry! here is the right path to
      </p>
      <a
        className="mt-4 inline-block px-5 py-3 bg-black text-white rounded-md"
        href="/"
      >
        Try again
      </a>
    </div>
  );
}
