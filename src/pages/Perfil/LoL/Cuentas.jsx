import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

import ModalCrearCuenta from "../ModalCrearCuenta/ModalCrear";
import ModalEliminarCuenta from "../ModalCrearCuenta/ModalEliminar";
import RefrescarCuenta from "./RefrescarCuenta";

export default function Cuentas(usuario) {

    if (Object.keys(usuario).length == 0) {
        return (
            <Card className="py-4 w-full h-[273px]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <div className="flex mb-[1rem] w-full justify-between items-center">
                        <h4 className="font-[800] text-2xl">Cuentas</h4>
                        {/* <ModalCrearCuenta usuario={usuario.usuario} cambioDatos={usuario.cambioDatos}></ModalCrearCuenta> */}
                    </div>
                </CardHeader>
                <Divider className="mt-2" />
                <CardBody className="flex flex-col gap-6 overflow-y-auto no-scrollbar">
                    {/* {usuario.usuario.cuentas && usuario.usuario.cuentas.map((cuenta) => {
                        return (
                            <div key={cuenta.id_cuenta} className="flex justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-[600] text-lg">{cuenta.invocador + "#" + cuenta.tag}</h3>
                                    <h4 className="font-[300] text-sm">{cuenta.linea_principal}, {cuenta.linea_secundaria}</h4>
                                </div>
                                <ModalEliminarCuenta cuenta={cuenta} cambioDatos={usuario.cambioDatos} />
                            </div>
                        )
                    })} */}
                </CardBody>
            </Card>
        )
    }

    return (
        <Card className="py-4 w-full h-[273px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex mb-[1rem] w-full justify-between items-center">
                    <h4 className="font-[800] text-2xl">Cuentas</h4>
                    <ModalCrearCuenta usuario={usuario.usuario} cambioDatos={usuario.cambioDatos} />
                </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="flex flex-col gap-6 overflow-y-auto no-scrollbar p-4">
                {usuario.usuario.cuentas && usuario.usuario.cuentas.map((cuenta) => {
                    return (
                        <div key={cuenta.id_cuenta} className="flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-[600] text-lg">{cuenta.invocador + "#" + cuenta.tag}</h3>
                                <h4 className="font-[300] text-sm">{cuenta.linea_principal}, {cuenta.linea_secundaria}</h4>
                            </div>
                            <div className="flex gap-2">
                                <RefrescarCuenta usuario={usuario.usuario} cuenta={cuenta} cambioDatos={usuario.cambioDatos} />
                                <ModalCrearCuenta usuario={usuario.usuario} cuenta={cuenta} cambioDatos={usuario.cambioDatos} tipo={"cuentas_lol"}  modificarExistente />
                                <ModalEliminarCuenta cuenta={cuenta} cambioDatos={usuario.cambioDatos} />
                            </div>
                        </div>
                    )
                })}
            </CardBody>
        </Card>
    )
}