/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";

import api from "../../../variables.json";

import ModalJugadores from "./Modals/ModalEditar";
import Cuentas from "../../pages/Perfil/LoL/Cuentas";

import { columns } from "./data";
import { columnsEquipo } from "../Equipos/data";
import getEdad from "../../utils/getEdad";

import getPerms from "../../utils/getPerms";
import Enlazar from "../../pages/Perfil/Enlazamientos";

export default function Jugador({ usuario, listaEquipos, cambioDatos, setCambioDatos }) {
    const [jugador, setJugador] = useState(usuario.info);
    const [equipo, setEquipo] = useState(usuario.equipo);
    const [equipoActivo, setEquipoActivo] = useState(false)

    useEffect(() => {
        setEquipoActivo(false)
        setJugador(usuario.info)
        setEquipo(usuario.equipo)
        if(usuario.equipo.id_liga != undefined){
            setEquipoActivo(true)
        }
    }, [cambioDatos, usuario.info, usuario.equipo])

    const renderChip = () => {
        if (jugador.id_discord != null) {
            return (
                <Chip
                    startContent={<i className="fa-brands fa-discord"></i>}
                    variant="flat"
                    color="primary"
                    className="pl-2"
                >
                    {jugador.id_discord}
                </Chip>
            );
        }
    };

    const renderChipEquipo = (activo) => {
        const icon = activo === true ? "fa-check" : "fa-xmark";
        const color = activo === true ? "success" : "danger";

        return (
            <Chip
                startContent={<i className={`fa-solid ${icon}`}></i>}
                variant="flat"
                color={color}
                className="pl-2"
            >
                {activo === true ? "Activo" : "Inactivo"}
            </Chip>
        );
    };

    const renderEquipo = () => {
        if (Object.keys(equipo).length > 0) {
            return (
                <Card className="max-w-[300px] w-full">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="Logo Equipo"
                            radius="sm"
                            src={api.directorio + "images/" + equipo.logo_equipo}
                            className="h-[100px]"
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-md">{equipo.nombre_equipo}</p>
                            {renderChipEquipo(equipoActivo)}
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-2">
                            {columnsEquipo.map((columna) => (
                                <div key={columna.name} className="flex items-center justify-between">
                                    <p className="text-sm w-[5rem]">{columna.name}</p>
                                    <p className="text-md font-[500] text-center w-[9rem]">{equipo[columna.uid]}</p>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link isExternal showAnchorIcon href={"/equipo?id=" + equipo.id_equipo}>
                            Visitar Página del Equipo
                        </Link>
                    </CardFooter>
                </Card>
            );
        }
    };

    const renderColumn = (columna) => {
        const renderContent = () => {
            if (columna.name === "Edad") {
                return getEdad(jugador[columna.uid]);
            } else if (columna.name === "Contraseña") {
                return "--";
            } else if (columna.name === "Equipo") {
                return equipo ? equipo.nombre_equipo : "";
            } else if (columna.name === "Rol") {
                return getPerms(jugador[columna.uid]);
            } else {
                return jugador[columna.uid];
            }
        };

        return (
            <div key={columna.name} className="flex items-center justify-between">
                <p className="text-sm w-[5rem]">{columna.name}</p>
                <p className="text-md font-[500] text-center w-[9rem]">{renderContent()}</p>
                <ModalJugadores jugador={jugador} columna={columna} cambioDatos={cambioDatos} setCambioDatos={setCambioDatos} equipos={listaEquipos} />
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex sm:flex-row flex-col gap-16">
                <Card className="sm:max-w-[300px] w-full">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="Logo Usuario"
                            height={100}
                            radius="sm"
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${jugador.icono}.jpg`}
                            width={100}
                        />
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1">
                                <p className="text-md">{jugador.nombre_usuario}</p>
                                <p className="text-md">{jugador.apellido_usuario}</p>
                            </div>
                            <p className="text-md">{jugador.nombre_equipo}</p>
                            {renderChip()}
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-2">
                            {columns.map((columna) => renderColumn(columna))}
                        </div>
                    </CardBody>
                    <Divider />
                </Card>
                {renderEquipo()}
                <div className="flex sm:w-[400px] gap-4">
                    <Enlazar usuario={usuario} cambioDatos={cambioDatos} setCambioDatos={setCambioDatos} />
                </div>
            </div>
            <div className="flex w-full gap-4">
                <Cuentas usuario={usuario} cambioDatos={cambioDatos} setCambioDatos={setCambioDatos} />
            </div>
        </div>
    );
}
