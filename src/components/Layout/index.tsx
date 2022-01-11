import React from "react"
import Navbar, { navBarHeight } from "./Navbar"

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Navbar />
      <main className={`pt-${navBarHeight}`}>{children}</main>
    </>
  )
}

export default Layout
