import { useState, useMemo } from "react";

import { actualizarEnlace } from "../../../services/enlaces";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalEnlazar(info) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState(1)
    const [cuenta, setCuenta] = useState("")

    const handleUpload = () => {
        let columna
        switch (valor) {
            case 1:
                columna = "circuitotormenta";
                break;
            case 2:
                columna = "twitter";
                break;
            case 3:
                columna = "discord";
                break;
        }
        toast.promise(() => new Promise((resolve, reject) => {
            actualizarEnlace(info.info, null, columna, cuenta, resolve, reject, info.cambioDatos, info.setCambioDatos)
        }), {
            loading: 'Añadiendo enlace',
            success: 'Enlace añadido',
            error: 'Error',
        });
    }

    const RenderInput = () => {
        const [selectedKeys, setSelectedKeys] = useState(new Set(["Circuito Tormenta"]));

        const selectedValue = useMemo(
            () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
            [selectedKeys]
        );

        return (
            <div className="flex gap-2">
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize w-full"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Selection Rol"
                        className="h-full overflow-y-auto"
                        variant="solid"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key={"Circuito Tormenta"} value={1} onPress={(e) => { setValor(e.target.value) }}>{"Circuito Tormenta"}</DropdownItem>
                        <DropdownItem key={"Twitter"} value={2} onPress={(e) => { setValor(e.target.value) }}>{"Twitter"}</DropdownItem>
                        <DropdownItem key={"Discord"} value={3} onPress={(e) => { setValor(e.target.value) }}>{"Discord"}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {valor == 2 ? (<>
                    <Input type="text" placeholder={"Nombre de Cuenta"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setCuenta(e.target.value) }}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">@</span>
                            </div>
                        } />
                </>) : (<>
                    <Input type="text" placeholder={"Nombre de Cuenta"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setCuenta(e.target.value) }} />
                </>)}
            </div>
        )
    }

    return (
        <>
            <Button onClick={onOpen} color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                Enlazar Cuenta
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"Modificar Enlace"}</ModalHeader>
                            <ModalBody>
                                {RenderInput()}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != "" && cuenta != "") {
                                        handleUpload()
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    Añadir
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
