import { firebaseClient } from "../services"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { Dialog, Transition } from "@headlessui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { object, string, boolean } from "yup"
import { useState, Fragment } from "react"
import { AiOutlineLoading, AiFillCheckCircle } from "react-icons/ai"

interface IFormInput {
  displayname: string
  email: string
  password: string
  subscribe: boolean
}

const formSchema = object({
  displayname: string()
    .required("É necessário preencher o campo Nome!")
    .matches(/^([^0-9]*)$/, {
      message: "O campo Nome não deve conter números.",
    }),
  email: string()
    .required("É necessário preencher o campo Email!")
    .email("Este e-mail não é válido."),
  password: string()
    .required("É necessário preencher o campo Senha!")
    .min(6, "Sua senha é muito pequena."),
  subscribe: boolean().default(false).required(),
}).required()

export default function SignUp() {
  const { auth, update, db } = firebaseClient
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(formSchema), mode: "onBlur" })

  const [createUser, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const onSub: SubmitHandler<IFormInput> = ({
    displayname,
    email,
    password,
    subscribe,
  }: IFormInput) => {
    setIsOpen(true)
    createUser(email, password).then(() => {
      const updatedUser = auth.currentUser
      if (updatedUser) {
        update(updatedUser, { displayName: displayname }).then(() => {
          db.add(
            { receiveEmails: subscribe, email: updatedUser.email },
            "users",
            updatedUser.uid,
          )
        })
      }
    })
  }

  // const onSub = (data: any) => {
  //   console.log(data)
  //   setIsOpen(true)
  // }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <section
      className='content-base bg-gradient-to-b from-gold-serria via-white to-white space-y-8
    sm:content-sm
    md:content-md
    lg:content-lg
    xl:content-xl'
    >
      <div className='w-full flex flex-col items-center justify-center pt-12 text-xl font-semibold text-blue-zodiac'>
        <h1>Crie sua conta</h1>
        <h2>É simples, rápido e fácil!</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSub)}
        className='w-full flex flex-col p-10 gap-10 items-center'
      >
        <div id='inputs' className='w-full flex flex-col items-center gap-8'>
          <div className='relative w-full'>
            <input
              id='displayname'
              className={`peer w-full h-16 rounded-xl shadow-sm border-gold-serria border-2 focus:border-gold-mari focus:ring-gold-mari placeholder:opacity-0
              ${
                errors.displayname &&
                "border-red-pure focus:border-red-pure focus:border-2 focus:ring-red-pure"
              }`}
              type='text'
              autoComplete='name'
              placeholder='Nome Completo'
              {...register("displayname")}
            />
            <label
              htmlFor='displayname'
              className={`absolute left-2 -top-3 p-1 rounded-xl text-sm bg-gold-serria text-white transition-all duration-300 ${
                errors.displayname && "bg-red-pure"
              }
              peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-gray-base peer-placeholder-shown:text-base peer-placeholder-shown:top-4
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white peer-focus:bg-opacity-100`}
            >
              Nome
            </label>
            {errors.displayname && (
              <p className='text-red-pure text-xs mt-2 -mb-2 px-3'>
                {errors.displayname.message}
              </p>
            )}
          </div>
          <div className='relative w-full'>
            <input
              id='email'
              className={`peer w-full h-16 rounded-xl shadow-sm border-gold-serria border-2 focus:border-gold-mari focus:ring-gold-mari placeholder:opacity-0
              ${
                errors.email &&
                "border-red-pure focus:border-red-pure focus:border-2 focus:ring-red-pure"
              }`}
              type='email'
              autoComplete='email'
              required
              placeholder='Email'
              {...register("email")}
            />
            <label
              htmlFor='email'
              className={`absolute left-2 -top-3 p-1 rounded-xl text-sm bg-gold-serria text-white transition-all duration-300 ${
                errors.email && "bg-red-pure"
              }
              peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-gray-base peer-placeholder-shown:text-base peer-placeholder-shown:top-4
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white peer-focus:bg-opacity-100`}
            >
              Email
            </label>
            {errors.email && (
              <p className='text-red-pure text-xs mt-2 -mb-2 px-3'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='relative w-full'>
            <input
              id='password'
              className={`peer w-full h-16 rounded-xl shadow-sm border-gold-serria border-2 focus:border-gold-mari focus:ring-gold-mari placeholder:opacity-0
              ${
                errors.password &&
                "border-red-pure focus:border-red-pure focus:border-2 focus:ring-red-pure"
              }`}
              type='password'
              autoComplete='current-password'
              required
              placeholder='Senha'
              {...register("password")}
            />
            <label
              htmlFor='password'
              className={`absolute left-2 -top-3 p-1 rounded-xl text-sm bg-gold-serria text-white transition-all duration-300 ${
                errors.password && "bg-red-pure"
              }
              peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:text-gray-base peer-placeholder-shown:text-base peer-placeholder-shown:top-4
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-white peer-focus:bg-opacity-100`}
            >
              Senha
            </label>
            {errors.password && (
              <p className='text-red-pure text-xs mt-2 -mb-2 px-3'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='flex items-center justify-center gap-4 px-2'>
            <input
              id='subscribe'
              className='rounded h-5 w-5 text-green-fern focus:ring-green-fern'
              type='checkbox'
              {...register("subscribe")}
            />
            <label htmlFor='subscribe' className='text-xs text-gray-base'>
              Aceito receber emails com atualizações sobre Eventos e Premiações.
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='px-8 py-2 bg-green-fern/90 h-16 rounded-full text-white uppercase flex justify-center items-center shadow-sm border-none
          hover:bg-green-fern
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-fern/80'
        >
          Criar Conta
        </button>
      </form>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-blue-zodiac/90' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block align-middle w-full max-w-md p-6 my-8 overflow-hidden text-center transition-all transform bg-white shadow-xl rounded-2xl text-blue-zodiac'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-semibold leading-6'
                >
                  {loading ? "Criando conta..." : "Conta criada com sucesso!"}
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    {loading
                      ? "Sua conta está sendo criada... Este processo pode demorar alguns segundos."
                      : "Sua conta está criada e pronta para utilização."}
                  </p>
                  <div className='text-6xl text-green-fern flex items-center justify-center mt-4 transition-all transform'>
                    {loading ? (
                      <AiOutlineLoading className='animate-spin' />
                    ) : (
                      <AiFillCheckCircle />
                    )}
                  </div>
                </div>
                {!loading && (
                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-3 text-sm font-medium bg-green-fern/90 text-white border border-transparent rounded-full hover:bg-green-fern focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-fern/80'
                      onClick={closeModal}
                    >
                      Retornar à página principal
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}
