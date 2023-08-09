"use client";


import Link from "next/link";
import { FaBars } from 'react-icons/fa';
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";


import {cn} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdUpgrade } from 'react-icons/md';
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";

const font = Poppins({
    weight:"600",
    subsets: ["latin"]
});

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar />
                <Link href="/">
                    <h1 className={cn(
                        "hidden md:block text-xl md:text-3xl font-bold text-primary",
                        font.className
                        )}>
                        companion.ai
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
            <Button variant={"premium"}  size="sm">
             Upgrade
            <MdUpgrade className="h-4 w-4 fill-white text-white ml-2" />
            </Button>
            <ModeToggle />
            <UserButton />

            </div>
        </div>
    );
};