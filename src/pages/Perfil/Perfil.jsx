import { useState, useEffect } from "react";

import Layout from "../../components/Layout/Layout.jsx";
import { Card, CardHeader, CardBody, Image, Divider, Skeleton } from "@nextui-org/react";

import ModalPerfil from "./ModalEditar/ModalEditar.jsx";

import CuentasTabla from "./LoL/Cuentas.jsx";
import Enlazar from "./Enlazamientos.jsx";

import { returnSession } from "../../utils/sessions.js";
import getPerms from "../../utils/getPerms.js";
import getEdad from "../../utils/getEdad.js";

import { columns } from "./ModalEditar/data";

export default function Perfil() {
  const [usuario, setUsuario] = useState();
  const [cargando, setCargando] = useState(true);
  const [cambio, setCambio] = useState(false);

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"), false, setCargando).then((datos) => {
      console.log("aqui");
      setUsuario(datos);
    });
  }, [cambio]);

  if (cargando || localStorage.getItem("usuario") == null) {
    return (
      <Layout>
        <div className="flex justify-between">
          <Card className="py-4 w-[45%] max-h-[713.69px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Skeleton className="object-cover rounded-xl w-[270px] h-[270px]" />
              {/* <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/" + usuario.info.icono + ".jpg"}
                width={270}
              /> */}
            </CardHeader>
            <Divider className="my-8" />
            <CardBody className="py-2">
              <div className="flex mb-[3rem] justify-between items-center">
                <h4 className="font-[800] text-4xl">Mi Perfil</h4>
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                {/* <h6 className="font-[300] text-bs pr-6">{usuario.info.nombre_usuario + " " + usuario.info.apellido_usuario}</h6> */}
              </div>
              <div className="overflow-y-auto no-scrollbar pr-4">
                <div className="flex flex-col gap-2">
                  {columns.map((columna) => {
                    switch (columna.name) {
                      case "Contraseña":
                        return (
                          <div key={columna.name}>
                            <div className="flex justify-between items-center">
                              <p>{columna.name}</p>
                              <div className="flex justify-center items-center gap-4"></div>
                            </div>
                            <Divider className="my-2" />
                          </div>
                        );
                      case "Rol":
                        return (
                          <div key={columna.name}>
                            <div className="flex justify-between items-center">
                              <p>{columna.name}</p>
                              <div className="flex justify-center items-center gap-4">
                                <Skeleton className="w-3/5 rounded-lg">
                                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                {/* <p className="font-[600] text-lg">{getPerms(usuario.info[columna.uid])}</p> */}
                              </div>
                            </div>
                            <Divider className="my-2" />
                          </div>
                        );
                      case "Equipo":
                        return (
                          <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                          </Skeleton>
                        );
                      case "Edad":
                        return (
                          <div key={columna.name}>
                            <div className="flex justify-between items-center">
                              <p>{columna.name}</p>
                              <div className="flex justify-center items-center gap-4">
                                <Skeleton className="w-3/5 rounded-lg">
                                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                {/* <p className="font-[600] text-lg">{getEdad(usuario.info[columna.uid])}</p> */}
                                {/* <ModalPerfil jugador={usuario} columna={columna} cambioDatos={setCargando} /> */}
                              </div>
                            </div>
                            <Divider className="my-2" />
                          </div>
                        );
                      case "Nick":
                        return (
                          <div key={columna.name}>
                            <div className="flex justify-between items-center">
                              <p>{columna.name}</p>
                              <div className="flex justify-center items-center gap-4">
                                <Skeleton className="w-3/5 rounded-lg">
                                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                {/* <p className="font-[600] text-lg">{usuario.info[columna.uid]}</p> */}
                              </div>
                            </div>
                            <Divider className="my-2" />
                          </div>
                        );
                      default:
                        return (
                          <div key={columna.name}>
                            <div className="flex justify-between items-center">
                              <p>{columna.name}</p>
                              <div className="flex justify-center items-center gap-4">
                                <Skeleton className="w-3/5 rounded-lg">
                                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                {/* <p className="font-[600] text-lg">{usuario.info[columna.uid]}</p>
                                <ModalPerfil jugador={usuario} columna={columna} cambioDatos={setCargando} /> */}
                              </div>
                            </div>
                            <Divider className="my-2" />
                          </div>
                        );
                    }
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="flex flex-col w-[50%] gap-4">
            {<CuentasTabla />}
            {<Enlazar />}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex sm:flex-row flex-col justify-between">
        <Card className="py-4 sm:w-[45%] max-h-[713.69px] p-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/" + usuario.info.icono + ".jpg"}
              width={270}
            />
          </CardHeader>
          <Divider className="my-8" />
          <CardBody className="py-2">
            <div className="flex mb-[3rem] justify-between items-center">
              <h4 className="font-[800] text-4xl">Mi Perfil</h4>
              <h6 className="font-[300] text-bs pr-6">{usuario.info.nombre_usuario + " " + usuario.info.apellido_usuario}</h6>
            </div>
            <div className="overflow-y-auto no-scrollbar pr-4">
              <div className="flex flex-col gap-2">
                {columns.map((columna) => {
                  switch (columna.name) {
                    case "Contraseña":
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <ModalPerfil jugador={usuario} columna={columna} setCambioDatos={setCambio} cambioDatos={cambio} />
                              <></>
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      );
                    case "Rol":
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <p className="font-[600] text-lg">{getPerms(usuario.info[columna.uid])}</p>
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      );
                    case "Equipo":
                      if (usuario.equipo.length > 0) {
                        return (
                          <div key={columna.name}>
                            <div className="flex justify-between items-center">
                              <p>{columna.name}</p>
                              <div className="flex justify-center items-center gap-4">
                                <p className="font-[600] text-lg">{usuario.equipo.nombre_equipo}</p>
                              </div>
                            </div>
                            <Divider className="my-2" />
                          </div>
                        );
                      }
                      break;
                    case "Edad":
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <p className="font-[600] text-lg">{getEdad(usuario.info[columna.uid])}</p>
                              <ModalPerfil jugador={usuario} columna={columna} setCambioDatos={setCambio} cambioDatos={cambio} />
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      );
                    case "Nick":
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <p className="font-[600] text-lg">{usuario.info[columna.uid]}</p>
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      );
                    default:
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <p className="font-[600] text-lg">{usuario.info[columna.uid]}</p>
                              <ModalPerfil jugador={usuario} columna={columna} setCambioDatos={setCambio} cambioDatos={cambio} />
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      );
                  }
                })}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col sm:w-[50%] sm:py-0 py-4 gap-4">
          {<CuentasTabla usuario={usuario} setCambioDatos={setCambio} cambioDatos={cambio} />}
          {<Enlazar usuario={usuario} setCambioDatos={setCambio} cambioDatos={cambio} />}
        </div>
      </div>
    </Layout>
  );
}
