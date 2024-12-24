"use client";

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loading from "../loading";
import NotFoundPage from "../not-found";
import bpTransitionEffect from "../ui/buffer-page/bp-transition-effect";

interface ErrorProps {
  error: Error;
  statusCode?: number;
}

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default function Error({ error, statusCode }: ErrorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleError = async () => {
      console.error("Error: " + error);
      if ((statusCode === 404 || statusCode === 500) || (pathname !== '/app/not-found.tsx')) {
        bpTransitionEffect(pathname);
        await delay(500);
        router.push('/error');
      }
    };

    handleError();
  }, [error, statusCode, router, pathname]);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <Suspense fallback={<Loading />}>
      <NotFoundPage />
    </Suspense>
  );
}