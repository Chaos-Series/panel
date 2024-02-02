/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";

import { actualizarUsuariosMasaRoles } from "../../../services/usuarios";

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

export default function ModalEditarMasaEquipos({ usuarios, cambioDatos, setCambioDatos }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [valor, setValor] = useState();

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
          <DropdownSection showDivider={true}>
            <DropdownItem
              key={"Usuario"}
              value={0}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Usuario
            </DropdownItem>
            <DropdownItem
              key={"Jugador"}
              value={1}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Jugador
            </DropdownItem>
            <DropdownItem
              key={"Jugador Reserva"}
              value={2}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Jugador Reserva
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider={true}>
            <DropdownItem
              key={"Coach"}
              value={5}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Coach
            </DropdownItem>
            <DropdownItem
              key={"Manager"}
              value={6}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Manager
            </DropdownItem>
            <DropdownItem
              key={"Sub-Presidente"}
              value={7}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Sub-Presidente
            </DropdownItem>
            <DropdownItem
              key={"Presidente"}
              value={8}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Presidente
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider={true}>
            <DropdownItem
              key={"Caster"}
              value={10}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Caster
            </DropdownItem>
            <DropdownItem
              key={"Realizador"}
              value={11}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Realizador
            </DropdownItem>
            <DropdownItem
              key={"Community Manager"}
              value={12}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Community Manager
            </DropdownItem>
            <DropdownItem
              key={"Diseñador"}
              value={13}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Diseñador
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider={true}>
            <DropdownItem
              key={"Arbrito"}
              value={15}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Arbrito
            </DropdownItem>
            <DropdownItem
              key={"Arbitro Jefe"}
              value={16}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Arbitro Jefe
            </DropdownItem>
            <DropdownItem
              key={"Desarrollador"}
              value={17}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              Desarrollador
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider={true}>
            <DropdownItem
              key={"CTO"}
              value={20}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              CTO
            </DropdownItem>
            <DropdownItem
              key={"CMO"}
              value={21}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              CMO
            </DropdownItem>
            <DropdownItem
              key={"COO"}
              value={22}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              COO
            </DropdownItem>
            <DropdownItem
              key={"CEO"}
              value={23}
              onPress={(e) => {
                setValor(e.target.value);
              }}
            >
              CEO
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const handleUpload = () => {
    toast.promise(
      () =>
        new Promise((resolve, reject) => {
          actualizarUsuariosMasaRoles([...usuarios], valor, cambioDatos, setCambioDatos, resolve, reject);
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
        Modificar Roles
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
