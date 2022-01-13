import Link from "next/link"
import moment from "moment"
import "moment/locale/pt-br"
import { IEvent } from "../../pages"

const EventCard = ({ payload }: { payload: IEvent }) => {
  const { banner, inicio, nome, id, slug } = payload
  return (
    <div
      key={id}
      className='relative overflow-hidden cursor-pointer h-40 w-full bg-gray-500 text-gray-300 rounded-3xl my-4 p-2 hover:bg-gray-800 hover:text-gray-100'
    >
      <img
        className='object-cover w-full h-full absolute inset-0 opacity-30'
        src={banner.url}
        alt={nome}
      />
      <div className='absolute inset-0 bg-gradient-to-br from-black via-black to-transparent opacity-30'></div>
      <Link href={slug}>
        <div className='relative w-full h-full '>
          <div className='h-1/5 flex items-center '>
            <span className='text-3xl pr-1 font-bold uppercase h-full'>
              {moment(inicio).format("DD")}
            </span>
            <span className='text-sm font-bold uppercase'>
              {moment(inicio).format("MMM")}
            </span>
          </div>
          <div className='h-4/5 w-full flex items-center justify-center'>
            <h1 className='text-xl font-bold'>{nome}</h1>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EventCard
