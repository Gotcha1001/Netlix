"use client";
import { useProfileContext } from "@/context/profileContext";
import useFetchProfiles from "@/hooks/profile/useFetchProfiles";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Series", href: "/series" },
  { label: "Films", href: "/movies" },
  { label: "New & Popular", href: "/new-popular" },
  { label: "My List", href: "/my-list" },
];

function Header() {
  const pathname = usePathname();
  const { activeProfile, setActiveProfile, activeProfileId } =
    useProfileContext();

  const { data: profiles = [] } = useFetchProfiles();

  useEffect(() => {
    if (profiles.length === 0) return;
    if (activeProfile) return;

    const stored = profiles.find((p) => p.id === activeProfileId);
    setActiveProfile(stored ?? profiles[0]);
  }, [profiles, activeProfile, activeProfileId, setActiveProfile]);

  return (
    <header className="sticky w-full min-h-17.5 px-4 sm:px-14 top-0 z-50 flex items-center justify-between bg-linear-to-b from-black to-transparent">
      <div className="flex items-center gap-6">
        <Link href={"/"} className="text-2xl font-bold text-red-600">
          <Image
            src={"/logo--netflix.png"}
            alt="Header image"
            width={100}
            height={64}
            className="w-20 md:w-25"
          />
        </Link>
        <ul className="hidden md:flex space-x-4">
          {menuItems.map((li) => {
            return (
              <li key={li.label}>
                <Link
                  href={li.href}
                  className={`text-s, ${pathname === li.href ? "text-white font-semibold" : "text-white/70 transition-colors hover:text-white/90"}`}
                >
                  {li.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div></div>
    </header>
  );
}

export default Header;
