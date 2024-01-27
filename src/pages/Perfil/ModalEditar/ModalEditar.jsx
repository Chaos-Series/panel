import { useState } from "react";

import md5 from "md5"
import { actualizarPerfil } from "../../../services/usuarios";

import getEdad from "../../../utils/getEdad";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalPerfil(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState("")

    const RenderInput = (tipo) => {
        if (tipo == "date") {
            return (
                <Input type="date" placeholder={info.jugador.info["edad"]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(Date.parse(e.target.value) / 1000) }} />
            )
        } else if (tipo == "password") {
            return (
                <Input type="password" className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
            )
        } else {
            return (
                <Input type="text" placeholder={info.jugador.info[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
            )
        }
    }

    const handleUpload = () => {
        if (info.columna.tipo == "password") {
            const encriptarPass = () => {
                return new Promise((resolve) => {
                    resolve(md5(valor))
                })
            }

            encriptarPass().then(
                (contrasenaEncriptada) => {
                    toast.promise(() => new Promise((resolve, reject) => {
                        actualizarPerfil(info.jugador, info.columna.uid, contrasenaEncriptada, info.cambioDatos, info.setCambioDatos, resolve, reject)
                    }), {
                        loading: 'Actualizando contraseña',
                        success: 'Contraseña actualizada',
                        error: 'Error',
                    });
                }
            )
        } else if (info.columna.tipo == "date") {
            toast.promise(() => new Promise((resolve, reject) => {
                if (getEdad(valor) >= 16) {
                    actualizarPerfil(info.jugador, info.columna.uid, valor, info.cambioDatos, info.setCambioDatos, resolve, reject)
                } else {
                    toast.error("Tienes que ser mayor de 16 años")
                    reject()
                }
            }), {
                loading: 'Modificando perfil',
                success: 'Perfil modificado',
                error: 'Error',
            });
        } else {
            toast.promise(() => new Promise((resolve, reject) => {
                    actualizarPerfil(info.jugador, info.columna.uid, valor, info.cambioDatos, info.setCambioDatos, resolve, reject)
            }), {
                loading: 'Modificando perfil',
                success: 'Perfil modificado',
                error: 'Error',
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen} color="warning" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-pencil"></i>} />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modificar {info.columna.name == "Edad" ? "Fecha de Nacimiento" : info.columna.name}</ModalHeader>
                            <ModalBody>
                                {RenderInput(info.columna.tipo)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != "") {
                                        handleUpload()
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    Modificar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
