import "@/styles/globals.css";
import "@/styles/App.css";
import "@/styles/backgroundAnimation.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
