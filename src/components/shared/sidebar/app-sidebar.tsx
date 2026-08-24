"use client";

import Logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChartBarStacked, LayoutDashboard, Settings, SquareDivide } from "lucide-react";
import Image from "next/image";
import { NavMain } from "./nav-main";
// import { NavUser } from "./nav-user";
import Link from "next/link";
import { TbUsersGroup } from "react-icons/tb";
import { GoBriefcase } from "react-icons/go";



const data = {
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "User Management",
        url: "/admin/users",
        icon: TbUsersGroup,
      },
      {
        title: "Category Management",
        url: "/admin/categories",
        icon: ChartBarStacked,
      },
    ],
  },

  customer: {
    navMain: [
      {
        title: "Dashboard",
        url: "/customer",
        icon: LayoutDashboard,
      },
      {
        title: "Job Posting",
        url: "/customer/job-posting",
        icon: GoBriefcase,
      },
      
    ],
  },
  technician: {
    navMain: [
      {
        title: "Dashboard",
        url: "/technician",
        icon: LayoutDashboard,
      },
      {
        title: "Service Management",
        url: "/technician/services",
        icon: GoBriefcase,
      },
      {
        title: "Availability",
        url: "/technician/availability",
        icon: GoBriefcase,
      },   
      {
        title: "Booking Management",
        url: "/technician/booking",
        icon: GoBriefcase,
      },   
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
      className="w-60 bg-white border-r border-white"
      {...props}
    >
      <SidebarHeader className="bg-white">
        <Link
          href={"/"}
          className="flex items-center w-[210px] px-4 max-h-40 justify-center mb-5"
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
      <SidebarContent className="bg-white text-primary border-t border-gray-200 px-2">
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        {/* <NavUser /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
