import { useState } from "react";

import { actualizarEnlace } from "../../../services/enlaces";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalEnlazarRedSocial(datos) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState()

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            actualizarEnlace(datos.usuario, null, datos.tipo, valor, resolve, reject, datos.cambioDatos, datos.setCambioDatos)
        }), {
            loading: 'Añadiendo enlace',
            success: 'Enlace añadido',
            error: 'Error',
        });
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
                            {datos.tipo == "twitter" ? (<>
                                <ModalHeader className="flex flex-col gap-1">{"Modificar " + (datos.tipo.charAt(0).toUpperCase() + datos.tipo.slice(1))}</ModalHeader>
                                <ModalBody>
                                    <Input type="text" placeholder={"Nombre de Cuenta"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }}
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">@</span>
                                            </div>
                                        } />
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
                                        Añadir
                                    </Button>
                                </ModalFooter>
                            </>)

                                : (<>
                                    <ModalHeader className="flex flex-col gap-1">{"Modificar " + (datos.tipo.charAt(0).toUpperCase() + datos.tipo.slice(1))}</ModalHeader>
                                    <ModalBody>
                                        <Input type="text" placeholder={"Nombre de Cuenta"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
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
                                            Añadir
                                        </Button>
                                    </ModalFooter>
                                </>)
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
