/* eslint-disable react/prop-types */
import TablaUsuarios from "./Components/TablaUsuarios";

export default function Inhouse({ inhouse, setCambioDatos, cambioDatos }) {
    const jugadoresBlue = JSON.parse(inhouse.jugadores_blue);
    const jugadoresRed = JSON.parse(inhouse.jugadores_red);

    return Object.keys(jugadoresBlue).length ? (
        <TablaUsuarios inhouse={inhouse} jugadoresBlue={jugadoresBlue} jugadoresRed={jugadoresRed} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
    ) : null;
}