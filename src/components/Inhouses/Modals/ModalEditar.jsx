import { useState, useMemo } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from 'sonner'

export default function ModalEquipos(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState("")

    const RenderInput = (tipo, columna) => {
        const [selectedKeysLiga, setSelectedKeysLiga] = useState(new Set([info.equipo.nombre_liga]));

        const selectedValueLiga = useMemo(
            () => Array.from(selectedKeysLiga).join(", ").replaceAll("_", " "),
            [selectedKeysLiga]
        );

        const [selectedKeysTemporada, setSelectedKeysTemporada] = useState(new Set([info.equipo.nombre_temporada]));

        const selectedValueTemporada = useMemo(
            () => Array.from(selectedKeysTemporada).join(", ").replaceAll("_", " "),
            [selectedKeysTemporada]
        );

        const [selectedKeysStage, setSelectedKeysStage] = useState(new Set([info.equipo.stage]));

        const selectedValueStage = useMemo(
            () => Array.from(selectedKeysStage).join(", ").replaceAll("_", " "),
            [selectedKeysStage]
        );

        if (tipo == "number") {
            switch (columna) {
                case "id_liga":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize"
                                >
                                    {selectedValueLiga}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Selection Liga"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeysLiga}
                                onSelectionChange={setSelectedKeysLiga}
                            >
                                {info.ligas.map((liga) => (
                                    <DropdownItem key={liga.nombre_liga} value={liga.id_liga} onPress={(e) => { setValor(e.target.value) }}>{liga.nombre_liga}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    )
                case "id_temporada":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize"
                                >
                                    {selectedValueTemporada}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Selection Temporada"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeysTemporada}
                                onSelectionChange={setSelectedKeysTemporada}
                            >
                                {info.temporadas.map((temporada) => (
                                    <DropdownItem key={temporada.nombre_temporada} value={temporada.id_temporada} onPress={(e) => { setValor(e.target.value) }}>{temporada.nombre_temporada}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    )
                case "stage":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize"
                                >
                                    {selectedKeysStage}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Selection Stage"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedValueStage}
                                onSelectionChange={setSelectedKeysStage}
                            >
                                <DropdownItem key={"Fase Regular"} onPress={(e) => { setValor(e.target.innerText) }}>Fase Regular</DropdownItem>
                                <DropdownItem key={"Octavos"} onPress={(e) => { setValor(e.target.innerText) }}>Octavos</DropdownItem>
                                <DropdownItem key={"Cuartos"} onPress={(e) => { setValor(e.target.innerText) }}>Cuartos</DropdownItem>
                                <DropdownItem key={"Semifinal"} onPress={(e) => { setValor(e.target.innerText) }}>Semifinal</DropdownItem>
                                <DropdownItem key={"Final"} onPress={(e) => { setValor(e.target.innerText) }}>Final</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
            }
        } else {
            return (
                <Input type="text" placeholder={info.equipo[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
            )
        }
    }

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            axios.put(api.directorio + "modificarequipo", { id: info.equipo.id_equipo, columna: info.columna.modificar, valor: valor }).then(function () {
                sendLog(16, "Modificar Equipo", { id_equipo: info.equipo.id_equipo, nombre_equipo: info.equipo.nombre_equipo, columna_modificada: info.columna.modificar, valor_modificado: valor })
                info.setCambioDatos(!info.cambioDatos)
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Modificando equipo',
            success: 'Equipo modificado',
            error: 'Error',
        });
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
                            <ModalHeader className="flex flex-col gap-1">Modificar {info.columna.name}</ModalHeader>
                            <ModalBody>
                                {RenderInput(info.columna.tipo, info.columna.modificar)}
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
