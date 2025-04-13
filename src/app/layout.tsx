import { ReactScan } from "~/app/_components/react_scan";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ReactScan />
      <body>{children}</body>
    </html>
  );
}
