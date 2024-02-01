import { useState } from "react";

import { crearEquipo } from "../../../services/equipos";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalEquipos(cambioDatos) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [file, setFile] = useState()
    const [nombre, setNombre] = useState("")
    const [acronimo, setAcronimo] = useState("")

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = () => {
        const formdata = new FormData()
        formdata.append("imagenEquipo", file)
        formdata.append("nombre", nombre);
        formdata.append("acronimo", acronimo);
        toast.promise(() => new Promise((resolve, reject) => {
            crearEquipo(nombre, formdata, resolve, reject, cambioDatos.cambioDatos, cambioDatos.setCambioDatos)
        }), {
            loading: 'Creando equipo',
            success: 'Equipo creado',
            error: 'Error',
        });
    }

    return (
        <>
            <Button color="primary" onPress={onOpen} endContent={<i className="fa-solid fa-plus"></i>}>
                Crear Equipo
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Equipo</ModalHeader>
                            <ModalBody>
                                <Input type="text" placeholder="Nombre" className="w-full sm:max-w-[100%]" onChange={(e) => { setNombre(e.target.value) }} isRequired />
                                <Input type="text" variant={"flat"} placeholder="Acrónimo (MÁX 3 CARÁCTERES)" onChange={(e) => { setAcronimo(e.target.value) }} isRequired />
                                <Input id="upload" type="file" variant={"flat"} onChange={handleFile} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (file != undefined && nombre != "" && acronimo != "") {
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
