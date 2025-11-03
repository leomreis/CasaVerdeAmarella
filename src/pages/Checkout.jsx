import { useState } from "react"
import { useCarrinho } from "../context/CarrinhoContext"
import { abrirWhatsApp } from "../utils/whatsapp"

const NUMERO_LOJA = "5538999999999"

export default function Checkout() {
  const { carrinho, subtotal, limpar } = useCarrinho()

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    observacoes: ""
  })

  if (!carrinho.length) {
    return (
      <section className="p-6 text-center">
        <p className="text-xl font-semibold">Seu carrinho está vazio!</p>
      </section>
    )
  }

  function enviar(e) {
    e.preventDefault()
    if (!form.nome || !form.telefone || !form.endereco) {
      alert("Preencha os dados obrigatórios.")
      return
    }
    abrirWhatsApp(NUMERO_LOJA, carrinho, form)
    limpar()
  }

  return (
    <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 p-4">
      {/* FORMULÁRIO */}
      <form onSubmit={enviar} className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold">Informe seus dados</h2>

        {["nome", "telefone", "endereco"].map((campo) => (
          <input
            key={campo}
            name={campo}
            placeholder={campo.toUpperCase()}
            required
            className="border rounded p-2 w-full"
            value={form[campo]}
            onChange={e => setForm({ ...form, [campo]: e.target.value })}
          />
        ))}

        <textarea
          name="observacoes"
          rows="3"
          placeholder="Observações (opcional)"
          className="border rounded p-2 w-full"
          value={form.observacoes}
          onChange={e => setForm({ ...form, observacoes: e.target.value })}
        />

        <button className="bg-green-700 text-white px-4 py-2 rounded-full w-full">
          Enviar Pedido no WhatsApp ✅
        </button>
      </form>

      {/* RESUMO */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-3">Resumo do Pedido</h3>
        <ul className="space-y-2">
          {carrinho.map(i => (
            <li key={i.id} className="flex justify-between">
              <span>{i.qty}x {i.name}</span>
              <span>R$ {(i.qty * i.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t pt-2 flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Entrega será informada pela loja.</p>
      </div>
    </section>
  )
}
