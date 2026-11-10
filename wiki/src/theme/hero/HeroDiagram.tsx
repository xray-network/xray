import { useId } from "react"

export function HeroDiagram() {
  const id = useId()
  return (
    <svg className="spectre-hero-diagram" viewBox="0 60 320 134" role="img" aria-labelledby={`${id}-title ${id}-description`} focusable="false">
      <title id={`${id}-title`}>Explore the XRAY ecosystem.</title>
      <desc id={`${id}-description`}>Learn about the network, use its products, and build on Cardano.</desc>
      <rect className="spectre-diagram-frame" x="14" y="68" width="292" height="118" rx="8" />

      <g className="spectre-diagram-records">
        <rect x="36" y="84" width="56" height="48" rx="4" />
        <rect x="132" y="84" width="56" height="48" rx="4" />
        <rect x="228" y="84" width="56" height="48" rx="4" />
        <g className="spectre-diagram-icon">
          <path d="M53 99h9c3 0 5 2 5 5v17c0-3-2-5-5-5h-9Zm22 0h-3c-3 0-5 2-5 5v17c0-3 2-5 5-5h3Z" />
          <path d="M147 101h26v17h-26Zm5 22h16m-8-5v5" />
          <path d="m251 101-7 7 7 7m10-14 7 7-7 7m-4-18-4 23" />
        </g>
        <text x="64" y="151">Learn</text>
        <text x="160" y="151">Use</text>
        <text x="256" y="151">Build</text>
      </g>
      <g className="spectre-diagram-arrows">
        <path className="spectre-diagram-dashed" d="M96 108h28M192 108h28" />
        <path d="M120 104L124 108L120 112M216 104L220 108L216 112" />
      </g>
      <g className="spectre-diagram-caption">
        <text x="64" y="169">Understand</text>
        <text x="160" y="169">Explore apps</text>
        <text x="256" y="169">Ship tools</text>
      </g>
    </svg>
  )
}
