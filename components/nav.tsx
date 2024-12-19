"use client";

import {
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around h-full">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center rounded-lg px-3 hover:bg-slate-100 hover:text-slate-900 ${
          pathname === "/" ? "bg-slate-100 text-slate-900" : "text-slate-700"
        }`}
      >
        <CalendarIcon className="size-6" />
        <span className="text-xs">Schedule</span>
      </Link>
      <Link
        href="/conference"
        className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900 ${
          pathname === "/conference"
            ? "bg-slate-100 text-slate-900"
            : "text-slate-700"
        }`}
      >
        <TrophyIcon className="size-6" />
        <span className="text-xs">Conference</span>
      </Link>
      <Link
        href="/statistics"
        className={`flex flex-col items-center rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900 ${
          pathname === "/statistics"
            ? "bg-slate-100 text-slate-900"
            : "text-slate-700"
        }`}
      >
        <ChartBarIcon className="size-6" />
        <span className="text-xs">Statistics</span>
      </Link>
      <Link
        href="/roster"
        className={`flex flex-col items-center rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900 ${
          pathname === "/roster"
            ? "bg-slate-100 text-slate-900"
            : "text-slate-700"
        }`}
      >
        <UserGroupIcon className="size-6" />
        <span className="text-xs">Roster</span>
      </Link>
    </nav>
  );
}
