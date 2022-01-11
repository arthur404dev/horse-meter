import { gql } from "graphql-request"
import moment from "moment"
import "moment/locale/pt-br"
import { GetStaticProps } from "next"
import Link from "next/link"
import { graphCMSClient } from "../services"

export default function Home({ events }: { events: Array<IEvent> }) {
  return (
    <div className='w-screen h-screen bg-gray-700'>
      <main className='w-3/4 h-full flex justify-center items-center flex-col m-auto'>
        {events.map(({ banner, inicio, nome, local, id, slug }) => (
          <div
            key={id}
            className='cursor-pointer w-5/6 bg-gray-200 rounded-3xl my-4 p-8 border-gray-800 border-4 hover:bg-gray-400'
          >
            <Link href={slug}>
              <div className='flex'>
                <div className='w-1/3'>
                  <img
                    src={banner.url}
                    className='object-cover h-96 w-96 rounded-3xl border-gray-700 border-4'
                  />
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <h1 className='text-6xl font-bold'>{nome}</h1>
                  <div className='bg-gray-700 w-4/5 text-white my-8 rounded-xl flex flex-col items-center justify-center p-4'>
                    <p className='text-2xl'>{local.nome}</p>
                    <p>
                      {local.cidade} - {local.estado}
                    </p>
                    <p>{local.endereco}</p>
                  </div>
                  {moment(inicio).fromNow()}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </main>
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
