"use client";

import Logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LayoutDashboard, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";


const data = {
  // user: {
  //   navMain: [
  //     {
  //       title: "Dashboard",
  //       url: "/user",
  //       icon: LayoutDashboard,
  //     },
  //     {
  //       title: "Your Profile",
  //       url: "/user/dashboard/profile",
  //       icon: User,
  //     },
  //     {
  //       title: "Go Back To Home",
  //       url: "/",
  //       icon: Home,
  //     },
  //   ],
  // },
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Appointments",
        url: "/admin/appointments",
        icon: User,
      },
      {
        title: "Manage Slots",
        url: "/admin/manage-slots",
        icon: User,
      },
      {
        title: "Setting",
        url: "/admin/setting",
        icon: User,
      },
      {
        title: "Support",
        url: "/admin/support",
        icon: User,
      },
      // {
      //   title: "Go Back To Home",
      //   url: "/",
      //   icon: Home,
      // },
    ],
  },
};

// add roles based on your requirements
interface AppSidebarProps {
  role: string;
}

export default function AppSidebar({ role, ...props }: AppSidebarProps) {
  const sidebarData = data[role?.toLowerCase() as keyof typeof data];

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-white border-r border-blue-200"
      {...props}
    >
      <SidebarHeader>
        <Link
          href={"/"}
          className="flex items-center w-full max-h-40 justify-center"
        >
          <Image
            src={Logo.src}
            alt="Logo"
            width={300}
            height={300}
            className="size-auto "
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}