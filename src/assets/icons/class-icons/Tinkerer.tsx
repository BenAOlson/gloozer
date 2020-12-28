import * as React from 'react'

function SvgTinkerer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      {...props}
    >
      <path
        className="tinkerer_svg__cls-1"
        d="M395.89 220.91l-44.7-20.86a150.26 150.26 0 00-3.19-30.79l39.53-29.51c3-2.27 3.61-7.19 1.32-11.43l-25.3-46.87c-2.29-4.25-6.71-6.47-10.28-5.18l-46.33 16.86a149.94 149.94 0 00-24-19.54L290 24.77c.55-3.76-2.53-7.63-7.15-9L231.84.5c-4.62-1.38-9.32.17-10.93 3.61l-20.86 44.7A150.33 150.33 0 00169.26 52l-29.51-39.56c-2.27-3-7.19-3.61-11.44-1.32l-46.86 25.3C77.2 38.71 75 43.13 76.27 46.7l16.86 46.36a149.94 149.94 0 00-19.54 24L24.77 110c-3.76-.55-7.63 2.53-9 7.15L.5 168.16c-1.38 4.62.17 9.32 3.61 10.93L48.81 200A150.33 150.33 0 0052 230.74l-39.56 29.51c-3 2.27-3.61 7.19-1.32 11.43l25.3 46.87c2.29 4.25 6.71 6.47 10.28 5.18l46.36-16.86a150 150 0 0024 19.54L110 375.23c-.55 3.75 2.53 7.63 7.15 9l51 15.26c4.62 1.38 9.32-.17 10.93-3.61L200 351.19a151 151 0 0030.74-3.19l29.51 39.53c2.27 3 7.19 3.61 11.44 1.32l46.86-25.3c4.25-2.29 6.47-6.71 5.18-10.28l-16.86-46.36a149.58 149.58 0 0019.54-24l48.82 7.09c3.76.55 7.63-2.53 9-7.15l15.26-51c1.38-4.62-.17-9.32-3.61-10.93m-74.34 15.42a126.86 126.86 0 11-85.2-157.89 127 127 0 0185.21 157.88"
      />
      <path
        className="tinkerer_svg__cls-1"
        d="M230.66 97.44a107 107 0 1071.9 133.22 107.17 107.17 0 00-71.9-133.22m38 123.08a71.66 71.66 0 11-48.14-89.17 71.65 71.65 0 0148.14 89.17"
      />
    </svg>
  )
}

export default SvgTinkerer
