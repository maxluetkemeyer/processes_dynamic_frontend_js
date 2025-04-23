"use client";

import * as React from "react";
import { Command, Home, Inbox } from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { NavFavorites } from "./nav-favorites";
import { Separator } from "@radix-ui/react-separator";

// This is sample data.
const data = {
  teams: [
    {
      name: "Process Dynamics",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Second",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [],
  favorites: [],
  workspaces: [],
};

export function SidebarLeft({
  sidebarItems = [],
  activeItem = "",
  ...props
}: { sidebarItems: string[]; activeItem: string } & React.ComponentProps<
  typeof Sidebar
>) {
  console.log("sidebarItems", sidebarItems);

  const navMain = sidebarItems.map((item) => ({
    title: item,
    url: `/${item}/graph`,
    icon: Inbox,
    isActive: item === activeItem,
  }));

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain
          items={[
            {
              title: "Home",
              url: "/",
              icon: Home,
              isActive: activeItem === "",
            },
          ]}
        />
        <Separator className="border-1" />
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
