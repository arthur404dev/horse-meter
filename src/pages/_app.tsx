import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout } from "../components"
import Head from "next/head"
import { environment } from "../config"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{environment.app.name}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
