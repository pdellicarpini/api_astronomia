export const questions = [
    {
        _id: 'q1',
        type: 'true-false',
        question: 'Existen los años bisiestos porque la Tierra tarda unos 365,25 días en dar una vuelta al Sol.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 'Verdadero',
        explanation: 'Ese cuarto de día extra se acumula y cada 4 años se compensa con un día adicional.'
    },
    {
        _id: 'q2',
        type: 'true-false',
        question: 'Hay verano porque la Tierra está más cerca del Sol en esa época.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 'Falso',
        explanation: 'La Tierra está más cerca del Sol a principios de enero, cuando es verano en el sur e invierno en el norte. Las estaciones las causa la inclinación del eje (23,5°).'
    },
    {
        _id: 'q3',
        type: 'multiple-choice',
        question: 'La Tierra rota 360° en unas 23 h 56 min, pero el día solar dura 24 h. ¿Por qué esa diferencia?',
        options: ['Por la atracción de la Luna', 'Porque la Tierra rota más lento de lo que pensamos', 'Porque en ese tiempo la Tierra también avanzó en su órbita y hay que rotar un poco más para que el Sol vuelva a su lugar', 'Por un error de los relojes'],
        correctAnswer: 'Porque en ese tiempo la Tierra también avanzó en su órbita y hay que rotar un poco más para que el Sol vuelva a su lugar',
        explanation: 'Esos 4 minutos extra por día suman un día completo al año. Por eso las estrellas salen 4 minutos antes cada noche.'
    },
    {
        _id: 'q4',
        type: 'matching',
        question: 'Relacioná cada fenómeno con su causa.',
        options: ['Día y noche', 'Duración del año', 'Estaciones'],
        matchOptions: ['Rotación', 'Traslación', 'Inclinación del eje'],
        explanation: 'Las tres cosas ocurren a la vez. Muchos errores sobre la Tierra vienen de mezclarlas.'
    },
    {
        _id: 'q5',
        type: 'multiple-choice',
        question: 'Si el eje de la Tierra no estuviera inclinado, ¿qué ocurriría?',
        options: ['No existiría el día y la noche', 'Prácticamente no habría estaciones', 'Un hemisferio estaría siempre en verano', 'El año duraría el doble'],
        correctAnswer: 'Prácticamente no habría estaciones',
        explanation: 'Sin inclinación, el Sol incidiría siempre igual en cada latitud. Habría zonas más cálidas o frías, pero casi sin cambio a lo largo del año.'},
    {
        _id: 'q6',
        type: 'matching',
        question: 'Relacioná cada planeta con su característica.',
        options: ['Mercurio', 'Venus', 'Tierra', 'Marte'],
        matchOptions: ['Temperaturas extremas y poca atmósfera', 'Atmósfera densa de CO₂', 'Agua líquida y placas tectónicas', 'Volcán más alto del Sistema Solar'],
        explanation: 'Cuatro planetas de origen parecido que terminaron siendo muy distintos.'
    },
];