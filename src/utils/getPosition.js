export default function getPosition(posicion) {
    const posiciones = [
        'Toplane',
        'Jungla',
        'Midlane',
        'ADC',
        'Support'
    ]

    return posiciones[posicion - 1]
}