const columns = [
    { name: "ID", uid: "id_partido", sortable: true },
    { name: "FECHA", uid: "fecha", sortable: true },
    { name: "ESTADO", uid: "progreso", sortable: true },
];

const statusOptions = [
    { name: "En Espera", uid: 0 },
    { name: "Finalizado", uid: 1 },
];

export { columns, statusOptions }