import * as React from 'react'

function SvgBrute(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      {...props}
    >
      <path
        className="brute_svg__cls-1"
        d="M248.34 256.68s7.4 67.46 9 99.68c10.79 2.08 25.34 7.28 26.38 14.56 8.32 3.23 15.2 1.43 17.67 0 3.51-24-9.35-85.24 10.4-110.19s69.64-36.38 82.12-66c11.54-27.52-1.97-87.73 6.02-113.73a1.4 1.4 0 00-2.32-1.39c-27.73 26.52-28.69 77.15-38.05 87.52-14.42 16-72.11 27.42-99.79 57.75-9.39 10.3-11.43 31.76-11.43 31.76M198.63 19.86c-7.75 49-45.42 291.46-38.65 336.5 14.16 2.47 21.83 24.95 40 24.95s25.86-22.48 40-24.95c6.77-45-30.9-287.54-38.65-336.5a1.39 1.39 0 00-2.74 0M151.66 256.68s-7.4 67.46-9 99.68c-10.79 2.08-25.34 7.28-26.38 14.56-8.32 3.23-15.2 1.43-17.67 0-3.51-24 9.35-85.24-10.4-110.19s-69.64-36.38-82.12-66C-5.45 167.21 8.06 107 .07 81a1.4 1.4 0 012.32-1.39c27.73 26.52 28.69 77.15 38.05 87.52 14.42 16 72.11 27.42 99.79 57.75 9.39 10.3 11.43 31.76 11.43 31.76"
      />
    </svg>
  )
}

export default SvgBrute