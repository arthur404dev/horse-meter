import { gql } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import { graphCMSClient } from "../../services"
import { IEvent } from "../index"

export default function Events({ event }: { event: IEvent }) {
  return (
    <div className='w-screen h-screen bg-black opacity-95'>
      <img
        className='object-cover h-screen w-screen fixed -z-10'
        src={event.banner.url}
      />
      <div className='flex flex-col items-center justify-center h-full w-3/4 m-auto p-24 opacity-95'>
        <h1 className='text-6xl font-bold text-white'>{event.nome}</h1>
        <div className='flex flex-col items-center justify-center'>
          <div className='bg-gray-400 w-4/5 text-white my-8 rounded-xl flex flex-col items-center justify-center p-4'>
            <p className='text-2xl'>{event.local.nome}</p>
            <p>
              {event.local.cidade} - {event.local.estado}
            </p>
            <p>{event.local.endereco}</p>
          </div>
        </div>
        <div className='w-full h-full'>
          {event.categorias.map((categoria) => (
            <div
              key={categoria.id}
              className='w-3/4 m-auto my-12 bg-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center'
            >
              <div>
                <h1 className='uppercase text-4xl font-bold'>
                  {categoria.nome}
                </h1>
                <h2>Premiação: R$ {categoria.premiacao}</h2>
              </div>
              <h1 className='font-bold my-4'>Competidores:</h1>
              <div className='flex'>
                {categoria.competidores.map((competidor) => (
                  <div key={competidor.animal.id} className='mx-2'>
                    <img
                      src={competidor.animal.foto.url}
                      className='rounded-full object-cover h-16 w-16'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
