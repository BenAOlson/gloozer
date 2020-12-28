import * as React from 'react'

function SvgNightshroud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      {...props}
    >
      <path
        className="nightshroud_svg__cls-1"
        d="M243.89 200A121.95 121.95 0 11122 78.05 121.94 121.94 0 01243.89 200"
      />
      <path
        className="nightshroud_svg__cls-1"
        d="M204.88 4.88A194.35 194.35 0 0075.94 53.62a165.86 165.86 0 110 292.76 194.35 194.35 0 00128.94 48.74C312.64 395.12 400 307.76 400 200S312.64 4.88 204.88 4.88"
      />
    </svg>
  )
}

export default SvgNightshroud
