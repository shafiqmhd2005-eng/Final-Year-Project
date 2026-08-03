
import "./globals.css";
import { ConditionalNavBar } from "../components/ConditionalNavBar";

export const metadata = {
  title: "Heart Digital Twin",
  description: "Digital twin prototype built with Next.js + R3F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <ConditionalNavBar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
