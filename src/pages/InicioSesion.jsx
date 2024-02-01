import { useState } from "react";

import md5 from "md5";
import axios from "axios";
import api from "../../variables.json";

import { checkSession } from "../utils/sessions";
import { checkToken } from "../utils/tokens";

import { Toaster, toast } from "sonner";

import { useForm } from "react-hook-form";

import { Card, CardBody, Input, Button, Link } from "@nextui-org/react";

import Logo from "../assets/logos/LogoSinTexto.png";

export default function InicioSesion() {
  checkSession();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const encriptarPass = () => {
      return new Promise((resolve) => {
        resolve(md5(data.contra));
      });
    };

    encriptarPass().then((contrasenaEncriptada) => {
      toast.promise(
        () =>
          new Promise((resolve, reject) => {
            axios.get(api.directorio + "usuarios/nombre=" + data.usuario + "/contra=" + contrasenaEncriptada).then((response) => {
              if (response.data.status == 200) {
                console.log(response.data.result)
                checkToken(response.data.result, contrasenaEncriptada, resolve, reject);
              } else if (response.data.status == 401) {
                reject();
                toast.error("Los datos de sesión no son correctos");
              } else if (response.data.status == 404) {
                reject();
                toast.error("El usuario no existe");
              }
            });
          }),
        {
          loading: "Iniciando sesión",
          success: "Sesión iniciada",
          error: "Error",
        }
      );
    });
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    //añadir background image
    <div className="flex justify-center items-center h-[100vh] bg-[url(../assets/backgrounds/Fondo.jpg)] bg-center bg-[cover] bg-no-repeat">
      <Toaster richColors closeButton />
      <div className="flex justify-center items-center">
        <Card className="py-4 m-4 h-[20rem] light:glass  light:text-default-200 max-w-[20rem] w-[30rem] md:max-w-[30rem] min-h-[70vh] flex flex-col items-center justify-center px-[5rem] rounded-lg">
          <CardBody className="w-[20rem] mt-[1rem]">
            <div className="flex flex-col justify-center items-center h-full w-full">
              <div className="w-full h-full flex flex-col justify-center items-center gap-4 mt-0 pt-[1rem] md:pt-[1rem]">
                <img src={Logo} className="w-[6.5rem] h-[9.25rem] hidden md:flex"></img>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-0 md:mt-8 justify-start h-full">
                  <Input {...register("usuario", { required: true })} variant={"underlined"} label="Nombre de Usuario" type={"text"} className="text-black" />
                  <Input
                    {...register("contra", { required: true })}
                    variant={"underlined"}
                    label="Contraseña"
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <i className="fa-solid fa-eye-slash text-default-400 pointer-events-none"></i>
                        ) : (
                          <i className="fa-solid fa-eye text-default-400 pointer-events-none"></i>
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="text-black"
                  />

                  <Button type="submit" color="primary" variant="ghost" className="h-[4rem] w-full mt-2 md:mt-8">
                    Iniciar Sesión
                  </Button>
                </form>
              </div>
              <div className="flex justify-center w-full gap-12">
                <Link href="https://discord.gg/nkgTkDxB8d" color="foreground" className="w-[100%] px-0 text-sm !text-center">
                  ¿Olvidaste la contraseña?
                </Link>
                <Link href="/registro" color="foreground" className="w-[100%] px-0 text-sm !flex !justify-center">
                  Registro
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
