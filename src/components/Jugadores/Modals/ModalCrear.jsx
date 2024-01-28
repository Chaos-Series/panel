import { useState, useMemo } from "react";

import { crearUsuario } from "../../../services/usuarios"

import getEdad from "../../../utils/getEdad";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalUsuarios(cambioDatos) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedKeys, setSelectedKeys] = useState(new Set(["Permisos"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [nick, setNick] = useState("")
    const [edad, setEdad] = useState(0)
    const [contra, setContra] = useState()
    const [rol, setRol] = useState(0)

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            if (getEdad((Date.parse(edad) / 1000.0)) >= 16) {
                crearUsuario(nombre, apellido, nick, (Date.parse(edad) / 1000.0), rol, contra, resolve, reject, cambioDatos.cambioDatos, cambioDatos.setCambioDatos)
            } else {
                reject()
                toast.error("El usuario debe de tener 16 años o más")
            }

        }), {
            loading: 'Creando usuario',
            success: 'Usuario creado',
            error: 'Error',
        });
    }

    return (
        <>
            <Button color="primary" onPress={onOpen} endContent={<i className="fa-solid fa-plus"></i>}>
                Crear Usuario
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Usuario</ModalHeader>
                            <ModalBody>
                                <Input type="text" placeholder="Nombre" className="w-full sm:max-w-[100%]" onChange={(e) => { setNombre(e.target.value) }} isRequired />
                                <Input type="text" placeholder="Apellido" onChange={(e) => { setApellido(e.target.value) }} isRequired />
                                <Input type="text" placeholder="Nick" onChange={(e) => { setNick(e.target.value) }} isRequired />
                                <Input type="date" placeholder="Edad" onChange={(e) => { setEdad(e.target.value) }} isRequired />
                                <Input type="password" placeholder="Contraseña" onChange={(e) => { setContra(e.target.value) }} isRequired />
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize"
                                        >
                                            {selectedValue}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Selection Stage"
                                        variant="solid"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={setSelectedKeys}
                                    >
                                        <DropdownSection showDivider={true}>
                                            <DropdownItem key={0} onPress={(e) => { setRol(e.target.value) }}>Usuario</DropdownItem>
                                            <DropdownItem key={1} onPress={(e) => { setRol(e.target.value) }}>Jugador</DropdownItem>
                                            <DropdownItem key={2} onPress={(e) => { setRol(e.target.value) }}>Jugador Reserva</DropdownItem>
                                        </DropdownSection>

                                        <DropdownSection showDivider={true}>
                                            <DropdownItem key={5} onPress={(e) => { setRol(e.target.value) }}>Coach</DropdownItem>
                                            <DropdownItem key={6} onPress={(e) => { setRol(e.target.value) }}>Manager</DropdownItem>
                                            <DropdownItem key={7} onPress={(e) => { setRol(e.target.value) }}>Sub-Presidente</DropdownItem>
                                            <DropdownItem key={8} onPress={(e) => { setRol(e.target.value) }}>Presidente</DropdownItem>
                                        </DropdownSection>

                                        <DropdownSection showDivider={true}>
                                            <DropdownItem key={10} onPress={(e) => { setRol(e.target.value) }}>Caster</DropdownItem>
                                            <DropdownItem key={11} onPress={(e) => { setRol(e.target.value) }}>Realizador</DropdownItem>
                                            <DropdownItem key={12} onPress={(e) => { setRol(e.target.value) }}>Community Manager</DropdownItem>
                                            <DropdownItem key={13} onPress={(e) => { setRol(e.target.value) }}>Diseñador</DropdownItem>
                                        </DropdownSection>

                                        <DropdownSection showDivider={true}>
                                            <DropdownItem key={15} onPress={(e) => { setRol(e.target.value) }}>Arbrito</DropdownItem>
                                            <DropdownItem key={16} onPress={(e) => { setRol(e.target.value) }}>Arbitro Jefe</DropdownItem>
                                            <DropdownItem key={17} onPress={(e) => { setRol(e.target.value) }}>Desarrollador</DropdownItem>
                                        </DropdownSection>

                                        <DropdownSection showDivider={true}>
                                            <DropdownItem key={20} onPress={(e) => { setRol(e.target.value) }}>CTO</DropdownItem>
                                            <DropdownItem key={21} onPress={(e) => { setRol(e.target.value) }}>CMO</DropdownItem>
                                            <DropdownItem key={22} onPress={(e) => { setRol(e.target.value) }}>COO</DropdownItem>
                                            <DropdownItem key={23} onPress={(e) => { setRol(e.target.value) }}>CEO</DropdownItem>
                                        </DropdownSection>
                                    </DropdownMenu>
                                </Dropdown>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (nombre == "")
                                        setNombre("NECESITA MODIFICACIÓN")
                                    if (apellido == "")
                                        setApellido("NECESITA MODIFICACIÓN")
                                    if (edad == "" || edad == 0)
                                        setEdad("2000-01-01")
                                    if (nombre != "" && apellido != "" && nick != "" ) {
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
