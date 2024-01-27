/* eslint-disable react/prop-types */
import TablaUsuarios from "./Components/TablaUsuarios";

export default function Partido({ partido, setCambioDatos, cambioDatos }) {

    const jugadoresBlue = JSON.parse(partido.jugadores_blue)
    const jugadoresRed = JSON.parse(partido.jugadores_red)

    return Object.keys(jugadoresBlue).length ? (
        <TablaUsuarios jugadoresBlue={jugadoresBlue} jugadoresRed={jugadoresRed} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
    ) : null;
}