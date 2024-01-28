import { useState, useEffect } from "react";

import { conseguirUsuarios } from "../services/usuarios";
import { conseguirEquipos } from "../services/equipos.js"
import { returnSessionAdmin } from "../utils/sessions.js";

import Layout from "../components/Layout/Layout.jsx";
import TablaUsuarios from "../components/Jugadores/Tabla/Tabla.jsx";

import { CircularProgress } from "@nextui-org/react";

function Inicio() {
  const [usuarios, setUsuarios] = useState();
  const [equipos, setEquipos] = useState();
  const [cargando, setCargando] = useState(true);
  const [cambioDatos, setCambioDatos] = useState(true);

  useEffect(() => {
    returnSessionAdmin(window.localStorage.getItem("token"));
    if (!cambioDatos) return;
    conseguirUsuarios(cambioDatos, setCambioDatos).then((listaUsuarios) => {
      setUsuarios(listaUsuarios.result);
      setCargando(false);
    });
    conseguirEquipos(cambioDatos, setCambioDatos).then((listaEquipos) => {
      setEquipos(listaEquipos.result)
    })
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
      <TablaUsuarios listaUsuarios={usuarios} listaEquipos={equipos} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></TablaUsuarios>
    </Layout>
  );
}

export default Inicio;
