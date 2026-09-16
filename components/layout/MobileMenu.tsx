"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { siteConfig } from "@/lib/data/site";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  inverted?: boolean;
};

export function MobileMenu({ inverted = false }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleClose = () => setOpen(false);

  const menuPanel =
    mounted && open
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={handleClose}
              className="absolute inset-0 bg-[#071A2F]/60"
            />

            <aside className="relative z-10 flex h-full w-full flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E5E9F0] px-5 py-4">
                <HeaderBrand compact />
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-[#E5E9F0] text-[#101828] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2"
                  aria-label="Закрыть меню"
                >
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                <nav className="space-y-1" aria-label="Мобильное меню">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center justify-between rounded-[8px] px-4 py-3 text-[18px] font-medium text-[#101828] transition hover:bg-[rgba(30,136,229,0.08)] hover:text-[#1E88E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="size-5 shrink-0 text-[#475467]" />
                    </Link>
                  ))}
                </nav>

                <hr className="my-8 border-[#E5E9F0]" />

                <div className="rounded-[12px] border border-[#E5E9F0] p-4">
                  <p className="text-[12px] text-[#475467]">Звонок бесплатный</p>
                  <a
                    href={siteConfig.contacts.phoneLink}
                    className="mt-1 inline-flex items-center gap-2 break-all text-[22px] font-bold text-[#101828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2 sm:text-[24px]"
                  >
                    <Phone className="size-5 shrink-0 text-[#1E88E5]" />
                    {siteConfig.contacts.phone}
                  </a>
                </div>
              </div>

              <div className="border-t border-[#E5E9F0] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-[8px] bg-[#1E88E5] px-7 py-[14px] text-[15px] font-semibold text-white transition hover:bg-[#42A5F5] hover:shadow-[0_0_0_4px_rgba(30,136,229,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2"
                >
                  Заказать звонок
                </button>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
          inverted
            ? "border border-white/30 text-white hover:bg-white/10"
            : "border border-[#E5E9F0] text-[#101828] hover:bg-slate-50"
        )}
      >
        {open ? <X /> : <Menu />}
      </button>

      {menuPanel}
    </div>
  );
}
