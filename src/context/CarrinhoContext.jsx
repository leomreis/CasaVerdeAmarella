import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CarrinhoCtx = createContext(null)
const STORAGE_KEY = "cva:carrinho"

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho))
  }, [carrinho])

  // Adiciona item: suporta unidade "kg" (com grams) e "un" (com qty)
  function adicionar(item) {
    // Se for por unidade, tenta somar qty no mesmo id
    if (item.unit !== "kg") {
      setCarrinho(prev => {
        const i = prev.findIndex(x => x.id === item.id && x.unit !== "kg")
        if (i >= 0) {
          const copia = [...prev]
          copia[i] = { ...copia[i], qty: (copia[i].qty || 1) + (item.qty || 1) }
          return copia
        }
        return [...prev, { ...item, qty: item.qty || 1 }]
      })
      return
    }

    // Por peso (kg): cada linha pode ter grams diferente, então vira item separado
    setCarrinho(prev => [...prev, { ...item, grams: item.grams || 100, qty: 1 }])
  }

  function remover(indexOrId) {
    // se vier um índice numérico, remove por índice (caso de itens por gramas repetidos)
    if (typeof indexOrId === "number") {
      setCarrinho(prev => prev.filter((_, idx) => idx !== indexOrId))
      return
    }
    setCarrinho(prev => prev.filter(i => i.id !== indexOrId))
  }

  function alterarQuantidade(id, novaQtd) {
    setCarrinho(prev => prev.map(i => (
      i.id === id && i.unit !== "kg" ? { ...i, qty: Math.max(1, novaQtd) } : i
    )))
  }

  function limpar() { setCarrinho([]) }

  const totalItens = useMemo(() =>
    carrinho.reduce((s, i) => s + (i.qty || 1), 0), [carrinho]
  )

  const subtotal = useMemo(() =>
    carrinho.reduce((s, i) => {
      if (i.unit === "kg" && i.grams) return s + (i.grams / 1000) * i.price
      return s + (i.qty || 1) * i.price
    }, 0)
  , [carrinho])

  const valor = { carrinho, adicionar, remover, alterarQuantidade, limpar, totalItens, subtotal }
  return <CarrinhoCtx.Provider value={valor}>{children}</CarrinhoCtx.Provider>
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoCtx)
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de <CarrinhoProvider>")
  return ctx
}
