import { useState } from "react"
import { useCarrinho } from "../context/CarrinhoContext"

export default function ProductCardPeso({ produto }) {
  const { adicionar } = useCarrinho()
  const [grams, setGrams] = useState(100) // padrão 100g

  const valorParcial = (grams / 1000) * produto.price

  const addToCart = () => {
    adicionar({
      id: `${produto.id}-${grams}g-${Date.now()}`, // cada combinação vira item único
      name: `${produto.name} (${grams}g)`,
      unit: 'kg',
      price: produto.price, // preço por kg
      grams,
      image: produto.image,
      type: produto.type,
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <img src={produto.image} alt={produto.name} className="rounded-xl aspect-[4/3] object-cover" />
      <h3 className="mt-3 font-semibold text-lg">{produto.name}</h3>
      <p className="text-sm text-gray-600">{produto.description}</p>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-xl font-bold">R$ {produto.price.toFixed(2)}</span>
        <span className="text-xs text-gray-500">/ kg</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <label className="text-sm text-gray-700">Quantidade:</label>
        <select
          value={grams}
          onChange={e => setGrams(Number(e.target.value))}
          className="border rounded-xl px-3 py-1"
        >
          {[100,200,300,400,500,600,700,800,900,1000].map(g => (
            <option key={g} value={g}>{g} g</option>
          ))}
        </select>
        <span className="ml-auto text-sm font-semibold">
          R$ {valorParcial.toFixed(2)}
        </span>
      </div>

      <button
        onClick={addToCart}
        className="mt-4 rounded-full px-4 py-2 bg-gray-900 text-white hover:opacity-90"
      >
        Adicionar
      </button>
    </div>
  )
}
