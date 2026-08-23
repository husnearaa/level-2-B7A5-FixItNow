"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      {
        label: "Plumbing",
        href: "/services?category=plumbing",
      },
      {
        label: "Electrical",
        href: "/services?category=electrical",
      },
      {
        label: "Cleaning",
        href: "/services?category=cleaning",
      },
      {
        label: "Painting",
        href: "/services?category=painting",
      },
      {
        label: "All Services",
        href: "/services",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Services",
        href: "/services",
      },
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "How It Works",
        href: "/#how-it-works",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
  {
    title: "For Professionals",
    links: [
      {
        label: "Become a Technician",
        href: "/register?role=technician",
      },
      {
        label: "Technician Login",
        href: "/login",
      },
      {
        label: "Manage Availability",
        href: "/technician/availability",
      },
      {
        label: "Manage Bookings",
        href: "/technician/bookings",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#00224A] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        {/* Main Footer */}
        <div
          className="
            grid
            gap-10
            py-14
            sm:py-16
            lg:grid-cols-[1.4fr_1fr_1fr_1fr]
            lg:gap-10
            lg:py-20
          "
        >
          {/* Brand */}
          <div className="max-w-[340px]">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#EC620B]
                  text-lg
                  font-bold
                  text-white
                "
              >
                F
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Fix<span className="text-[#EC620B]">It</span>Now
              </span>
            </Link>

            {/* Description */}
            <p className="mt-5 text-sm leading-7 text-white/60">
              Your trusted home service platform. Find qualified
              professionals, book reliable services, and take care of your
              home with confidence.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/65">
                <Mail
                  size={17}
                  className="shrink-0 text-[#EC620B]"
                />
                <span>support@fixitnow.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/65">
                <Phone
                  size={17}
                  className="shrink-0 text-[#EC620B]"
                />
                <span>+880 1XXX-XXXXXX</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/65">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#EC620B]"
                />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#EC620B]
                  hover:bg-[#EC620B]
                  hover:text-white
                "
              >
                <Facebook size={16} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#EC620B]
                  hover:bg-[#EC620B]
                  hover:text-white
                "
              >
                <Instagram size={16} />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#EC620B]
                  hover:bg-[#EC620B]
                  hover:text-white
                "
              >
                <Linkedin size={16} />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#EC620B]
                  hover:bg-[#EC620B]
                  hover:text-white
                "
              >
                <Twitter size={16} />
              </Link>
            </div>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                {column.title}
              </h3>

              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-white/60
                        transition-colors
                        duration-200
                        hover:text-[#EC620B]
                      "
                    >
                      {link.label}

                      <ArrowUpRight
                        size={13}
                        className="
                          opacity-0
                          transition-all
                          duration-200
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:opacity-100
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            py-6
            text-sm
            text-white/45
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;