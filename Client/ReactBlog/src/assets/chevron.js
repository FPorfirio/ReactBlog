import React, { useRef, useEffect, useState } from 'react'

const SVGlogo = ({ height, className }) => {
  const logo = useRef()
  const [viewBox, setViewBox] = useState('')

  useEffect(() => {
    const logoGroup = logo.current.getBBox()
    setViewBox(
      `${logoGroup.x} ${logoGroup.y} ${logoGroup.width} ${logoGroup.height}`
    )
  }, [])

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      fill="none"
      viewBox={viewBox}
      stroke="currentColor"
    >
      <path
        ref={logo}
        stroke="#fb6c1e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

export default SVGlogo
