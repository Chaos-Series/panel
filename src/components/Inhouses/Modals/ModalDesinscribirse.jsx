/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";

import { inscribirseInhouse } from "../../../services/partidos";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import { toast } from "sonner";

export default function ModalDesinscribirse({ inhouse, blueLleno, redLleno, cambioDatos, setCambioDatos }) {
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  const [confirmacion, setConfirmacion] = useState(false);

  const cambiarConfirmacion = () => {
    setConfirmacion(!confirmacion);
  };

  const [selectedKeysSide, setSelectedKeysSide] = useState(new Set(["Escoger lado"]));

  const selectedValueSide = useMemo(() => Array.from(selectedKeysSide).join(", ").replaceAll("_", " "), [selectedKeysSide]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUpload = () => {
    toast.promise(
      () =>
        new Promise((resolve, reject) => {
          if (side == 1) {
            inscribirseInhouse(inhouse.id_partido, usuario.info.id_usuario, side, blueLleno, cambioDatos, setCambioDatos, resolve, reject);
          } else if (side == 2) {
            inscribirseInhouse(inhouse.id_partido, usuario.info.id_usuario, side, redLleno, cambioDatos, setCambioDatos, resolve, reject);
          } else {
            reject();
            toast.error("Debes escoger un lado.");
          }
        }),
      {
        loading: "Inscribiéndose",
        success: "Inscrito",
        error: "Error",
      }
    );
  };

  return (
    <div className="float-right">
      {(usuario.info.rol >= 20) &&
        <Button color="danger" onPress={onOpen} endContent={<i className="fa-solid fa-arrow-right-to-bracket"></i>}>
          Desinscribirse
        </Button>
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Salir</ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center gap-2 mb-8">
                  <Checkbox onChange={cambiarConfirmacion} id="checkBoxConfirmacion">
                    ¿Estás seguro de que quieres salir de la inhouse?
                  </Checkbox>
                </div>
                <div className="flex justify-evenly">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={() => {
                      //   if (confirmacion) {
                      //     confirmarBorracion();
                      //     setConfirmacion(false);
                      //   } else {
                      //     toast.error("No has confirmado.");
                      //     setConfirmacion(false);
                      //   }
                    }}
                  >
                    Confirmar
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
