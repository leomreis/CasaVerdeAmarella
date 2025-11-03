import { useEffect, useRef, useState } from "react"
import { useCarrinho } from "../context/CarrinhoContext"

// Ícones (troque pelos seus arquivos se quiser)
import icQueijos from "../assets/icone_queijos.png"
import icTabuas from "../assets/icone_tabuas.png"
import icMonte from "../assets/icone_monte.png"
import icCadastro from "../assets/icone_cadastro.png"
import icLogin from "../assets/icone_login.png"
import icContato from "../assets/icone_contato.png"
import icLogo from "../assets/icone_logo.jpg"

const LinkStyle = "flex flex-col items-center p-2 rounded-lg text-white hover:opacity-60 hover:cursor-pointer transition duration-150"

export default function NavBar({ setTab, tab }) {
  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollY = useRef(0)
  const timeoutRef = useRef(null)
  const { totalItens, subtotal } = useCarrinho()

  useEffect(() => {
    function onScroll() {
      const current = window.scrollY
      const delta = current - lastScrollY.current
      if (current <= 0) setShowNavbar(true)
      else {
        if (delta > 5 && current > 20) { setShowNavbar(false); if (timeoutRef.current) clearTimeout(timeoutRef.current) }
        else if (delta < -5) {
          if (!showNavbar) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setShowNavbar(true), 250)
          }
        }
      }
      lastScrollY.current = current
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [showNavbar])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-red-700 shadow-lg transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo + Nome */}
          <button onClick={() => setTab("home")} className="flex items-center gap-3">
            <img src={icLogo} alt="Logo Casa Verde Amarella" className="h-10 w-10 rounded-full object-cover border-2 border-white" />
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-wide drop-shadow-md">Casa Verde Amarella</span>
          </button>

          {/* Ícones centrais */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setTab("queijos")} className={LinkStyle}>
              <img src={icQueijos} className="h-8 w-8" /><span className="text-[11px] font-semibold">QUEIJOS</span>
            </button>
            <button onClick={() => setTab("tabuas")} className={LinkStyle}>
              <img src={icTabuas} className="h-8 w-8" /><span className="text-[11px] font-semibold">TÁBUAS</span>
            </button>
            <button onClick={() => setTab("monte")} className={LinkStyle}>
              <img src={icMonte} className="h-8 w-8" /><span className="text-[11px] font-semibold">MONTE</span>
            </button>
            <button onClick={() => setTab("cadastro")} className={LinkStyle}>
              <img src={icCadastro} className="h-8 w-8" /><span className="text-[11px] font-semibold">CADASTRO</span>
            </button>
            <button onClick={() => setTab("login")} className={LinkStyle}>
              <img src={icLogin} className="h-8 w-8" /><span className="text-[11px] font-semibold">LOGIN</span>
            </button>
            <button onClick={() => setTab("contato")} className={LinkStyle}>
              <img src={icContato} className="h-8 w-8" /><span className="text-[11px] font-semibold">CONTATO</span>
            </button>
          </div>

          {/* Carrinho no canto direito */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:block text-white/90 text-sm px-3 py-1 rounded-full bg-black/30">
              Itens: {totalItens} • Subtotal: R$ {subtotal.toFixed(2)}
            </div>
            <button
              onClick={() => setTab("checkout")}
              className="px-4 py-2 rounded-full bg-white text-red-700 font-semibold hover:bg-yellow-100"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </nav>
      <div className="h-[68px]"></div>
    </>
  )
}
