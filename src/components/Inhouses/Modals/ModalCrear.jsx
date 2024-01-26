import { useState } from "react";

import { crearInhouse } from "../../../services/partidos";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalEquipos(cambioDatos) {

    let usuario = JSON.parse(localStorage.getItem("usuario"))

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [fecha, setFecha] = useState()

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            crearInhouse(fecha, resolve, reject, cambioDatos.cambioDatos)
        }), {
            loading: 'Creando inhouse',
            success: 'Inhouse creado',
            error: 'Error',
        });
    }

    return (
        <>
            {(usuario.info.rol >= 20) &&
                <Button color="primary" onPress={onOpen} endContent={<i className="fa-solid fa-plus"></i>}>
                    Crear Inhouse
                </Button>
            }
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Inhouse</ModalHeader>
                            <ModalBody>
                                <Input type="datetime-local" placeholder="Fecha" onChange={(e) => { setFecha(e.target.value) }} isRequired />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    console.log(fecha)
                                    if (fecha != "") {
                                        handleUpload()
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
