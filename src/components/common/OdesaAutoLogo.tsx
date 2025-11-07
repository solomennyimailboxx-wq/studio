import * as React from "react"

const OdesaAutoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary) / 0.7)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#logoGradient)"
      d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z M50 15 L85 32.5 L85 67.5 L50 85 L15 67.5 L15 32.5 Z"
    />
    <path
      fill="currentColor"
      d="M35 40 L45 40 L50 30 L55 40 L65 40 L55 60 L60 70 L50 65 L40 70 L45 60 Z"
    />
  </svg>
)

export default OdesaAutoLogo
