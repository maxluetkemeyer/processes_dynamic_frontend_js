import * as React from "react";
import { EdgeSelection } from "~/app/[log]/graph/_components/edges_selection";
import { FieldSelector } from "~/app/[log]/graph/_components/field_selector";
import { IndicatorSelection } from "~/app/[log]/graph/_components/indicator_selection";
import { WhatsInside } from "~/app/[log]/graph/_components/whats_inside";
import { WindowSelecion } from "~/app/[log]/graph/_components/window_selection";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "~/components/ui/sidebar";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className=" top-0 hidden border-l lg:flex" // sticky
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <FieldSelector />
        <div className="mt-2 mb-2 border-b-2"></div>
        <WhatsInside />
        <div className="mt-2 mb-2 border-b-2"></div>
        <WindowSelecion />
        <div className="mt-2 mb-2 border-b-2"></div>
        <EdgeSelection />
        <div className="mt-2 mb-2 border-b-2"></div>
        <IndicatorSelection />
      </SidebarHeader>
      <SidebarContent>
        {/* <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarFooter>
    </Sidebar>
  );
}
