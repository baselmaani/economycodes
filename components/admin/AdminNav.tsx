"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Layers,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/pages", label: "Pages & SEO", icon: Layers },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex gap-1 md:flex-col">
      {ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
