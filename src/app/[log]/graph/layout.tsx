import { SidebarRight } from "~/components/sidebar-right";
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
    <div className="flex h-full gap-4">
      {children}
      <SidebarRight />
    </div>
  );
}
