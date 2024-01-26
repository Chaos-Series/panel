import axios from "axios";
import api from "../../variables.json";
import { toast } from "sonner";
import getEpoch from "../utils/getEpoch";
import sendLog from "../utils/sendLog";

async function crearInhouse(fecha, resolve, reject, cambioDatos) {
    try {
        const respuesta = await axios.post(api.directorio + "partidos/inhouses", { fecha: getEpoch(fecha) }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        if (respuesta.data.status == 200) {
            cambioDatos(true);
            resolve();
        } else {
            reject();
        }
    } catch (error) {
        reject();
    }
}

async function eliminarUsuario(id, resolve, reject, cambioDatos) {
    try {
        const respuesta = await axios.delete(api.directorio + "usuarios", { data: { id: id }, headers: { "x-auth-token": localStorage.getItem("token") } });
        if (respuesta.data.status == 200) {
            cambioDatos(true);
            resolve();
        } else {
            reject();
        }
        //sendLog(49, "Borrar Usuario", { id_usuario: equipo["equipo"].id_usuario, nombre_usuario: equipo["equipo"].nombre_usuario, apellido_usuario: equipo["equipo"].apellido_usuario, nick_usuario: equipo["equipo"].nick_usuario, rol_usuario: equipo["equipo"].rol })
    } catch (error) {
        reject();
    }
}

async function conseguirInhouses(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "partidos/inhouses", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirPartidos(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "partidos/partidos", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirInhousePorId(idInhouse, setCambioDatos, partido = false) {
    try {
        const url = partido ? api.directorio + "partidos/inhouses/id=" + idInhouse + "?partido=true" : api.directorio + "partidos/inhouses/id=" + idInhouse;
        const respuesta = await axios.get(url, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function inscribirseInhouse(inhouse, usuario, side, posicion, cambioDatos, resolve, reject) {
    try {
        const response = await axios.put(api.directorio + "partidos/inhouses", { id_inhouse: inhouse, id_usuario: usuario, side: side, posicion: posicion }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        cambioDatos(true);
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

async function actualizarUsuario(usuario, columna, valor, cambioDatos, resolve, reject) {
    try {
        await axios.put(api.directorio + "usuarios", { id_usuario: usuario.jugador.id_usuario, columna: columna, valor: valor }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        cambioDatos(true);
        sendLog(usuario.jugador.id_usuario, "Actualizar Usuario", { id: usuario.jugador.id_usuario });
        resolve();
    } catch (error) {
        reject();
    }
}

export { crearInhouse, eliminarUsuario, conseguirInhouses, conseguirInhousePorId, inscribirseInhouse, actualizarUsuario, conseguirPartidos };
