export default function Home({ setTab }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gray-100 mt-10">
      <div className="max-w-3xl text-center space-y-6">
        
        {/* TÍTULO */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 drop-shadow-sm">
          Queijaria Casa Verde Amarella
        </h1>

        {/* TEXTO */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Desde 1985 produzindo queijos artesanais com tradição mineira.
          Nossos produtos são feitos com carinho, seguindo técnicas passadas 
          de geração em geração — e entregando sempre sabor, qualidade e 
          aquele toque mineiro irresistível! 🧀✨
        </p>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setTab("queijos")}
            className="px-8 py-3 rounded-full bg-green-700 text-white font-semibold
                       shadow-md hover:bg-green-800 hover:shadow-lg transition"
          >
            🧀 Faça seu pedido
          </button>

          <button
            onClick={() => setTab("contato")}
            className="px-8 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold
                       shadow-md hover:bg-yellow-500 hover:shadow-lg transition"
          >
            ✉️ Entre em contato
          </button>
          
        </div>

      </div>
    </section>
  )
}
