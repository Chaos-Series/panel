import axios from "axios";
import api from "../../variables.json";
import getPosition from "../utils/getPosition";
import sendLog from "../utils/sendLog";
import { toast } from "sonner";

async function crearCuenta(valor, tag = "EUW", valorPrimaria, valorSecundaria, usuario, resolve, reject, cambioDatos) {
    axios
        .get(api.directorio + "cuentas/nombre=" + valor + "&tag=" + tag, { headers: { "x-auth-token": window.localStorage.getItem("token") } })
        .then((checkCuentaLoL) => {
            if (checkCuentaLoL.data.existe) {
                toast.error("Esta cuenta ya ha sido vinculada.");
            } else if (checkCuentaLoL.data.existe == false && checkCuentaLoL.data.success == false) {
                toast.error("Esta cuenta no existe.");
            } else {
                const principal = getPosition(valorPrimaria);
                const secundaria = getPosition(valorSecundaria);
                axios
                    .post(api.directorio + "cuentas", {
                        id_usuario: usuario.info["id_usuario"],
                        invocador: checkCuentaLoL.data.result.gameName,
                        tag: checkCuentaLoL.data.result.tagLine,
                        puuid: checkCuentaLoL.data.result.puuid,
                        linea_principal: principal,
                        linea_secundaria: secundaria,
                    }, { headers: { "x-auth-token": window.localStorage.getItem("token") } })
                    .then((responsePost) => {
                        if (responsePost.data.status == 200) {
                            sendLog(usuario.info["id_usuario"], "Añadir Cuenta", {
                                accion: "Añadir Cuenta",
                                id_usuario: usuario.info["id_usuario"],
                                invocador: valor,
                                tag: tag,
                                puuid: checkCuentaLoL.data.result.puuid,
                                linea_principal: principal,
                                linea_secundaria: secundaria,
                            });
                            cambioDatos(true);
                            resolve();
                        } else if (responsePost.data.status == 500) {
                            toast.error("Error. Avisa a la administración.");
                            reject();
                        }
                    })
                    .catch((e) => {
                        return e;
                    });
            }
        })
        .catch((e) => {
            return e;
        });
}

async function eliminarCuenta(data, resolve, reject, cambioDatos) {
    axios
        .delete(api.directorio + "cuentas", {
            data: { id_cuenta: data.cuenta["id_cuenta"], id_usuario: data.cuenta["id_usuario"] },
            headers: { "x-auth-token": window.localStorage.getItem("token") },
        })
        .then((response) => {
            if (response.data.status == 200) {
                sendLog(data.cuenta["id_usuario"], "Eliminar Cuenta", {
                    accion: "Eliminar Cuenta",
                    id_cuenta: data.cuenta["id_cuenta"],
                });
                cambioDatos(true);
                resolve();
            } else if (response.data.status == 500) {
                toast.error("Error. Avisa a la administración.");
                reject();
            }
        })
        .catch((e) => {
            return e;
        });
}

async function getCuentaPorPUUID(puuid) {
    axios
        .get(api.directorio + "cuentas/puuid=" + puuid, {
            headers: { "x-auth-token": window.localStorage.getItem("token") },
        })
        .then((response) => {
            return response.data.existe ? response.data.result : false
        })
        .catch((e) => {
            return e;
        });
}

export { crearCuenta, eliminarCuenta, getCuentaPorPUUID };
