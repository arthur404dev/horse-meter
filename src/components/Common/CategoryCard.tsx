import Link from "next/link"
import { ICategory } from "../../pages"

const CategoryCard = ({ payload }: { payload: ICategory }) => {
  const { id, nome, premiacao, competidores } = payload
  return (
    <div
      key={id}
      className={`relative overflow-hidden cursor-pointer h-40 w-full even:bg-gray-600 odd:bg-gray-400  text-gray-300 rounded-3xl my-4 p-2 hover:bg-gray-900 hover:text-gray-100`}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-black via-black to-transparent opacity-40'></div>
      <Link href={id}>
        <div className='relative w-full h-full '>
          <div className='h-1/5 flex items-center '>
            <span className='text-xl pr-1 font-bold uppercase h-full'>R$</span>
            <span className='text-2xl font-bold uppercase'>{premiacao}</span>
          </div>
          <div className='h-4/5 w-full flex flex-col items-center justify-center'>
            <h1 className='text-xl font-bold'>{nome}</h1>
            <div className='flex mt-4'>
              {competidores.map((competidor) => (
                <img
                  className='rounded-full h-8 w-8 object-cover mr-1'
                  src={competidor.animal.foto.url}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard
