import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viral Hooks Bundle - Get Viral on Instagram",
  description:
    "2000+ Ready Hooks to turn your content into millions of views. Daily updates and lifetime Telegram access for just ₹99.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async={true}></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
