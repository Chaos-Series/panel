import { useState, useEffect } from "react"

//import checkSession from "../../utils/checkSession";
import { returnSession } from "../../utils/sessions.js";
import { conseguirUsuarioPorId } from "../../services/usuarios.js";
import { conseguirEquipos } from "../../services/equipos";

import Layout from "../../components/Layout/Layout.jsx"
import InfoUsuario from "../../components/Jugadores/Jugadores.jsx"

import { CircularProgress } from "@nextui-org/react"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function Inicio() {

  const [usuario, setUsuario] = useState()
  const [listaEquipos, setListaEquipos] = useState()
  const [cargando, setCargando] = useState(true)
  const [cambioDatos, setCambioDatos] = useState(false)

  if (urlParams.get('id') == null)
    window.location.replace("/usuarios")

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"))
    conseguirUsuarioPorId(urlParams.get("id"), cambioDatos, setCambioDatos).then((usuarioIndividual) => {
      setUsuario(usuarioIndividual.result)
      conseguirEquipos(cambioDatos, setCambioDatos).then((equipos) => {
        setListaEquipos(equipos.result)
        setCargando(false)
      })
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
      <InfoUsuario usuario={usuario} listaEquipos={listaEquipos} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></InfoUsuario>
    </Layout>
  )
}

export default Inicio
