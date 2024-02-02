import { useState, useMemo } from "react";

import { modificarEquipo, modificarClasificacion } from "../../../services/equipos";

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
        case "puntuacion":
          return (
            <Input type="number" placeholder="Puntuación" onChange={(e) => { setValor(e.target.value) }} isRequired />
          )
        case "victorias":
          return (
            <Input type="number" placeholder="Victorias" onChange={(e) => { setValor(e.target.value) }} isRequired />
          )
        case "derrotas":
          return (
            <Input type="number" placeholder="Derrotas" onChange={(e) => { setValor(e.target.value) }} isRequired />
          )
      }
    } else {
      return (
        <Input type="text" placeholder={info.equipo[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
      )
    }
  }

  const handleUpload = () => {
    const editarEstadisticas = info.columna.modificar === "puntuacion" || info.columna.modificar === "victorias" || info.columna.modificar === "derrotas";
    toast.promise(() => new Promise((resolve, reject) => {
      if (editarEstadisticas) modificarClasificacion(info, valor, resolve, reject, info.cambioDatos, info.setCambioDatos)
      modificarEquipo(info, valor, resolve, reject, info.cambioDatos, info.setCambioDatos)
    }), {
      loading: 'Modificando equipo',
      success: 'Equipo modificado',
      error: 'Error',
    });
  }

  return (
    <>
      <Button onClick={onOpen} size="sm" isIconOnly aria-label="Modificar" color="warning"><i className="fa-solid fa-hammer"></i></Button>
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
