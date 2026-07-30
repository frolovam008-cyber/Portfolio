import { createIcon } from "@/ui/createIcon";
import "@/ui/Logo/Logo.scss"

export const LogoIcon = createIcon({
  viewBox: "0 0 200 200",
  content: (
    <>
      <rect width="200" height="200" rx="44"  fill="var(--logo-bg)" />

      <defs>
        <linearGradient id="frame1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        <linearGradient id="frame2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>

        <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* rotating layers */}
      <g className="logo-system">
        <path
          d="M100 20 L175 100 L100 180 L25 100 Z"
          stroke="url(#frame1)"
          strokeWidth="6"
          fill="none"
          filter="url(#glow)"
        />
      </g>

      <g className="logo-system-reverse">
        <path
          d="M110 30 L185 110 L110 190 L35 110 Z"
          stroke="url(#frame2)"
          strokeWidth="6"
          fill="none"
          filter="url(#glow)"
        />
      </g>

      <path
        d="M50 150V60 L85 125 L120 60 L150 150"
        stroke="url(#g1)"
        strokeWidth="14"
        fill="none"
      />

      <path
        d="M115 150V60 H165 M115 110H155"
        stroke="url(#g2)"
        strokeWidth="14"
        fill="none"
      />
    </>
  ),
});