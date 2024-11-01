// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/loadingSpinner/LoadingSpinner';
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart(); // Start loading when the component mounts
    setTimeout(handleComplete, 2000); // Simulate loading time

    return () => {
      handleComplete(); // Ensure spinner stops when component unmounts
    };
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <Component {...pageProps} />
    </>
  );
}
