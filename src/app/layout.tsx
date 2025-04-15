import { ReactScan } from "~/_components/react_scan";
import Dashboard from "~/components/dashboard";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ReactScan />
      <body>
        <Dashboard>{children}</Dashboard>
      </body>
    </html>
  );
}
