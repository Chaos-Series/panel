import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

import ModalEnlazar from "./ModalEnlazar/ModalEnlazar";
import ModalEnlazarRedSocial from "./ModalEnlazar/ModalEnlazarRedSocial";
import ModalEliminar from "./ModalEnlazar/ModalEliminar";

export default function Enlazar(cuentas) {

    if(Object.keys(cuentas).length == 0){
        return (
            <Card className="py-4 w-full h-[425px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex mb-[1rem] w-full justify-between items-center">
                    <h4 className="font-[800] text-2xl">Enlaces</h4>
                </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="overflow-y-scroll no-scrollbar flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Circuito Tormenta</h3>
                    </div>
                    <div className="flex gap-2">
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Twitter</h3>
                    </div>
                    <div className="flex gap-2">
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Discord</h3>
                    </div>
                    <div className="flex gap-2">
                    </div>
                </div>
            </CardBody>
        </Card>
        )
    }

    

    return (
        <Card className="py-4 w-full h-[425px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex mb-[1rem] w-full justify-between items-center">
                    <h4 className="font-[800] text-2xl">Enlaces</h4>
                    {<ModalEnlazar info={cuentas.usuario} cambioDatos={cuentas.cambioDatos} />}
                </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="overflow-y-scroll no-scrollbar flex flex-col gap-6 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Circuito Tormenta</h3>
                        <h4 className="font-[300] text-sm">{cuentas.usuario.info["circuitotormenta"]}</h4>
                    </div>
                    <div className="flex gap-2">
                        {cuentas.usuario.info["circuitotormenta"] != null ?
                            <>
                                <ModalEnlazarRedSocial usuario={cuentas.usuario} tipo={"circuitotormenta"} cambioDatos={cuentas.cambioDatos} />
                                <ModalEliminar usuario={cuentas.usuario} tipo={"circuitotormenta"} cambioDatos={cuentas.cambioDatos} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Twitter</h3>
                        <h4 className="font-[300] text-sm">{"@" + cuentas.usuario.info["twitter"]}</h4>
                    </div>
                    <div className="flex gap-2">
                        {cuentas.usuario.info["twitter"] != null ?
                            <>
                                <ModalEnlazarRedSocial usuario={cuentas.usuario} tipo={"twitter"} cambioDatos={cuentas.cambioDatos} />
                                <ModalEliminar usuario={cuentas.usuario} tipo={"twitter"} cambioDatos={cuentas.cambioDatos} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-[600] text-lg">Discord</h3>
                        <h4 className="font-[300] text-sm">{cuentas.usuario.info["discord"]}</h4>
                    </div>
                    <div className="flex gap-2">
                        {cuentas.usuario.info["discord"] != null ?
                            <>
                                <ModalEnlazarRedSocial usuario={cuentas.usuario} tipo={"discord"} cambioDatos={cuentas.cambioDatos} />
                                <ModalEliminar usuario={cuentas.usuario} tipo={"discord"} cambioDatos={cuentas.cambioDatos} />
                            </> :
                            <></>
                        }
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}