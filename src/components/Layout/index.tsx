import Navbar from "./Navbar"

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Navbar
        navBarH={`h-base
      sm:h-sm
      md:h-md
      lg:h-lg
      xl:h-xl`}
      />
      <main
        className={`pt-base
        sm:pt-sm
        md:pt-md
        lg:pt-lg
        xl:pt-xl`}
      >
        {children}
      </main>
    </>
  )
}

export default Layout
