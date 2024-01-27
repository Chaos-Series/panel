import { getCuentaPorPUUID } from '../../../services/cuentas';
import { Button } from "@nextui-org/react";
import axios from "axios";
import api from "../../../../variables.json"
import sendLog from '../../../utils/sendLog';
import { toast } from "sonner";


export default function RefrescarCuenta(info) {

    const refreshCuenta = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            getCuentaPorPUUID(info.cuenta.puuid_lol).then((cuentaLoL) => {
                axios
                    .put(api.directorio + "cuentas", {
                        id_usuario: info.usuario.info.id_usuario,
                        id: info.cuenta.id_cuenta,
                        invocador: cuentaLoL.gameName,
                        tag: cuentaLoL.tagLine,
                        puuid_lol: cuentaLoL.puuid,
                        linea_principal: info.cuenta.linea_principal,
                        linea_secundaria: info.cuenta.linea_secundaria,
                    }, { headers: { "x-auth-token": window.localStorage.getItem("token") } }
                    )
                    .then(function (response) {
                        if (response.data.status == 200) {
                            sendLog(info.usuario.info.id_usuario, "Refrescar Cuenta", {
                                accion: "Refrescar Cuenta",
                                id_usuario: info.usuario.info.id_usuario,
                            });
                            info.setCambioDatos(!info.cambioDatos);
                            resolve();
                        } else if (response.data.status == 500) {
                            toast.error("Error. Avisa a la administración.");
                            reject();
                        } else if (response.data.status == 409) {
                            toast.error("La cuenta ya ha sido vinculada.");
                            reject();
                        }
                    })
                    .catch((e) => {
                        toast.error("Error. Avisa a la administración.");
                        reject();
                        console.log(e);
                    });
            });
        }), {
            loading: "Sincronizando cuenta",
            success: "Cuenta sincronizada",
            error: 'Error',
        });
    }

    return (
        <Button onClick={refreshCuenta} color="success" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-arrows-rotate"></i>} />
    );
}
