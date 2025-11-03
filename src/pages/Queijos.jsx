import { queijos } from "../data/products"
import ProductCardPeso from "../components/ProductCardPeso"

export default function Queijos() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold">Nossos queijos</h2>
        <p className="text-gray-600">Selecione a quantidade (a cada 100g) e adicione ao carrinho.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {queijos.map(q => (
          <ProductCardPeso key={q.id} produto={q} />
        ))}
      </div>
    </section>
  )
}
