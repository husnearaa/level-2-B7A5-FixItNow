"use client";

import Logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Settings, SquareDivide } from "lucide-react";
import Image from "next/image";
import { NavMain } from "./nav-main";
// import { NavUser } from "./nav-user";
import Link from "next/link";
import { FaRegAddressCard } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { BsBadgeAd } from "react-icons/bs";
import { RiGraduationCapLine } from "react-icons/ri";
import { GoBriefcase } from "react-icons/go";
import { PiCreditCard } from "react-icons/pi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { TbFileDollar } from "react-icons/tb";

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
        title: "Job Management",
        url: "/admin/jobs",
        icon: GoBriefcase,
      },
      {
        title: "All communities Category",
        url: "/admin/communities-category",
        icon: GoBriefcase,
      },
      {
        title: "All Reported Community Posts",
        url: "/admin/reported-community-post",
        icon: GoBriefcase,
      },
      {
        title: "Subscription",
        url: "/admin/subscription",
        icon: FaRegAddressCard,
      },
      {
        title: "Advertising",
        url: "/admin/advertising",
        icon: BsBadgeAd,
      },
      {
        title: "Coupon",
        url: "/admin/coupon",
        icon: SquareDivide,
      },
      {
        title: "Payment History",
        url: "/admin/payment",
        icon: PiCreditCard,
      },
      {
        title: "Setting",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },

  employer: {
    navMain: [
      {
        title: "Dashboard",
        url: "/employer",
        icon: LayoutDashboard,
      },
      {
        title: "Job Posting",
        url: "/employer/job-posting",
        icon: GoBriefcase,
      },
      {
        title: "Interview",
        url: "/employer/interview",
        icon: MdOutlineVideoCameraFront,
      },
      {
        title: "Candidate",
        url: "/employer/candidate",
        icon: FaRegAddressCard,
      },
      {
        title: "Subscription",
        url: "/employer/subscription",
        icon: TbFileDollar,
      },
      {
        title: "Chat",
        url: "/employer/chatting",
        icon: IoChatbubbleEllipsesOutline,
      },
      {
        title: "Profile",
        url: "/employer/profile",
        icon: Settings,
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
      className="w-68 bg-white border-r border-white"
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
