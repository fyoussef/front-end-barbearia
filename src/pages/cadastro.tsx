import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { MustacheIcon } from "../components/Icons";
import { useRouter } from "next/router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleRegisterUser() {
    if (!username || !email || !phone || !password) {
      console.log("ERRO");
      return;
    }
    const data = {
      name: username,
      email,
      phone,
      password,
    };
    const res = await axios.post("http://localhost:5000/user", data);
    const { status } = res;

    if (status == 201) {
      console.log("REGISTRADO");
      router.push("/login");
    }
  }

  return (
    <>
      <Head>
        <title>Bem vindo | Cadasto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mustache_16.png" />
      </Head>
      <div className="w-full flex justify-center items-center py-4">
        <div className="w-96 flex flex-col space-y-8 border p-8 shadow-md">
          <div className="flex justify-center">
            <div className="border rounded-full w-fit p-4 border-black">
              <MustacheIcon />
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold">Cadastro</p>
            <p className="text-gray-500">
              Forneça os dados necessários para efetuar o seu cadastro
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              name="floating_user"
              id="floating_user"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_user"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Usuário
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setUsername(e.target.name)}
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
              type="tel"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Telefone
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              Cadastre-se
            </button>
          </div>

          <div>
            <p className="text-sm text-center">
              Já está cadastrado?{" "}
              <Link className="underline hover:text-blue-500" href="/login">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
