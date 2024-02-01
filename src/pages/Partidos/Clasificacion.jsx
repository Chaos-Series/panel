import { useState, useEffect } from "react";

import { conseguirClasificacion, conseguirEquipos } from "../../services/equipos.js";
import { returnSessionAdmin } from "../../utils/sessions.js";

import Layout from "../../components/Layout/Layout.jsx"
import TablaClasificaciones from "../../components/Clasificaciones/Tabla/Tabla.jsx"

import { CircularProgress } from "@nextui-org/react"

function Clasificaciones() {
  const [equipos, setEquipos] = useState()
  const [clasificacion, setClasificacion] = useState()
  const [cargando, setCargando] = useState(true)
  const [cambioDatos, setCambioDatos] = useState(true)

  useEffect(() => {
    returnSessionAdmin(window.localStorage.getItem("token"))
    if (!cambioDatos) return;

    Promise.all([conseguirEquipos(cambioDatos, setCambioDatos), conseguirClasificacion(cambioDatos, setCambioDatos)])
      .then(([listaEquipos, clasificacion]) => {
        setEquipos(listaEquipos.result);
        setClasificacion(clasificacion.result);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setCargando(false);
      });
  }, [cambioDatos]);

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
      <TablaClasificaciones listaEquipos={equipos} listaClasificacion={clasificacion} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></TablaClasificaciones>
    </Layout>
  )
}

export default Clasificaciones
