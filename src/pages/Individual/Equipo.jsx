import { useState, useEffect } from "react";

//import checkSession from "../../utils/checkSession";
import { returnSession } from "../../utils/sessions.js";
import { conseguirClasificacionPorId, conseguirEquiposPorId, conseguirLigas, conseguirTemporadas, conseguirUsuarios } from "../../services/equipos";

import Layout from "../../components/Layout/Layout.jsx";
import InfoEquipo from "../../components/Equipos/Equipos.jsx";

import { CircularProgress } from "@nextui-org/react";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function Inicio() {
  const [equipo, setEquipo] = useState();
  const [ligas, setLigas] = useState();
  const [temporadas, setTemporadas] = useState();
  const [usuarios, setUsuarios] = useState();
  const [clasificacion, setClasificacion] = useState();
  const [cargando, setCargando] = useState(true);
  const [cambioDatos, setCambioDatos] = useState(true);

  if (urlParams.get("id") == null) window.location.replace("/usuarios");

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"));
    if (!cambioDatos) return;
    const fetchData = async () => {
      try {
        const [equipoIndividual, listaLigas, listaTemporadas, infoClasificacion, listaUsuarios] = await Promise.all([
          conseguirEquiposPorId(urlParams.get("id"), cambioDatos, setCambioDatos),
          conseguirLigas(cambioDatos, setCambioDatos),
          conseguirTemporadas(cambioDatos, setCambioDatos),
          conseguirClasificacionPorId(cambioDatos, setCambioDatos, urlParams.get("id")),
          conseguirUsuarios(urlParams.get("id"), cambioDatos, setCambioDatos)
        ]);

        setEquipo(equipoIndividual.result);
        setLigas(listaLigas.result);
        setTemporadas(listaTemporadas.result);
        setClasificacion(infoClasificacion.result);
        setUsuarios(listaUsuarios.result);

        setCargando(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
      <InfoEquipo equipo={equipo} ligas={ligas} temporadas={temporadas} clasificacion={clasificacion} jugadores={usuarios} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></InfoEquipo>
    </Layout>
  );
}

export default Inicio;
