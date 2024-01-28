/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";

import { inscribirseInhouse } from "../../../services/partidos";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalInscribirse({ inhouse, blueLleno, redLleno, cambioDatos, setCambioDatos }) {

    let usuario = JSON.parse(localStorage.getItem("usuario"))

    const [side, setSide] = useState(0)

    const [selectedKeysSide, setSelectedKeysSide] = useState(new Set(["Escoger lado"]));

    const selectedValueSide = useMemo(
        () => Array.from(selectedKeysSide).join(", ").replaceAll("_", " "),
        [selectedKeysSide]
    );

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            if (side == 1) {
                inscribirseInhouse(inhouse.id_partido, usuario.info.id_usuario, side, blueLleno, cambioDatos, setCambioDatos, resolve, reject)
            } else if (side == 2) {
                inscribirseInhouse(inhouse.id_partido, usuario.info.id_usuario, side, redLleno, cambioDatos, setCambioDatos, resolve, reject)
            } else {
                reject()
                toast.error("Debes escoger un lado.")
            }

        }), {
            loading: 'Inscribiéndose',
            success: 'Inscrito',
            error: 'Error',
        });
    }

    return (
        <div className="float-right">
            {usuario.info.rol >= 20 && 
                <Button color="primary" onPress={onOpen} endContent={<i className="fa-solid fa-arrow-right-to-bracket"></i>}>
                    Inscribirse
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
                            <ModalHeader className="flex flex-col gap-1">Escoger lado</ModalHeader>
                            <ModalBody>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize"
                                        >
                                            {selectedValueSide}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Selection Side"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeysSide}
                                        onSelectionChange={setSelectedKeysSide}
                                    >
                                        {/* isReadOnly="true" color="danger" */}
                                        <DropdownItem key={"Blueside"} value={1} onPress={(e) => { setSide(e.target.value) }}>{"Blueside"}</DropdownItem>
                                        <DropdownItem key={"Redside"} value={2} onPress={(e) => { setSide(e.target.value) }}>{"Redside"}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    handleUpload()
                                }}>
                                    Inscribirse
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
