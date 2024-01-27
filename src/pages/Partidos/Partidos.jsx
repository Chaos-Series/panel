import { useState, useEffect } from "react";

import { conseguirPartidos } from "../../services/partidos.js";
import { returnSessionAdmin } from "../../utils/sessions.js";

import Layout from "../../components/Layout/Layout.jsx";
import TablaPartidos from "../../components/Partidos/Tabla/PartidoTabla.jsx";

import { CircularProgress } from "@nextui-org/react";

function Partidos() {
    const [partidos, setPartidos] = useState();
    const [cargando, setCargando] = useState(true);
    const [cambioDatos, setCambioDatos] = useState(false);

    useEffect(() => {
        if (!cargando) return;
        returnSessionAdmin(window.localStorage.getItem("token"));
        conseguirPartidos(cambioDatos, setCambioDatos).then((listaPartidos) => {
            setPartidos(listaPartidos.result);
            setCargando(false);
        });
    }, [cambioDatos, cargando]);

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
            <TablaPartidos listaPartidos={partidos} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
        </Layout>
    );
}

export default Partidos;
