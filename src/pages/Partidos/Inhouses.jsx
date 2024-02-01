import { useState, useEffect } from "react"

import { conseguirPartidos } from "../../services/partidos";
import { returnSession } from "../../utils/sessions.js";

import Layout from "../../components/Layout/Layout.jsx"
import TablaInhouses from "../../components/Inhouses/Tabla/InhouseTabla.jsx"

import { CircularProgress } from "@nextui-org/react"

function Inhouses() {
    const [inhouses, setInhouses] = useState();
    const [cargando, setCargando] = useState(true);
    const [cambioDatos, setCambioDatos] = useState(true);

    useEffect(() => {
        returnSession(window.localStorage.getItem("token"));
        if (!cambioDatos) return;
        conseguirPartidos(cambioDatos, setCambioDatos, true).then((listaInhouses) => {
            setInhouses(listaInhouses.result);
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
            <TablaInhouses listaInhouses={inhouses} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></TablaInhouses>
        </Layout>
    );
}

export default Inhouses
