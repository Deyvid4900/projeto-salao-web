import React from "react"
import "../../App"

function BG() {

  return (
    <>
    <div
        className="enfeite"
        style={{ left: "calc(100% - 400px)", zIndex: 0 }}
      ></div>
      <div
        className="enfeite"
        style={{ top: "calc(100% - 400px)", left: 40 }}
      ></div>
    </>
  )
}

export default BG
