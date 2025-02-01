'use client';
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";  // Import Navbar component
import Sidebar from "@/components/sidebar";  // Import Sidebar component
import { Metadata } from "next";
import Hamburger from "../../public/icons/hamburger";
import Logo from "../../public/icons/Logo";
import { ApolloProvider } from '@apollo/client';
import client from "../../server/apolloClient"; // Import the client
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/react-query";
import superjson from "superjson";
import { trpc } from "../../utils/trpc";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } },
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const url =
    process.env.NEXT_PUBLIC_APP_DOMAIN &&
      !process.env.NEXT_PUBLIC_APP_DOMAIN.includes("localhost")
      ? `https://www.${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/trpc/`
      : "http://localhost:3000/api/trpc/";

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
      transformer: superjson
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>

      <trpc.Provider client={trpcClient} queryClient={queryClient}>

        <html lang="en">
          <ApolloProvider client={client}>
            <head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body className="bg-white">
              <header className="fixed top-0 left-0 right-0 z-10 bg-white text-black p-4 shadow-md">
                <div className="flex justify-between">
                  <a href="/"><Logo></Logo></a>
                  <Navbar />
                  <button onClick={toggleSidebar} className="lg:hidden">
                    <Hamburger />
                  </button>
                </div>
              </header>

              <div className="flex flex-row h-[100vh] border-solid border-white border">
                <div
                  className={`fixed inset-0 mt-10 pt-28 lg:relative lg:max-w-80 w-2/3 bg-white text-black p-6 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:block`}
                >
                  <Sidebar />
                </div>

                <main className="pt-[200px] w-full max-w-7xl mx-auto">
                  {children}
                </main>
              </div>
            </body>
          </ApolloProvider>
        </html>
      </trpc.Provider>
    </QueryClientProvider>
  );
}
