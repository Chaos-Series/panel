import axios from "axios";
import api from "../../variables.json";
import { toast } from "sonner";

async function crearEquipo(nombre, formdata, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        const comprobacion = await axios.get(api.directorio + "equipos/nombre=" + nombre, { headers: { "x-auth-token": localStorage.getItem("token") } });
        if (comprobacion.data.result.length == 0) {
            const respuesta = await axios.post(api.directorio + "equipos", formdata, { headers: { "x-auth-token": localStorage.getItem("token") } });
            if (respuesta.data.status == 200) {
                setCambioDatos(!cambioDatos);
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

async function eliminarEquipo(id, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.delete(api.directorio + "equipos", { data: { id: id }, headers: { "x-auth-token": localStorage.getItem("token") } });
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

async function conseguirEquipos(cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);

        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirEquiposPorId(idEquipo, cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos/id=" + idEquipo, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirLigas(cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "ligas", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirTemporadas(cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "temporadas", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirClasificacion(cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "clasificacion", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function conseguirClasificacionPorId(cambioDatos, setCambioDatos, id, detalles = false) {
    try {
        const respuesta = await axios.get(api.directorio + (detalles ? `clasificacion/detalles/id=${id}` : `clasificacion/id=${id}`), { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modificarClasificacion(info, valor, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        await axios.put(api.directorio + "clasificacion", { id: info.equipo[0].id_equipo, columna: info.columna.modificar, valor: valor }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        resolve();
    } catch (error) {
        reject();
    }
}

async function conseguirUsuarios(idEquipo, cambioDatos, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos/usuarios/id=" + idEquipo, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        return respuesta.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modificarEquipo(info, valor, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        await axios.put(api.directorio + "equipos", { id: info.equipo[0].id_equipo, columna: info.columna.modificar, valor: valor }, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(!cambioDatos);
        resolve();
    } catch (error) {
        reject();
    }
}


export { crearEquipo, eliminarEquipo, conseguirEquipos, conseguirEquiposPorId, conseguirLigas, conseguirTemporadas, conseguirUsuarios, modificarEquipo, conseguirClasificacion, conseguirClasificacionPorId, modificarClasificacion };
