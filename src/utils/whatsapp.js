export function abrirWhatsApp(numeroLoja, carrinho, cliente) {
  const limpar = (v) => String(v || "").replace(/\D/g, "")
  const msg = []

  msg.push("*Pedido - Queijaria Casa Verde Amarella*")
  msg.push("")
  msg.push(`*Cliente:* ${cliente.nome}`)
  msg.push(`*Telefone:* ${limpar(cliente.telefone)}`)
  msg.push(`*Endereço:* ${cliente.endereco}`)
  if (cliente.observacoes)
    msg.push(`*Obs:* ${cliente.observacoes}`)

  msg.push("")
  msg.push("*Itens:*")

  let subtotal = 0
  carrinho.forEach(i => {
    const valor = i.price * i.qty
    subtotal += valor
    msg.push(`- ${i.qty}x ${i.name} • R$ ${valor.toFixed(2)}`)
  })

  msg.push("")
  msg.push(`*Subtotal:* R$ ${subtotal.toFixed(2)}`)
  msg.push(`*Entrega:* informar 🛵`)
  msg.push("")
  msg.push(`Pode calcular o frete e me enviar o valor final? 😊`)

  const texto = encodeURIComponent(msg.join("\n"))
  const numero = limpar(numeroLoja)
  window.open(`https://wa.me/${numero}?text=${texto}`, "_blank")
}
