/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";

import api from "../../../variables.json";

import ModalEquipos from "./Modals/ModalEditar";
import ModalJugadores from "../Jugadores/Modals/ModalEditar";

import getEdad from "../../utils/getEdad";
import getPerms from "../../utils/getPerms";

import { columnsEquipo } from "./data";
import { columns } from "../Jugadores/data";

export default function Equipo({ equipo, ligas, temporadas, jugadores, cambioDatos, setCambioDatos }) {
  const renderChip = (activo) => {
    switch (activo) {
      case 0:
        return (
          <Chip startContent={<i className="fa-solid fa-xmark"></i>} variant="flat" color="danger" className="pl-2">
            Inactivo
          </Chip>
        );
      case 1:
        return (
          <Chip startContent={<i className="fa-solid fa-check"></i>} variant="flat" color="success" className="pl-2">
            Activo
          </Chip>
        );
    }
  };

  const renderJugadores = () =>
    jugadores &&
    jugadores.map((jugador) => {
      return (
        <div key={jugador["id_jugador"]} className="flex flex-col gap-8">
          <div className="flex gap-16">
            <Card className="max-w-[300px] w-full">
              <CardHeader className="flex gap-3">
                <Image
                  alt="Logo Usuario"
                  height={100}
                  radius="sm"
                  src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/" + jugador.icono + ".jpg"}
                  width={100}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <p className="text-md">{jugador.nombre_usuario}</p>
                    <p className="text-md">{jugador.apellido_usuario}</p>
                  </div>
                  <p className="text-md">{jugador.nombre_equipo}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-col gap-2">
                  {columns.map((columna) => {
                    if (columna.name == "Edad") {
                      return (
                        <div key={columna.name} className="flex items-center justify-between">
                          <p className="text-sm w-[5rem]">{columna.name}</p>
                          <p className="text-md font-[500] text-center w-[9rem]">{getEdad(jugador[columna.uid])}</p>
                          <ModalJugadores jugador={jugador} columna={columna} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
                        </div>
                      );
                    } else if (columna.name == "Contraseña") {
                      return (
                        <div key={columna.name} className="flex items-center justify-between">
                          <p className="text-sm w-[5rem]">{columna.name}</p>
                          <p className="text-md font-[500] text-center w-[9rem]">--</p>
                          <ModalJugadores jugador={jugador} columna={columna} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
                        </div>
                      );
                    } else if (equipo && columna.name == "Equipo") {
                      return (
                        <div key={columna.name} className="flex items-center justify-between">
                          <p className="text-sm w-[5rem]">{columna.name}</p>
                          <p className="text-md font-[500] text-center w-[9rem]">{equipo["nombre_equipo"]}</p>
                          <ModalJugadores jugador={jugador} columna={columna} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
                        </div>
                      );
                    } else if (columna.name == "Rol") {
                      return (
                        <div key={columna.name} className="flex items-center justify-between">
                          <p className="text-sm w-[5rem]">{columna.name}</p>
                          <p className="text-md font-[500] text-center w-[9rem]">{getPerms(jugador[columna.uid])}</p>
                          <ModalJugadores jugador={jugador} columna={columna} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
                        </div>
                      );
                    } else {
                      return (
                        <div key={columna.name} className="flex items-center justify-between">
                          <p className="text-sm w-[5rem]">{columna.name}</p>
                          <p className="text-md font-[500] text-center w-[9rem]">{jugador[columna.uid]}</p>
                          <ModalJugadores jugador={jugador} columna={columna} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
                        </div>
                      );
                    }
                  })}
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href="#">
                  Visitar Página del Usuario
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      );
    });

  return (
    <div className="flex gap-16">
      <Card className="min-w-[300px]">
        <CardHeader className="flex justify-center gap-3">
          <Image alt="Logo Equipo" height={100} radius="sm" src={api.directorio + "images/" + equipo[0].logo_equipo} width={100} />
          <div className="flex flex-col gap-2">
            <p className="text-md">{equipo.nombre_equipo}</p>
            {renderChip(equipo.activa)}
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-2">
            {columnsEquipo.map((columna) => (
              <div key={columna.name} className="flex items-center justify-between">
                <p className="text-sm w-[5rem]">{columna.name}</p>
                <p className="text-md font-[500] text-center w-[9rem]">{equipo[0][columna.uid]}</p>
                <ModalEquipos equipo={equipo} columna={columna} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} ligas={ligas} temporadas={temporadas} />
              </div>
            ))}
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link isExternal showAnchorIcon href="#">
            Visitar Página del Equipo
          </Link>
        </CardFooter>
      </Card>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">{renderJugadores()}</div>
    </div>
  );
}
