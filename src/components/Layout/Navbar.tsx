import { FaRegUserCircle } from "react-icons/fa"
import { GiHorseHead } from "react-icons/gi"
export const navBarHeight: number = 20

const Navbar = () => {
  return (
    <div className={`w-screen h-${navBarHeight} fixed bg-white`}>
      <nav className='w-11/12 h-full m-auto flex justify-between items-center text-gray-700'>
        <div className='w-4/5 flex items-center font-bold text-2xl'>
          <h1 className='pr-2'>HorseMeter</h1>
          <GiHorseHead />
        </div>
        <FaRegUserCircle className='text-3xl' />
      </nav>
    </div>
  )
}

export default Navbar
