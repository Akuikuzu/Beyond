import type { Metadata } from "next";
import "./globals.scss";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getData } from "@/service/data";


import { Exo_2 } from 'next/font/google';
import Background from "@/components/Background";

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Beyond",
  description: "Beyond infinity!",
  
};



export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['mydata'],
      queryFn: getData
    });

    const dhState = dehydrate(queryClient);
  return (
    <html lang="en">
      <body className={exo.className}>
      <ReactQueryProvider dehydratedState={dhState}>
        <Background />
        {children}
      </ReactQueryProvider>
      </body>
    </html>
  );
}
