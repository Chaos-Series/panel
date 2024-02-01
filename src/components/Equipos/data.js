const columnsEquipo = [ //hay que añadir si esta activo (statusoptions) + posicion real
    { name: "Nombre", uid: "nombre_equipo", modificar: "nombre_equipo", tipo: "text" },
    { name: "Acrónimo", uid: "acronimo_equipo", modificar: "acronimo_equipo", tipo: "text" },
    { name: "Liga", uid: "nombre_liga", modificar: "id_liga", tipo: "number" },
    { name: "Temporada", uid: "nombre_temporada", modificar: "id_temporada", tipo: "number" },
    { name: "Stage", uid: "stage", modificar: "stage", tipo: "number" },
    { name: "Puntuación", uid: "puntuacion", modificar: "puntuacion", tipo: "number" },
    { name: "Victorias", uid: "victorias", modificar: "victorias", tipo: "number" },
    { name: "Derrotas", uid: "derrotas", modificar: "derrotas", tipo: "number" },
];

export { columnsEquipo }