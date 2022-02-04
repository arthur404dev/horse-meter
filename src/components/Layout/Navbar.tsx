import { FaRegUserCircle } from "react-icons/fa"
import { GiHorseHead } from "react-icons/gi"
import { environment } from "../../config"

interface NavBarProps {
  navBarH: string
}

const Navbar = ({ navBarH }: NavBarProps) => {
  return (
    <div className={`w-screen ${navBarH} fixed bg-blue-zodiac z-50`}>
      <nav className='w-11/12 h-full m-auto flex justify-center items-center text-gold-serria'>
        <div className='w-full flex items-center justify-center font-bold text-2xl'>
          <h1 className='pr-2'>{environment.app.name}</h1>
          <GiHorseHead />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
