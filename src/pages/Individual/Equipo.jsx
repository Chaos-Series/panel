import { useState, useEffect } from "react";

//import checkSession from "../../utils/checkSession";
import { returnSession } from "../../utils/sessions.js";
import { conseguirEquiposPorId, conseguirLigas, conseguirTemporadas, conseguirUsuarios } from "../../services/equipos";

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
  const [cargando, setCargando] = useState(true);
  const [cambioDatos, setCambioDatos] = useState(false);

  if (urlParams.get("id") == null) window.location.replace("/usuarios");

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"));
    conseguirEquiposPorId(urlParams.get("id"), cambioDatos, setCambioDatos).then((equipoIndividual) => {
      setEquipo(equipoIndividual.result);
      conseguirLigas(cambioDatos, setCambioDatos).then((listaLigas) => {
        setLigas(listaLigas.result);
        conseguirTemporadas(cambioDatos, setCambioDatos).then((listaTemporadas) => {
          setTemporadas(listaTemporadas.result);
          conseguirUsuarios(urlParams.get("id"), cambioDatos, setCambioDatos).then((listaUsuarios) => {
            setUsuarios(listaUsuarios.result);
            setCargando(false);
          });
        });
      });
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
      <InfoEquipo equipo={equipo} ligas={ligas} temporadas={temporadas} jugadores={usuarios} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></InfoEquipo>
    </Layout>
  );
}

export default Inicio;
