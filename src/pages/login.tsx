import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { MustacheIcon } from "../components/Icons";
import { ToastComponent } from "../components/Toast";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin() {
    if (!email || !password) {
      console.log("erro");
    }

    const data = {
      email,
      password,
    };

    try {
      await signIn(data);
    } catch (error: any) {
      const data = error.response.data;
      const message = data.error;
      setShowToast(true);
      setErrorMessage(message);
    }
  }

  return (
    <>
      <Head>
        <title>Bem vindo | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mustache_16.png" />
      </Head>
      {showToast && (
        <ToastComponent
          message={errorMessage}
          title="Erro"
          resetState={setShowToast}
        />
      )}
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="w-96 flex flex-col space-y-8 border p-8 shadow-2xl">
          <div className="flex justify-center">
            <div className="border rounded-full w-fit p-4 border-black">
              <MustacheIcon />
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold">Bem vindo</p>
            <p className="text-gray-500">
              Forneça os dados necessários para efetuar o login
            </p>
          </div>

          <div className="relative">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Senha
            </label>
          </div>

          <div>
            <p className="text-sm text-right">
              <Link
                className=" underline hover:text-blue-500"
                href="/esqueci-minha-senha"
              >
                Esqueci minha senha
              </Link>
            </p>
          </div>

          <div>
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <div>
            <p className="text-sm text-center">
              Ainda não possui uma conta?{" "}
              <Link className="underline hover:text-blue-500" href="/cadastro">
                cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
