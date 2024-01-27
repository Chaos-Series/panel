import axios from "axios";
import api from "../../variables.json";
import md5 from "md5";
import { toast } from "sonner";
import sendLog from "../utils/sendLog";

async function crearUsuario(nombre, apellido, nick, edad, rol, contra, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        const encriptarPass = () => {
            return new Promise((resolve) => {
                resolve(md5(contra));
            });
        };

        const passEncriptada = await encriptarPass();

        const comprobacion = await axios.get(api.directorio + "usuarios/nombre=" + nick, { headers: { "x-auth-token": localStorage.getItem("token") } });

        if (comprobacion.data.result.length == 0) {
            const respuesta = await axios.post(
                api.directorio + "usuarios",
                { nombre, apellido, nick, edad, rol, contra: passEncriptada },
                { headers: { "x-auth-token": localStorage.getItem("token") } }
            );

            if (respuesta.data.status == 200) {
                setCambioDatos(!cambioDatos);
                resolve();
            } else {
                reject();
            }
        } else {
            toast.error("Este usuario ya existe.");
            reject();
        }
    } catch (error) {
        reject();
    }
}

async function eliminarUsuario(id, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.delete(api.directorio + "usuarios", { data: { id }, headers: { "x-auth-token": localStorage.getItem("token") } });

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

async function conseguirUsuarios(cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "usuarios", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirUsuarioPorId(idUsuario, cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "usuarios/id=" + idUsuario, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function actualizarPerfil(usuario, columna, valor, cambioDatos, setCambioDatos, resolve, reject) {
    try {
        await axios.put(
            api.directorio + "usuarios",
            { id_usuario: usuario.info.id_usuario, columna, valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        );

        setCambioDatos(!cambioDatos);
        sendLog(usuario.info.id_usuario, "Actualizar Perfil", { id: usuario.info.id_usuario });
        resolve();
    } catch (error) {
        reject();
    }
}

async function actualizarUsuario(usuario, columna, valor, cambioDatos, setCambioDatos, resolve, reject) {
    try {
        await axios.put(
            api.directorio + "usuarios",
            { id_usuario: usuario.jugador.id_usuario, columna, valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        );

        setCambioDatos(!cambioDatos);
        sendLog(usuario.jugador.id_usuario, "Actualizar Usuario", { id: usuario.jugador.id_usuario });
        resolve();
    } catch (error) {
        reject();
    }
}

async function actualizarUsuariosMasaRoles(usuarios, valor, cambioDatos, setCambioDatos, resolve, reject) {
    try {
        await axios.put(
            api.directorio + "usuarios/masa/roles",
            { id_usuario: usuarios, valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        );

        setCambioDatos(!cambioDatos);
        resolve();
    } catch (error) {
        reject();
    }
}

async function actualizarUsuariosMasaEquipos(usuarios, valor, cambioDatos, setCambioDatos, resolve, reject) {
    try {
        await axios.put(
            api.directorio + "usuarios/masa/equipos",
            { id_usuario: usuarios, valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        );

        setCambioDatos(!cambioDatos);
        resolve();
    } catch (error) {
        reject();
    }
}

export {
    crearUsuario,
    eliminarUsuario,
    conseguirUsuarios,
    conseguirUsuarioPorId,
    actualizarPerfil,
    actualizarUsuario,
    actualizarUsuariosMasaRoles,
    actualizarUsuariosMasaEquipos,
};
