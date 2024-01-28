import React from 'react'
import ReactDOM from 'react-dom/client'

import InicioSesion from './pages/InicioSesion.jsx'
import Registro from './pages/Registro.jsx'

import Usuarios from "./pages/Usuarios.jsx"
import Equipos from "./pages/Equipos.jsx"

import Equipo from './pages/Individual/Equipo.jsx'
import Usuario from './pages/Individual/Usuario.jsx'

import Partidos from './pages/Partidos/Partidos.jsx'
import Inhouses from './pages/Partidos/Inhouses.jsx'
import Clasificacion from './pages/Partidos/Clasificacion.jsx'

import Inhouse from './pages/Individual/Inhouse.jsx'
import Partido from './pages/Individual/Partido.jsx'

import Notificaciones from "./pages/Notificaciones.jsx"

import Perfil from './pages/Perfil/Perfil.jsx'

import './styles/Index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Perfil />,
  },
  {
    path: "/iniciosesion",
    element: <InicioSesion />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/usuario",
    element: <Usuario />,
  },
  {
    path: "/equipos",
    element: <Equipos />,
  },
  {
    path: "/equipo",
    element: <Equipo />,
  },
  {
    path: "/partidos",
    element: <Partidos />,
  },
  {
    path: "/partido",
    element: <Partido />,
  },
  {
    path: "/inhouses",
    element: <Inhouses />,
  },
  {
    path: "/inhouse",
    element: <Inhouse />,
  },
  {
    path: "/clasificacion",
    element: <Clasificacion />,
  },
  {
    path: "/notificaciones",
    element: <Notificaciones />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)