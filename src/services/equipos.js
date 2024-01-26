import axios from "axios";
import api from "../../variables.json";
import { toast } from "sonner";

async function crearEquipo(nombre, formdata, resolve, reject, cambioDatos) {
    try {
        const comprobacion = await axios.get(api.directorio + "equipos/nombre=" + nombre, { headers: { "x-auth-token": localStorage.getItem("token") } });
        if (comprobacion.data.result.length == 0) {
            const respuesta = await axios.post(api.directorio + "equipos", formdata, { headers: { "x-auth-token": localStorage.getItem("token") } });
            if (respuesta.data.status == 200) {
                cambioDatos(true);
                resolve();
            } else {
                reject();
            }
        } else {
            toast.error("Este equipo ya existe.");
            reject();
        }
    } catch (error) {
        reject();
    }
}

async function eliminarEquipo(id, resolve, reject, cambioDatos) {
    try {
        const respuesta = await axios.delete(api.directorio + "equipos", { data: { id: id }, headers: { "x-auth-token": localStorage.getItem("token") } });
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

async function conseguirEquipos(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirEquiposPorId(idEquipo, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos/id=" + idEquipo, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirLigas(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "ligas", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirTemporadas(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "temporadas", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirUsuarios(idEquipo, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos/usuarios/id=" + idEquipo, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modificarEquipo(info, valor, resolve, reject, setCambioDatos) {
    try {
        await axios.put(api.directorio + "equipos", { id: info.equipo[0].id_equipo, columna: info.columna.modificar, valor: valor }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(true);
        resolve();
    } catch (error) {
        reject();
    }
}

export { crearEquipo, eliminarEquipo, conseguirEquipos, conseguirEquiposPorId, conseguirLigas, conseguirTemporadas, conseguirUsuarios, modificarEquipo };
