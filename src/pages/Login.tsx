export default function Login() {
  return (
    <main className="h-screen w-full  mx-auto max-w-sm flex flex-col items-center justify-center">
      <form className="w-full h-auto bg-gray-100 border-gray-200 border px-6 py-10 rounded-lg flex flex-col gap-4">
        <h1 className="font-bold text-gray-800 text-xl text-center">
          Iniciar Sesión
        </h1>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-bold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="varmiguemunoz@gmail.com"
            className="w-full p-2 border-b-2 border-gray-200 outline-none rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="w-full p-2 border-b-2 border-gray-200 rounded-md outline-none"
          />
        </div>

        <button className="w-full p-2 bg-blue-500 text-white rounded-md font-bold">
          Entrar
        </button>
      </form>
      <a
        href="/register"
        className="text-center mt-4 font-medium text-blue-500 hover:border-b py-1 hover:border-blue-500 transition duration-300 ease-in-out"
      >
        ¿No tienes una cuenta?
      </a>
    </main>
  );
}
