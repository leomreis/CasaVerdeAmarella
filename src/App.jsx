import { useState } from "react"
import { CarrinhoProvider } from "./context/CarrinhoContext"
import NavBar from "./components/NavBar"

import Home from "./pages/Home"
import Queijos from "./pages/Queijos"
import Tabuas from "./pages/Tabuas"
import Monte from "./pages/Monte"
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import Contato from "./pages/Contato"
import Checkout from "./pages/Checkout"

function AppInner() {
  const [tab, setTab] = useState("home")

  return (
    <>
      <NavBar tab={tab} setTab={setTab} />

      {tab === "home" && <Home setTab={setTab} />}
      {tab === "queijos" && <Queijos />}
      {tab === "tabuas" && <Tabuas />}
      {tab === "monte" && <Monte />}
      {tab === "cadastro" && <Cadastro />}
      {tab === "login" && <Login />}
      {tab === "contato" && <Contato />}
      {tab === "checkout" && <Checkout />}
    </>
  )
}

export default function App() {
  return (
    <CarrinhoProvider>
      <AppInner />
    </CarrinhoProvider>
  )
}
