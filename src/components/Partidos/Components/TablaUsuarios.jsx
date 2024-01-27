/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { columns } from "../data";

import { obtenerInformacionAdicional } from "../../../utils/Inhouse/recibirInfoExtra";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function TablaUsuarios({ jugadoresBlue, jugadoresRed, cambioDatos, setCambioDatos }) {
    const [jugadoresBlueFiltrados, setJugadoresBlueFiltrados] = useState(jugadoresBlue);
    const [jugadoresRedFiltrados, setJugadoresRedFiltrados] = useState(jugadoresRed);

    useEffect(() => {
        const fetchInformacionAdicional = async () => {
            try {
                const jugadoresActualizadosBlue = await obtenerInformacionAdicional(jugadoresBlueFiltrados, localStorage.getItem("token"));
                const jugadoresActualizadosRed = await obtenerInformacionAdicional(jugadoresRedFiltrados, localStorage.getItem("token"));
                setJugadoresBlueFiltrados(jugadoresActualizadosBlue);
                setJugadoresRedFiltrados(jugadoresActualizadosRed);
            } catch (error) {
                console.error('Error al obtener información adicional:', error);
                // Puedes manejar el error según tus necesidades
            }
        };

        fetchInformacionAdicional();
    }, [jugadoresBlueFiltrados, jugadoresBlue, jugadoresRedFiltrados, jugadoresRed, cambioDatos, setCambioDatos]);

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "rol":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                {/* <EyeIcon /> */}
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                {/* <EditIcon /> */}
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                {/* <DeleteIcon /> */}
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return (<div>yooXD</div>);
        }
    }, []);

    const renderNoUser = useCallback((columnKey) => {
        if (columnKey === "nick_usuario") return <div>ESPACIO LIBRE</div>;
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                <Table aria-label="Tabla de jugadores blueside">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"No se han inscrito jugadores"} items={jugadoresBlueFiltrados}>
                        {(item) => {
                            if (item.id != null) {
                                return (
                                    <TableRow key={item.id}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )
                            } else {
                                return (
                                    <TableRow key={item.p}>
                                        {(columnKey) => <TableCell>{renderNoUser(columnKey)}</TableCell>}
                                    </TableRow>
                                )
                            }
                        }}
                    </TableBody>
                </Table>
                <Table aria-label="Tabla de jugadores redside">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"No se han inscrito jugadores"} items={jugadoresRedFiltrados}>
                        {(item) => {
                            if (item.id != null) {
                                return (
                                    <TableRow key={item.id}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )
                            } else {
                                return (
                                    <TableRow key={item.p}>
                                        {(columnKey) => <TableCell>{renderNoUser(columnKey)}</TableCell>}
                                    </TableRow>
                                )
                            }
                        }}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}