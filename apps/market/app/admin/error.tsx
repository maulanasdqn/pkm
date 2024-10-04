'use client';

import { Button } from '@pkm/ui';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center p-20 gap-10">
      {error.digest && (
        <p className="text-red-500 text-center">{error.digest}</p>
      )}
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <Button onClick={reset}>Try again</Button>
    </section>
  );
}
