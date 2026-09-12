import { useEffect, useState } from "react";
import { CABINET } from "../content";
import { useLang, useScrollProgress, useScrollSpy } from "../context";
import { cn } from "../utils/cn";
import {
  ArrowUp,
  ClockIcon,
  CloseIcon,
  FacebookIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "./icons";
import { Btn, Reveal } from "./ui";

const SECTION_IDS = ["accueil", "cabinet", "domaines", "methode", "parcours", "avis", "faq", "contact"];

function Wordmark({ dark = true }: { dark?: boolean }) {
  const { t } = useLang();
  return (
    <a href="#accueil" className="group flex items-center gap-3">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center border",
          dark ? "border-navy-900/20 bg-navy-900 text-white" : "border-white/25 bg-white/10 text-white"
        )}
      >
        <span className="font-display text-[0.82rem] tracking-wide">BM</span>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[1.02rem] tracking-[0.02em]",
            dark ? "text-navy-900" : "text-white"
          )}
        >
          Brahim Majdoub
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.56rem] uppercase tracking-[0.26em]",
            dark ? "text-navy-500" : "text-white/55"
          )}
        >
          {t.hero.portraitRole}
        </span>
      </span>
    </a>
  );
}

function LangSwitch({ dark = true }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-3">
      {(["fr", "en", "ar"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={cn(
            "text-[0.66rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200",
            lang === code
              ? dark
                ? "text-brass-600 underline decoration-brass-500 decoration-1 underline-offset-4"
                : "text-brass-300 underline decoration-brass-400 decoration-1 underline-offset-4"
              : dark
                ? "text-navy-500 hover:text-navy-900"
                : "text-white/45 hover:text-white"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS, 0.28);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { id: "cabinet", label: t.nav.about },
    { id: "domaines", label: t.nav.expertise },
    { id: "methode", label: t.nav.method },
    { id: "parcours", label: t.nav.career },
    { id: "avis", label: t.nav.testimonies },
    { id: "faq", label: t.nav.faq },
  ];

  return (
    <>
      {/* utility bar */}
      <div className="hidden bg-navy-950 text-white/70 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5">
          <p className="label text-white/55">{t.utility}</p>
          <div className="flex items-center gap-7">
            <a href={`tel:${CABINET.phone}`} className="flex items-center gap-2 text-[0.74rem] hover:text-white">
              <PhoneIcon className="h-3.5 w-3.5" /> {CABINET.phoneDisplay}
            </a>
            <a href={`mailto:${CABINET.email}`} className="flex items-center gap-2 text-[0.74rem] hover:text-white">
              <MailIcon className="h-3.5 w-3.5" /> {CABINET.email}
            </a>
            <a
              href={CABINET.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[0.74rem] hover:text-white"
            >
              <FacebookIcon className="h-3.5 w-3.5" /> Facebook
            </a>
            <LangSwitch dark={false} />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white/95 backdrop-blur-sm">
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-brass-500/90 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 transition-all duration-300 sm:px-8",
            scrolled ? "py-3" : "py-4 lg:py-5"
          )}
        >
          <Wordmark />

          <nav className="hidden items-center gap-8 xl:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "label border-b pb-1 transition-colors duration-200",
                  active === l.id
                    ? "border-brass-500 text-navy-900"
                    : "border-transparent text-navy-500 hover:border-navy-900/25 hover:text-navy-900"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${CABINET.phone}`}
              className="flex items-center gap-2 text-[0.76rem] font-medium text-navy-800 hover:text-brass-600 xl:hidden"
            >
              <PhoneIcon className="h-4 w-4" /> {t.nav.call}
            </a>
            <Btn href="#contact">{t.nav.book}</Btn>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center border border-navy-900/20 text-navy-900 lg:hidden"
            aria-label="Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-70 bg-white transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Wordmark />
            <button
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center border border-navy-900/20 text-navy-900"
              aria-label="Fermer"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col border-t border-navy-900/10">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="border-b border-navy-900/10 py-4 font-display text-xl text-navy-900"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="border-b border-navy-900/10 py-4 font-display text-xl text-brass-600"
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="mt-8 space-y-4 text-[0.85rem] text-navy-700">
            <a href={`tel:${CABINET.phone}`} className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 text-brass-600" /> {CABINET.phoneDisplay}
            </a>
            <a href={`mailto:${CABINET.email}`} className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 text-brass-600" /> {CABINET.email}
            </a>
            <p className="flex items-start gap-3">
              <PinIcon className="mt-3 h-4 w-4 shrink-0 text-brass-600" /> {t.contact.address}
            </p>
          </div>

          <div className="mt-auto space-y-6 pt-10">
            <LangSwitch />
            <Btn href="#contact" className="w-full" onClick={() => setOpen(false)}>
              {t.nav.book}
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}

export function FloatingActions() {
  const { t } = useLang();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "grid h-11 w-11 place-items-center border border-navy-900/15 bg-white/95 text-navy-800 shadow-sm backdrop-blur transition-colors duration-300 hover:border-navy-900 hover:bg-navy-900 hover:text-white";

  return (
    <div className="fixed bottom-5 z-40 flex flex-col gap-2 ltr:right-4 rtl:left-4 sm:bottom-6 ltr:sm:right-6 rtl:sm:left-6">
      <a
        href={`https://wa.me/${CABINET.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className={base}
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppIcon className="h-4 w-4" />
      </a>
      <a href={`tel:${CABINET.phone}`} className={base} aria-label={t.nav.call} title={t.nav.call}>
        <PhoneIcon className="h-4 w-4" />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(base, showTop ? "opacity-100" : "pointer-events-none opacity-0")}
        aria-label={t.footer.top}
        title={t.footer.top}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const nav = [
    { id: "cabinet", label: t.nav.about },
    { id: "domaines", label: t.nav.expertise },
    { id: "methode", label: t.nav.method },
    { id: "parcours", label: t.nav.career },
    { id: "avis", label: t.nav.testimonies },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Wordmark dark={false} />
            <p className="mt-6 max-w-xs text-[0.86rem] leading-relaxed text-white/60">{t.footer.tagline}</p>
            <div className="mt-7 flex gap-3">
              <a
                href={CABINET.facebook}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-white/20 text-white/80 transition-colors hover:border-brass-400 hover:text-brass-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${CABINET.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-white/20 text-white/80 transition-colors hover:border-brass-400 hover:text-brass-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CABINET.email}`}
                className="grid h-9 w-9 place-items-center border border-white/20 text-white/80 transition-colors hover:border-brass-400 hover:text-brass-300"
                aria-label="E-mail"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="label text-brass-300">{t.footer.navTitle}</h4>
            <ul className="mt-6 space-y-3 text-[0.86rem] text-white/65">
              {nav.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="link-underline hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label text-brass-300">{t.footer.expertiseTitle}</h4>
            <ul className="mt-6 space-y-3 text-[0.86rem] text-white/65">
              {t.expertise.items.map((e) => (
                <li key={e.title}>
                  <a href="#domaines" className="link-underline hover:text-white">
                    {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label text-brass-300">{t.contact.cabinet}</h4>
            <ul className="mt-6 space-y-4 text-[0.86rem] text-white/65">
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                <span>{t.contact.address}</span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                <span>
                  {CABINET.phoneDisplay}
                  <span className="block text-white/45">{CABINET.landlineDisplay}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                <span>
                  {t.contact.hours.map((h) => (
                    <span key={h.d} className="block">
                      {h.d} — {h.h}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <Reveal className="flex flex-col gap-4 text-[0.72rem] leading-relaxed text-white/45 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-3xl">
              {t.footer.legal1} {t.footer.legal2}
            </p>
            <p className="whitespace-nowrap">
              © {year} Cabinet {CABINET.lawyer} — {t.footer.rights}
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
