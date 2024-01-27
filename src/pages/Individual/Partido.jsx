import { useState, useEffect } from "react"

//import checkSession from "../../utils/checkSession";
import { returnSession } from "../../utils/sessions.js";
import { conseguirPartidoPorId } from "../../services/partidos.js";

import Layout from "../../components/Layout/Layout.jsx"
import InfoPartido from "../../components/Partidos/Partidos.jsx"

import { CircularProgress } from "@nextui-org/react"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function Inicio() {

  const [partido, setPartido] = useState()
  const [cargando, setCargando] = useState(true)
  const [cambioDatos, setCambioDatos] = useState(false)

  if (urlParams.get('id') == null)
    window.location.replace("/usuarios")

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"))
    conseguirPartidoPorId(urlParams.get("id"), cambioDatos, setCambioDatos).then((partidoIndividual) => {
      setPartido(partidoIndividual.result)
      setCargando(false)
    })

  }, [cambioDatos])

  if (cargando || localStorage.getItem("usuario") == null) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center mt-16">
          <CircularProgress aria-label="Cargando..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <InfoPartido partido={partido[0]} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></InfoPartido>
    </Layout>
  )
}

export default Inicio
