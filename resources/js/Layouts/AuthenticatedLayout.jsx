import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const currentPath = window.location.pathname;

    const items = [
        { title: "Dashboard", url: "/admin/dashboard" },
        { title: "User", url: "/user" },
        { title: "Institute", url: "/about" },
        { title: "Organization", url: "/organization" },
        { title: "Event", url: "/event" },
        { title: "Receipt", url: "/receipt" },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-emerald-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href="/">
                            <img
                                src="/images/logo.svg"
                                alt="Ims"
                                className="h-16 w-16 rounded-full border-2 border-emerald-700"
                            />
                        </a>
                        <h1 className="text-2xl font-semibold text-emerald-800">
                            ARMS
                        </h1>
                    </div>
                    <div className="lg:block hidden">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {items.map((item) => (
                                    <NavigationMenuItem key={item.url}>
                                        <Link href={item.url} legacyBehavior>
                                            <NavigationMenuLink
                                                className={`${
                                                    currentPath === item.url
                                                        ? "bg-emerald-600 text-white"
                                                        : ""
                                                } ${navigationMenuTriggerStyle()}`}
                                            >
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                                {/* Profile Dropdown */}
                                <NavigationMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar className="h-12 w-12 rounded-full border-2 border-emerald-700">
                                                <AvatarImage
                                                    alt={user.firstname}
                                                />
                                                <AvatarFallback>
                                                    {user.firstname[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                Notification
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link
                                                    method="post"
                                                    href={route("logout")}
                                                    as="button"
                                                >
                                                    Log Out
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <Sheet>
                        <SheetTrigger className="lg:hidden">
                            <Menu />
                        </SheetTrigger>
                        <SheetContent className="bg-emerald-200 w-[400px] sm:w-[540px]">
                            <div className="w-full">
                                <NavigationMenu>
                                    <NavigationMenuList className="flex flex-col items-start gap-2">
                                        {items.map((item) => (
                                            <NavigationMenuItem key={item.url}>
                                                <Link
                                                    href={item.url}
                                                    legacyBehavior
                                                >
                                                    <NavigationMenuLink
                                                        className={`${
                                                            currentPath ===
                                                            item.url
                                                                ? " bg-emerald-600 text-white"
                                                                : ""
                                                        } ${navigationMenuTriggerStyle()}`}
                                                    >
                                                        {item.title}
                                                    </NavigationMenuLink>
                                                </Link>
                                            </NavigationMenuItem>
                                        ))}
                                        <NavigationMenuItem>
                                            <Link
                                                method="post"
                                                href={route("logout")}
                                                as="button"
                                            >
                                                <NavigationMenuLink
                                                    className={
                                                        navigationMenuTriggerStyle() +
                                                        " bg-red-400 hover:bg-red-300"
                                                    }
                                                >
                                                    Log Out
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}
