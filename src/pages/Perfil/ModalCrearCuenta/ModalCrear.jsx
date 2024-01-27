import { useState, useMemo } from "react";

import { crearCuenta } from "../../../services/cuentas";
import { actualizarEnlace } from "../../../services/enlaces";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalCrearCuenta(info) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState("")
    const [tag, setTag] = useState("EUW")
    const [valorPrimaria, setValorPrimaria] = useState("")
    const [valorSecundaria, setValorSecundaria] = useState("")

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            if (info.modificarExistente) return actualizarEnlace(info.usuario, info.cuenta, info.tipo, valor, resolve, reject, info.cambioDatos, info.setCambioDatos, [tag, valorPrimaria, valorSecundaria])
            
            crearCuenta(valor, tag, valorPrimaria, valorSecundaria, info.usuario, resolve, reject, info.cambioDatos, info.setCambioDatos)
        }), {
            loading: (info.modificarExistente ? "Actualizando" : "Añadiendo") + " cuenta",
            success: "Cuenta " + (info.modificarExistente ? "actualizada" : "anadida"),
            error: 'Error',
        });
    }

    const RenderInput = () => {
        const [selectedKeys, setSelectedKeys] = useState(new Set(["Linea Principal"]));
        const [selectedKeysSecundaria, setSelectedKeysSecundaria] = useState(new Set(["Linea Secundaria"]));

        const selectedValue = useMemo(
            () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
            [selectedKeys]
        );

        const selectedValueSecundaria = useMemo(
            () => Array.from(selectedKeysSecundaria).join(", ").replaceAll("_", " "),
            [selectedKeysSecundaria]
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
                        <DropdownItem key={"Toplane"} value={1} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Toplane"}</DropdownItem>
                        <DropdownItem key={"Jungla"} value={2} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Jungla"}</DropdownItem>
                        <DropdownItem key={"Midlane"} value={3} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Midlane"}</DropdownItem>
                        <DropdownItem key={"ADC"} value={4} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"ADC"}</DropdownItem>
                        <DropdownItem key={"Support"} value={5} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Support "}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize w-full"
                        >
                            {selectedValueSecundaria}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Selection Rol"
                        className="h-full overflow-y-auto"
                        variant="solid"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysSecundaria}
                        onSelectionChange={setSelectedKeysSecundaria}
                    >
                        <DropdownItem key={"Toplane"} value={1} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Toplane"}</DropdownItem>
                        <DropdownItem key={"Jungla"} value={2} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Jungla"}</DropdownItem>
                        <DropdownItem key={"Midlane"} value={3} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Midlane"}</DropdownItem>
                        <DropdownItem key={"ADC"} value={4} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"ADC"}</DropdownItem>
                        <DropdownItem key={"Support"} value={5} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Support"}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }

    return (
        <>
            {info.modificarExistente ?
                (
                    <Button onClick={onOpen} color="warning" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-pencil"></i>} />
                )
                :
                (
                    <Button onClick={onOpen} color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                        Nueva Cuenta
                    </Button>
                )
            }

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{(info.modificarExistente ? "Editar" : "Anadir") + " cuenta de League of Legends"}</ModalHeader>
                            <ModalBody>
                                <div className="flex justify-between items-center">
                                    <Input type="text" placeholder={"Riot ID"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
                                    <div className="flex justify-end items-center">
                                        <Input
                                            type="text"
                                            placeholder="EUW"
                                            labelPlacement="outside"
                                            className="w-full sm:max-w-[90%]"
                                            onChange={(e) => { setTag(e.target.value) }}
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">#</span>
                                                </div>
                                            }
                                        />

                                    </div>
                                </div>
                                <div>
                                    {RenderInput()}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != "" && valorPrimaria != "" && valorSecundaria != "") {
                                        if (valorPrimaria == valorSecundaria) {
                                            toast.error("No puedes poner la misma línea como ambas opciones.")
                                        } else {
                                            handleUpload();
                                        }
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    {info.modificarExistente ? "Confirmar" : "Añadir"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
