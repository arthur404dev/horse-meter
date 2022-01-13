import { gql } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import { CategoryCard } from "../../components"
import { graphCMSClient } from "../../services"
import { IEvent } from "../index"

export default function Events({ event }: { event: IEvent }) {
  const { categorias, nome, banner, local } = event
  return (
    <div className='w-full h-full bg-gray-100'>
      <div className='w-full h-full flex flex-col items-center'>
        <div className='w-full relative h-32 bg-gray-800 text-white'>
          <img
            className='object-cover h-full w-full inset-0 absolute opacity-40'
            src={banner.url}
          />
          <div className='h-full w-full flex flex-col items-center justify-center'>
            <h1 className='font-bold text-2xl'>{nome}</h1>
            <h3>
              {local.nome} - {local.cidade}
            </h3>
          </div>
        </div>
        <div className='w-11/12 h-full m-auto'>
          <h1 className='font-bold text-xl pt-4'>Categorias</h1>
          <div className='flex justify-center items-center flex-col'>
            {categorias.map((categoria) => (
              <CategoryCard payload={categoria} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface IEvento {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { eventos } = await graphCMSClient.request(gql`
    {
      eventos {
        slug
      }
    }
  `)
  return {
    paths: eventos.map((evento: IEvento) => ({
      params: { event: evento.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.event as string
  const query = gql`
    query EventQuery($slug: String!) {
      evento(where: { slug: $slug }) {
        id
        slug
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
        categorias {
          nome
          premiacao
          id
          competidores {
            animal {
              foto {
                url
              }
              id
              mae
              nome
              pai
              raca
              sexo
            }
            colete
            criador {
              cidade
              contato
              estado
              nome
            }
            expositor {
              cidade
              contato
              estado
              nome
            }
          }
        }
      }
    }
  `
  const data: { evento: IEvent | null } = await graphCMSClient.request(query, {
    slug,
  })

  if (!data.evento) {
    return {
      notFound: true,
    }
  }

  return {
    props: { event: data.evento },
    revalidate: 60 * 60,
  }
}
