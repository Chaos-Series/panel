const columns = [ //hay que añadir si esta activo (statusoptions) + posicion real
    { name: "ID", uid: "id_equipo", sortable: true },
    { name: "LOGO", uid: "logo_equipo", sortable: false },
    { name: "NOMBRE", uid: "nombre_equipo", sortable: true },
    { name: "ACRÓNIMO", uid: "acronimo_equipo", sortable: true },
    { name: "LIGA", uid: "id_liga", sortable: true },
    { name: "TEMPORADA", uid: "id_temporada", sortable: true },
    { name: "PUNTUACIÓN", uid: "puntuacion", sortable: true },
    { name: "VICTORIAS", uid: "victorias", sortable: true }, //semifinales, final, etc.
    { name: "DERROTAS", uid: "derrotas", sortable: true },
    { name: "POSICIÓN", uid: "stage", sortable: true },
    { name: "ACCIONES", uid: "actions" },
];

const statusOptions = [
    { name: "Activo", uid: 1 },
    { name: "Inactivo", uid: 0 },
];

export { columns, statusOptions }