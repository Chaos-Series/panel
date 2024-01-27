import { useState, useMemo } from "react";

import md5 from "md5";

import { actualizarUsuario } from "../../../services/usuarios";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalJugadores(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState()

    let equiposOrdenados = info.equipos && info.equipos.sort(function (a, b) {
        var textA = a.nombre_equipo.toUpperCase();
        var textB = b.nombre_equipo.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const RenderInput = (columna) => {
        const [selectedKeys, setSelectedKeys] = useState(new Set(["Seleccionar"]));

        const selectedValu = useMemo(
            () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
            [selectedKeys]
        );

        switch (columna) {
            case "rol":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize"
                            >
                                {selectedValu}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selection Rol"
                            className="h-[19.5rem] overflow-y-auto"
                            variant="solid"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Usuario"} value={0} onPress={(e) => { setValor(e.target.value) }}>Usuario</DropdownItem>
                                <DropdownItem key={"Jugador"} value={1} onPress={(e) => { setValor(e.target.value) }}>Jugador</DropdownItem>
                                <DropdownItem key={"Jugador Reserva"} value={2} onPress={(e) => { setValor(e.target.value) }}>Jugador Reserva</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Coach"} value={5} onPress={(e) => { setValor(e.target.value) }}>Coach</DropdownItem>
                                <DropdownItem key={"Manager"} value={6} onPress={(e) => { setValor(e.target.value) }}>Manager</DropdownItem>
                                <DropdownItem key={"Sub-Presidente"} value={7} onPress={(e) => { setValor(e.target.value) }}>Sub-Presidente</DropdownItem>
                                <DropdownItem key={"Presidente"} value={8} onPress={(e) => { setValor(e.target.value) }}>Presidente</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Caster"} value={10} onPress={(e) => { setValor(e.target.value) }}>Caster</DropdownItem>
                                <DropdownItem key={"Realizador"} value={11} onPress={(e) => { setValor(e.target.value) }}>Realizador</DropdownItem>
                                <DropdownItem key={"Community Manager"} value={12} onPress={(e) => { setValor(e.target.value) }}>Community Manager</DropdownItem>
                                <DropdownItem key={"Diseñador"} value={13} onPress={(e) => { setValor(e.target.value) }}>Diseñador</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Arbrito"} value={15} onPress={(e) => { setValor(e.target.value) }}>Arbrito</DropdownItem>
                                <DropdownItem key={"Arbitro Jefe"} value={16} onPress={(e) => { setValor(e.target.value) }}>Arbitro Jefe</DropdownItem>
                                <DropdownItem key={"Desarrollador"} value={17} onPress={(e) => { setValor(e.target.value) }}>Desarrollador</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"CTO"} value={20} onPress={(e) => { setValor(e.target.value) }}>CTO</DropdownItem>
                                <DropdownItem key={"CMO"} value={21} onPress={(e) => { setValor(e.target.value) }}>CMO</DropdownItem>
                                <DropdownItem key={"COO"} value={22} onPress={(e) => { setValor(e.target.value) }}>COO</DropdownItem>
                                <DropdownItem key={"CEO"} value={23} onPress={(e) => { setValor(e.target.value) }}>CEO</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                )
            case "id_equipo":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize"
                            >
                                {selectedValu}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selection Rol"
                            className="h-[19.5rem] overflow-y-auto"
                            variant="solid"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <DropdownSection>
                                {equiposOrdenados && equiposOrdenados.map((equipito) => (
                                    <DropdownItem key={equipito.id_equipo} value={equipito.id_equipo} onPress={(e) => { setValor(e.target.value) }}>{equipito.nombre_equipo}</DropdownItem>
                                ))}
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                )
            case "edad":
                return (
                    <Input type="date" placeholder={info.jugador[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
                )
            case "contra":
                return (
                    <Input type="password" className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
                )
            default:
                return (
                    <Input type="text" placeholder={info.jugador[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
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
                        actualizarUsuario(info, info.columna.modificar, contrasenaEncriptada, info.cambioDatos, info.setCambioDatos, resolve, reject)
                        resolve()
                    }), {
                        loading: 'Actualizando contraseña',
                        success: 'Contraseña actualizada',
                        error: 'Error',
                    });
                }
            )
        } else {
            toast.promise(() => new Promise((resolve, reject) => {
                if (info.columna.modificar == "edad") {
                    actualizarUsuario(info, info.columna.modificar, (Date.parse(valor) / 1000.0), info.cambioDatos, info.setCambioDatos, resolve, reject)
                } else {
                    actualizarUsuario(info, info.columna.modificar, valor, info.cambioDatos, info.setCambioDatos, resolve, reject)
                }
            }), {
                loading: 'Modificando usuario',
                success: 'Usuario modificado',
                error: 'Error',
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen} size="sm" isIconOnly aria-label="Modificar" color="warning"><i className="fa-solid fa-hammer text-white"></i></Button>
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
                                {RenderInput(info.columna.modificar)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != null) {
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
