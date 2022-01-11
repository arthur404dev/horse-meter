import React from "react"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Navbar />
      <main className={`pt-20`}>{children}</main>
    </>
  )
}

export default Layout
