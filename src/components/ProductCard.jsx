import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { add } = useCart()
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="rounded-xl aspect-4/3 object-cover" />
      <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-xl font-bold">R$ {product.price.toFixed(2)}</span>
        <span className="text-xs text-gray-500">/ {product.unit}</span>
      </div>
      <button
        onClick={() => add(product, 1)}
        className="mt-4 rounded-full px-4 py-2 bg-gray-900 text-white hover:opacity-90"
      >
        Adicionar
      </button>
    </div>
  )
}
