import { SidebarLeft } from "~/components/sidebar-left";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export default function Dashboard({
  children,
  sidebarItems,
  activeItem,
}: Readonly<{
  children: React.ReactNode;
  sidebarItems: string[];
  activeItem: string;
}>) {
  return (
    <SidebarProvider>
      <SidebarLeft activeItem={activeItem} sidebarItems={sidebarItems} />
      <SidebarInset>
        <header className="bg-background fixed top-0 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
