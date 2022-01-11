import { gql } from "graphql-request"
import moment from "moment"
import "moment/locale/pt-br"
import { GetStaticProps } from "next"
import Link from "next/link"
import { graphCMSClient } from "../services"

export default function Home({ events }: { events: Array<IEvent> }) {
  return (
    <div className='w-full h-full bg-gray-100'>
      <section className='w-11/12 h-full m-auto'>
        <h1 className='font-bold text-xl pt-4'>Eventos</h1>
        <div className='flex justify-center items-center flex-col'>
          {events.map(({ banner, inicio, nome, local, id, slug }) => (
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
          ))}
        </div>
      </section>
    </div>
  )
}

export interface IEvent {
  inicio: Date
  banner: { url: string; width: string; height: string }
  nome: string
  local: {
    cep: number
    cidade: string
    endereco: string
    estado: string
    nome: string
    localizacao: { latitude: string; longitude: string }
  }
  slug: string
  id: string
  categorias: Array<{
    nome: string
    premiacao: number
    id: string
    competidores: Array<{
      animal: {
        foto: {
          url: string
        }
        id: string
        mae: string
        nome: string
        pai: string
        raca: string
        sexo: string
      }
      colete: number
      criador: {
        cidade: string
        contato: string
        estado: string
        nome: string
      }
      expositor: {
        cidade: string
        contato: string
        estado: string
        nome: string
      }
    }>
  }>
}

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    query IndexQuery {
      eventos {
        slug
        id
        inicio
        banner {
          url
          width
          height
        }
        nome
        local {
          cep
          cidade
          endereco
          estado
          nome
          localizacao {
            latitude
            longitude
          }
        }
      }
    }
  `
  const data: { eventos: Array<IEvent> | null } = await graphCMSClient.request(
    query,
  )

  if (!data.eventos) {
    return {
      notFound: true,
    }
  }

  return {
    props: { events: data.eventos },
    revalidate: 60 * 60,
  }
}
