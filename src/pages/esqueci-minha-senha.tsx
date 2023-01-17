import Head from "next/head";
import Link from "next/link";
import { MustacheIcon } from "../components/Icons";

export default function ForgetPassword() {
  return (
    <>
      <Head>
        <title>Bem vindo | Esqueceu a senha</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mustache_16.png" />
      </Head>

      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-96 flex flex-col space-y-8 border p-8 shadow-2xl">
          <div className="flex justify-center">
            <div className="border rounded-full w-fit p-4 border-black">
              <MustacheIcon />
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold">Esqueci minha senha</p>
            <p className="text-gray-500">Para recuperar sua senha escolha um meio para que possamos te enviar sua nova senha</p>
          </div>

          <div className="relative">
            <input 
              type="email" 
              name="floating_email" 
              id="floating_email" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required
            />
            <label 
                htmlFor="floating_email" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          <div>
              <button 
                  type="button" 
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
                  Enviar
              </button>
          </div>

          <div>
              <p className="text-sm text-center">
                  Voltar para o <Link className="underline hover:text-blue-500" href='/login'>login</Link>
              </p>
          </div>

        </div>
      </div>

    </>
  )
}