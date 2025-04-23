import Dashboard from "~/components/dashboard";
import "~/styles/globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ log: string }>;
}) {
  const { log } = await params;
  console.log("log", log);

  return (
    <Dashboard sidebarItems={["hi", "moin"]} activeItem={log}>
      {/* SQL injection */}
      {children}
    </Dashboard>
  );
}
