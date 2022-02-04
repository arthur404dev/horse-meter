import { gql } from "graphql-request"
import { GetStaticProps } from "next"
import { EventCard } from "../components"
import { graphCMSClient } from "../services"
import Link from "next/link"

export default function Home({ events }: { events: Array<IEvent> }) {
  return (
    <div className='w-full h-full'>
      <section className='w-11/12 h-full m-auto'>
        <div className='w-full h-40 mt-8 py-3 rounded-2xl text-white font-bold text-4xl bg-green-fern/90 hover:bg-green-fern'>
          <Link passHref href={"/signup"}>
            <a className='w-full h-full flex items-center justify-center'>
              Cadastrar
            </a>
          </Link>
        </div>
        <h1 className='font-bold text-xl pt-4'>Eventos</h1>
        <div className='flex justify-center items-center flex-col'>
          {events.map((event) => (
            <EventCard payload={event} />
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
  categorias: Array<ICategory>
}

export interface ICategory {
  nome: string
  premiacao: number
  id: string
  competidores: Array<ICompetitor>
}

export interface ICompetitor {
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
