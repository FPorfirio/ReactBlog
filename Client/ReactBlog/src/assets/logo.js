import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SVGlogo = ({ className }) => {
  const logo = useRef()
  const [viewBox, setViewBox] = useState('')

  useEffect(() => {
    const logoGroup = logo.current.getBBox()
    setViewBox(
      `${logoGroup.x} ${logoGroup.y} ${logoGroup.width} ${logoGroup.height}`
    )
  }, [])

  return (
    <Link to="/">
      <svg
        preserveAspectRatio="xMidYMin meet"
        className={className}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#374151" />
            <stop offset="80%" stopColor="#374151" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <g ref={logo}>
          <title>Layer 1</title>
          <text
            fill="#b1c9f0"
            strokeWidth="0"
            x="343.26568"
            y="76.16871"
            id="svg_1"
            fontSize="24"
            fontFamily="Red Hat Display"
            filter="drop-shadow(-2px 4px 1px black)"
            textAnchor="start"
            xmlSpace="preserve"
            fontWeight="bolder"
            fontStyle="normal"
            stroke="#000"
            transform="matrix(1.37577 0 0 1.55724 -368.007 -63.9717)"
          >
            RatCode
          </text>
          <path
            filter="drop-shadow(0px 3px 1px black)"
            id="svg_14"
            d="m229.41398,38.77907c0,0 -1.26863,-1.78683 0.50744,-2.56371c1.77608,-0.77686 7.61173,-7.80761 12.17874,-7.92415c0,0 0.25372,-6.99189 3.55213,-5.82658c3.29843,1.16533 1.77608,2.09757 1.77608,2.09757c0,0 5.58193,-6.05963 7.10428,0.69919c0,0 1.52233,1.74798 7.35798,-3.26287c5.83565,-5.01086 25.86549,-6.20182 35.52137,3.02983c6.21622,5.94312 14.84283,14.79953 8.11914,22.84021c0,0 3.89217,17.66242 -28.62949,15.01005c0,0 -12.60066,-2.19158 -19.0706,-1.95851c-6.46997,0.23305 -11.79817,2.2141 -8.62661,-0.46614c3.17153,-2.68022 11.6713,-2.68022 23.08888,-0.69919c11.41758,1.98106 29.68569,1.63145 29.68569,-10.25479c0,0 -2.79096,0.93226 -4.05957,0.23307c0,0 0.63429,2.56368 -3.04469,2.33064c-3.679,-0.23307 -7.10428,-1.28184 -10.91014,0.23305c0,0 -1.14176,0.69921 -1.52236,0c0,0 -1.90293,0 -1.26861,-0.69919c0,0 -1.07832,-0.40786 0,-1.16531c1.07832,-0.75744 8.62661,-0.64093 8.37289,-0.69919c-0.25372,-0.05826 0.12685,-0.75744 -0.50744,-0.69919c-0.63432,0.05826 -19.4099,1.10705 -24.35751,-0.23307c0,0 -0.25372,1.57319 -1.26861,0.93226c0,0 -9.38781,0.87398 -11.41758,1.8645c-2.0298,0.99054 -1.33207,0.23307 -2.0298,0.46614c-0.69775,0.23305 -1.45892,1.3401 -2.28352,0.69919c0,0 -2.79096,0.64091 -2.0298,-0.46614c0,0 -0.88801,0.29135 -1.26861,-0.46612c0,0 -1.2052,-0.34958 0.50744,-1.63145c1.71264,-1.28184 8.62661,-1.22356 9.13406,-1.8645c0.50747,-0.64093 0.31716,-1.10705 -1.26861,-0.93226c-1.58577,0.17479 -4.82076,-0.34958 -7.35801,-1.8645c-2.53724,-1.51491 -1.71617,-2.26821 -7.10426,-2.79678c-4.35559,-0.42727 -5.24362,-1.00993 -6.34309,-1.39838c-1.0995,-0.38843 -2.53724,-2.56368 -2.53724,-2.56368z"
            strokeWidth="unset"
            stroke="#000"
            fill="#b1c9f0"
          />
        </g>
      </svg>
    </Link>
  )
}
//#5696fe
export default SVGlogo
