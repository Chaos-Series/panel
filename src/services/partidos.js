import axios from "axios";
import api from "../../variables.json";
import { toast } from "sonner";
import getEpoch from "../utils/getEpoch";
import sendLog from "../utils/sendLog";

async function crearPartido(fecha, resolve, reject, cambioDatos, setCambioDatos, infoPartido, inhouse = false) {
    const body = inhouse ? {
        fecha: getEpoch(fecha),
    } : {
        fecha: getEpoch(fecha),
        id_liga: infoPartido[0],
        id_temporada: infoPartido[1],
    }

    try {
        const respuesta = await axios.post(api.directorio + (inhouse ? "partidos/inhouses" : "partidos"), body, { headers: { "x-auth-token": localStorage.getItem("token") } });
        if (respuesta.data.status == 200) {
            setCambioDatos(!cambioDatos);
            resolve();
        } else {
            reject();
        }
    } catch (error) {
        reject();
    }
}

async function eliminarUsuario(id, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.delete(api.directorio + "usuarios", { data: { id: id }, headers: { "x-auth-token": localStorage.getItem("token") } });
        if (respuesta.data.status == 200) {
            setCambioDatos(!cambioDatos);
            resolve();
        } else {
            reject();
        }
        //sendLog(49, "Borrar Usuario", { id_usuario: equipo["equipo"].id_usuario, nombre_usuario: equipo["equipo"].nombre_usuario, apellido_usuario: equipo["equipo"].apellido_usuario, nick_usuario: equipo["equipo"].nick_usuario, rol_usuario: equipo["equipo"].rol })
    } catch (error) {
        reject();
    }
}

async function conseguirPartidos(cambioDatos, setCambioDatos, inhouse = false) {
    try {
        const respuesta = await axios.get(api.directorio + (inhouse ? "partidos/inhouses" : "partidos"), { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirPartidoPorId(idPartido, cambioDatos, setCambioDatos, inhouse = false) {
    try {
        const url = api.directorio + "partidos/" + (inhouse ? "inhouses/id=" : "id=") + idPartido;
        const respuesta = await axios.get(url, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function inscribirseInhouse(inhouse, usuario, side, posicion, cambioDatos, setCambioDatos, resolve, reject) {
    try {
        const response = await axios.put(api.directorio + "partidos/inhouses", { id_inhouse: inhouse, id_usuario: usuario, side: side, posicion: posicion }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        sendLog(usuario, "Inscribirse", { id_inhouse: inhouse, id_usuario: usuario, side: side, posicion: posicion });
        if (response.data.result == "El usuario ya existe.") {
            reject();
            toast.error("Ya te has inscrito anteriormente.");
        }
        resolve();
    } catch (error) {
        reject();
    }
}

async function actualizarUsuario(usuario, columna, valor, cambioDatos, setCambioDatos, resolve, reject) {
    try {
        await axios.put(api.directorio + "usuarios", { id_usuario: usuario.jugador.id_usuario, columna: columna, valor: valor }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        sendLog(usuario.jugador.id_usuario, "Actualizar Usuario", { id: usuario.jugador.id_usuario });
        resolve();
    } catch (error) {
        reject();
    }
}

export { crearPartido, eliminarUsuario, conseguirPartidos, conseguirPartidoPorId, inscribirseInhouse, actualizarUsuario };
