import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "برنامه وب ۳ من",
  description: "اتصال به متامسک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
