"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const darkFieldClass =
  "border-white/[0.08] bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#42A5F5]/40 focus-visible:ring-[#42A5F5]/12";

type ContactFormMockProps = {
  variant?: "default" | "dark";
};

export function ContactFormMock({ variant = "default" }: ContactFormMockProps) {
  const isDark = variant === "dark";

  return (
    <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="contact-name" className={isDark ? "text-white/80" : undefined}>
          Имя
        </Label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Как к вам обращаться"
          className={isDark ? darkFieldClass : undefined}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone" className={isDark ? "text-white/80" : undefined}>
          Телефон
        </Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          className={isDark ? darkFieldClass : undefined}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message" className={isDark ? "text-white/80" : undefined}>
          Сообщение
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Опишите задачу или объект"
          rows={4}
          className={isDark ? darkFieldClass : undefined}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-[8px] bg-[#1E88E5] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#42A5F5]"
      >
        Отправить заявку
      </button>
      <p className={cn("text-xs", isDark ? "text-white/45" : "text-[#475467]")}>
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a
          href="/privacy"
          className={cn(
            "hover:underline",
            isDark ? "text-[#64B5F6]" : "text-[#1E88E5]"
          )}
        >
          политикой конфиденциальности
        </a>
        .
      </p>
    </form>
  );
}
