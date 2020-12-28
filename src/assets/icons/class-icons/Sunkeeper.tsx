import * as React from 'react'

function SvgSunkeeper(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      {...props}
    >
      <path
        className="sunkeeper_svg__cls-1"
        d="M320.39 232.26L400 200l-79.61-32.26L373.2 100l-85.07 11.87L300 26.8l-67.74 52.81L200 0l-32.26 79.61L100 26.8l11.87 85.07L26.8 100l52.81 67.74L0 200l79.61 32.26L26.8 300l85.07-11.87L100 373.2l67.74-52.81L200 400l32.26-79.61L300 373.2l-11.87-85.07L373.2 300zM200 298.88A98.88 98.88 0 11298.88 200 98.88 98.88 0 01200 298.88"
      />
      <path
        className="sunkeeper_svg__cls-1"
        d="M262.15 200A62.15 62.15 0 11200 137.85 62.14 62.14 0 01262.15 200"
      />
    </svg>
  )
}

export default SvgSunkeeper
