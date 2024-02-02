/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";

import { actualizarUsuariosMasaEquipos } from "../../../services/usuarios";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { toast } from "sonner";

export default function ModalEditarMasaEquipos({ usuarios, equipos, cambioDatos, setCambioDatos }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [valor, setValor] = useState();

  let equiposOrdenados =
    equipos &&
    equipos.sort(function (a, b) {
      var textA = a.nombre_equipo.toUpperCase();
      var textB = b.nombre_equipo.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

  const RenderInput = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Seleccionar"]));

    const selectedValu = useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys]);

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
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
            {equiposOrdenados &&
              equiposOrdenados.map((equipito) => (
                <DropdownItem
                  key={equipito.id_equipo}
                  value={equipito.id_equipo}
                  onPress={(e) => {
                    setValor(e.target.value);
                  }}
                >
                  {equipito.nombre_equipo}
                </DropdownItem>
              ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const handleUpload = () => {
    toast.promise(
      () =>
        new Promise((resolve, reject) => {
          actualizarUsuariosMasaEquipos([...usuarios], valor, cambioDatos, setCambioDatos, resolve, reject);
        }),
      {
        loading: "Actualizando usuarios",
        success: "Usuarios actualizados",
        error: "Error",
      }
    );
  };

  return (
    <>
      <Button color="warning" onPress={onOpen} aria-label="Modificar" endContent={<i className="fa-solid fa-hammer"></i>}>
        Modificar Equipos
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modificar Usuarios</ModalHeader>
              <ModalBody>{RenderInput()}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => {
                    if (valor != null) {
                      handleUpload();
                    } else {
                      toast.error("No has rellenado todos los campos.");
                    }
                  }}
                >
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
