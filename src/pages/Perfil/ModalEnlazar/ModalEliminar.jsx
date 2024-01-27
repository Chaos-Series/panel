import { useState } from "react";

import { eliminarEnlace } from "../../../services/enlaces";

import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Checkbox } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalEliminar(datos) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [confirmacion, setConfirmacion] = useState(false)

    const cambiarConfirmacion = () => {
        setConfirmacion(!confirmacion)
    }

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            eliminarEnlace(datos.usuario, datos.tipo, resolve, reject, datos.cambioDatos, datos.setCambioDatos)
        }), {
            loading: 'Eliminando enlace',
            success: 'Enlace eliminado',
            error: 'Error',
        });
    }

    return (
        <>
            <Button onClick={onOpen} color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"Eliminar Enlace"}</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col justify-center gap-2 mb-8">
                                    <Checkbox onChange={cambiarConfirmacion} id="checkBoxConfirmacion">¿Estás seguro de que quieres eliminar el enlace?</Checkbox>
                                </div>
                                <div className="flex justify-evenly">
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onPress={onClose} onClick={() => {
                                        if (confirmacion) {
                                            handleUpload()
                                            setConfirmacion(false)
                                        } else {
                                            toast.error('No has confirmado.')
                                            setConfirmacion(false)
                                        }
                                    }}>
                                        Confirmar
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
