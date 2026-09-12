import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const ScaleIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3v18M7 21h10M3 8h18M12 3l-9 5 4.5 6L12 8l4.5 6L21 8z" />
  </svg>
);

export const GavelIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 4l6 6-3 3-6-6zM10 8l-7 7 3 3 7-7M4 21h10" />
  </svg>
);

export const BriefcaseIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="7" width="19" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M2.5 12h19" />
  </svg>
);

export const FamilyIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="17" cy="9.5" r="2.3" />
    <path d="M2.5 20c0-3 2.4-5.3 5.5-5.3s5.5 2.3 5.5 5.3M15 20c0-2.2 1-3.9 2.6-3.9 1.6 0 2.9 1.6 2.9 3.9" />
  </svg>
);

export const HomeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 10.5L12 3l9 7.5M5.5 9.5V21h13V9.5M10 21v-6h4v6" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v6c0 4.4-3 7.9-7 9-4-1.1-7-4.6-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const CoinsIcon = (p: P) => (
  <svg {...base(p)}>
    <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
    <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 3.5h3l1.6 4-2 1.4a12 12 0 006.5 6.5l1.4-2 4 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 013 5.7 2 2 0 015 3.5z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3.2 2" />
  </svg>
);

export const UserIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-3.9 3.6-6.5 8-6.5s8 2.6 8 6.5" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

export const ArrowUp = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20V4M6 10l6-6 6 6" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const QuoteIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9.5 5.5C6.4 6.6 4.5 9.4 4.5 12.8V19h6.2v-6.2H7.9c0-2 .9-3.6 2.8-4.6zM19.5 5.5C16.4 6.6 14.5 9.4 14.5 12.8V19h6.2v-6.2h-2.8c0-2 .9-3.6 2.8-4.6z" />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.5 21v-7.6h2.7l.4-3.1h-3.1V8.4c0-.9.3-1.5 1.6-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.2H7.6v3.1h2.7V21z" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a9.9 9.9 0 00-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1012 2zm0 17.9c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3a7.9 7.9 0 1112.9 5.9 7.8 7.8 0 01-6.1 1.8zm4.5-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.4 6.4 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.6-.7c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-.9 1-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.6 2.6 3.9 3.5 2 .8 2.5.7 3 .6.6-.1 1.5-.6 1.7-1.3.2-.7.2-1.2.2-1.3-.1-.2-.2-.2-.5-.4z" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5h17M3.5 14.5h17M12 3c2.5 2.6 3.5 6 3.5 9s-1 6.4-3.5 9c-2.5-2.6-3.5-6-3.5-9s1-6.4 3.5-9z" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
  </svg>
);
