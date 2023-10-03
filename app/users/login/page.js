import Link from "next/link";

export default function Login() {

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400 ">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            KULLANICI GİRİŞİ
            </p>
        </h1>
      </div>
      <div className="flex  bg-white shadow-md rounded">
        {/* login   */}
        <div className="w-1/2 px-8 pt-6 pb-8 mb-4 flex flex-col pt-5">
          <div className="-mx-3  mb-3 ">
            <div className="w-1/2 md:w-full px-3 mb-6 md:mb-0 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                E-MAIL:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="firstName"
              />
            </div>

            <div className="w-1/2 md:w-full px-3 mt-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                ŞİFRE:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="lastName"
              />
            </div>
          </div>
          <div className="pb-5 block tracking-wide text-amber-400 text-bold flex justify-center">
            <p>Parolanızı mı unuttunuz? </p>
          </div>

          <div className="items-center justify-between">
            <button
              className="w-1/2 md:w-full px-5 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
              type="button"
            >
              Gönder
            </button>
          </div>
          <div className=" flex pt-6 block tracking-wide text-gray-600 text-s">
            <p>Henüz bir hesabınız yok mu?</p>
            <Link href="../users/create">
              
              <p className="font-semibold text-purple-600"> Ücretsiz kaydol.</p>
              </Link>
          </div>
        </div>

        {/* destek ve iletişim */}
        <div className="w-1/2 px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right">
              DESTEK VE İLETİŞİM:
            </h2>
          <div className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 pb-18 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            
            <p className="mb-6 mt-2 text-right font-bold tracking-wide">
              Müşteri destek ekibimize aşağıdaki bilgilerle ulaşabilirsiniz:
            </p>
            <p className="mb-2 text-right tracking-wide">E-posta: support@example.com</p>
            <p className="mb-2 text-right tracking-wide ">Telefon: +1 (123) 456-7890</p>
            <p className="mb-2 text-right tracking-wide pb-12">E-posta: info@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
