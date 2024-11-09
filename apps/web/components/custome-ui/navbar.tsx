"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Code, Menu, X, SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ name: "Home", href: "/" }];

    const currentPage = usePathname();

    console.log(currentPage);
    switch (currentPage) {
      case "/dashboard":
        breadcrumbs.push({ name: "Dashboard", href: "/dashboard" });
        break;
      case "project":
        breadcrumbs.push(
          { name: "Dashboard", href: "/dashboard" },
          { name: "Project", href: "/project" }
        );
        break;
      case "ide":
        breadcrumbs.push(
          { name: "Dashboard", href: "/dashboard" },
          { name: "Project", href: "/project" },
          { name: "IDE", href: "/ide" }
        );
        break;
      case "/pricing":
        breadcrumbs.push({ name: "Pricing", href: "/pricing" });
        break;
      case "auth":
        breadcrumbs.push({ name: "Login", href: "/auth" });
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className=" border-b border-[#2e2e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Code className="h-6 w-6 mr-2" />
            </Link>
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={breadcrumb.href}
                        className="text-gray-300 hover:text-white"
                      >
                        {breadcrumb.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator>
                        <SlashIcon />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="hidden md:flex items-center space-x-4 ">
            <Link
              href="/dashboard"
              className=" py-2 px-1 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className=" py-2 px-1 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Pricing
            </Link>

            <UserButton />
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Pricing
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Settings
            </Link>
            <Button
              variant="ghost"
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={breadcrumb.href}
                    className="text-gray-300 hover:text-white"
                  >
                    {breadcrumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
    </nav>
  );
}
