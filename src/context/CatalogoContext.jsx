import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

export function CatalogoProvider({ children }) {
  const [queijos, setQueijos] = useState([]);
  const [tabuas, setTabuas] = useState([]);
  const [vinhos, setVinhos] = useState([]);

 useEffect(() => {
  async function loadCatalogo() {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}catalogo.json`)
      const data = await response.json()

      setQueijos(data.queijos || [])
      setTabuas(data.tabuas || [])
      setVinhos(data.vinhos || [])

    } catch (error) {
      console.error("Erro ao buscar catálogo:", error)
    }
  }
  loadCatalogo()
}, [])


  const value = { queijos, tabuas, vinhos };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalogo() {
  return useContext(Ctx);
}
