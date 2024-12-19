interface Campus3DData {
  markers: Array<{
    position: [number, number, number];
    label: string;
    type: 'entrance' | 'building' | 'service' | 'number';
    color?: string;
  }>;
  buildingData: {
    positions: [number, number, number][];
    scales: [number, number, number][];
  };
}

export const campus3DData: { [key: string]: Campus3DData } = {
  'lima norte': {
    markers: [
      { position: [-20, 0, -20], label: 'Puerta de Ingreso 1', type: 'entrance' },
      { position: [20, 0, -20], label: 'Puerta de Ingreso 2', type: 'entrance' },
      { position: [-15, 0, -10], label: 'Pabellón A', type: 'building' },
      { position: [-5, 0, -10], label: 'Pabellón B', type: 'building' },
      { position: [5, 0, -10], label: 'Pabellón C', type: 'building' },
      { position: [15, 0, -10], label: 'Pabellón D', type: 'building' },
      { position: [0, 0, 0], label: 'Área Verde Central', type: 'service' },
      { position: [-10, 0, 10], label: 'Biblioteca', type: 'service' },
      { position: [10, 0, 10], label: 'Laboratorios', type: 'service' },
    ],
    buildingData: {
      positions: [
        [-15, 2.5, -10], [-5, 2.5, -10], [5, 2.5, -10], [15, 2.5, -10],
        [-10, 2, 10], [10, 2, 10]
      ],
      scales: [
        [8, 5, 15], [8, 5, 15], [8, 5, 15], [8, 5, 15],
        [12, 4, 10], [12, 4, 10]
      ]
    }
  },
  'trujillo': {
    markers: [
      { position: [-15, 0, -15], label: 'Entrada Principal', type: 'entrance' },
      { position: [15, 0, -15], label: 'Entrada Secundaria', type: 'entrance' },
      { position: [-10, 0, -5], label: 'Facultad de Ingeniería', type: 'building' },
      { position: [10, 0, -5], label: 'Facultad de Humanidades', type: 'building' },
      { position: [0, 0, 5], label: 'Biblioteca Central', type: 'service' },
      { position: [-5, 0, 15], label: 'Laboratorios', type: 'service' },
      { position: [5, 0, 15], label: 'Centro de Estudiantes', type: 'service' }
    ],
    buildingData: {
      positions: [
        [-10, 3, -5], [10, 3, -5], [0, 4, 5], [-5, 2.5, 15], [5, 2.5, 15]
      ],
      scales: [
        [12, 6, 20], [12, 6, 20], [15, 8, 15], [8, 5, 10], [8, 5, 10]
      ]
    }
  },
};

export interface CampusInfo {
  name: string;
  address: string;
  description: string;
  planoUrl: string;
  ubicanosUrl: string;
  mapData: Campus3DData;
}

export const campusInfo: { [key: string]: CampusInfo } = {
  'lima norte': {
    name: 'Campus Lima Norte',
    address: 'Av. Alfredo Mendiola 6232, Los Olivos 15314',
    description: 'El Campus Lima Norte es uno de los más grandes de la UCV en la capital. Cuenta con amplias áreas verdes y modernas instalaciones para una experiencia educativa completa.',
    planoUrl: 'https://www.ucv.edu.pe/campus/los-olivos',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sus!4v1734087172884!5m2!1ses-419!2sus!6m8!1m7!1sViJoCyC6NE6D3hBtTLX0Jg!2m2!1d-11.95528073819214!2d-77.06919319998875!3f48.383049823425466!4f-6.574385960930982!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    mapData: campus3DData['lima norte']
  },
  'trujillo': {
    name: 'Campus Trujillo',
    address: 'Av. Larco 1770, Trujillo',
    description: 'El Campus Trujillo es el campus principal de la UCV, ubicado en el corazón de la ciudad. Ofrece modernas instalaciones y una amplia gama de programas académicos.',
    planoUrl: 'https://www.ucv.edu.pe/campus/trujillo ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534.1051464841698!2d-79.04339251794296!3d-8.129390228943459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d1321f4884f%3A0x4e87062165a7df3!2sUniversidad%20C%C3%A9sar%20Vallejo!5e1!3m2!1ses-419!2sus!4v1734086414143!5m2!1ses-419!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    mapData: campus3DData['trujillo']
  },
  'piura': {
    name: 'Campus Piura',
    address: 'Prolongación Av. Chulucanas S/N, Piura',
    description: 'El Campus Piura ofrece una experiencia educativa de calidad en el norte del país, con instalaciones modernas y una fuerte conexión con la comunidad local.',
    planoUrl: 'https://www.ucv.edu.pe/campus/piura ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'chiclayo': {
    name: 'Campus Chiclayo',
    address: 'Carretera Pimentel Km. 3.5, Chiclayo',
    description: 'El Campus Chiclayo brinda educación de calidad en la región de Lambayeque, con instalaciones diseñadas para fomentar el aprendizaje y la investigación.',
    planoUrl: 'https://www.ucv.edu.pe/campus/chiclayo ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'chimbote': {
    name: 'Campus Chimbote',
    address: 'Urb. Buenos Aires Mz. H Lt. 1, Nuevo Chimbote',
    description: 'El Campus Chimbote ofrece una variedad de programas académicos en un entorno moderno y dinámico, contribuyendo al desarrollo de la región Áncash.',
    planoUrl: 'https://www.ucv.edu.pe/campus/chimbote ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'tarapoto': {
    name: 'Campus Tarapoto',
    address: 'Carretera Marginal Norte, Fernando Belaunde Terry Km. 8.5, Cacatachi',
    description: 'El Campus Tarapoto proporciona educación de calidad en la región San Martín, con un enfoque en programas relevantes para el desarrollo de la Amazonía.',
    planoUrl: 'https://www.ucv.edu.pe/campus/tarapoto ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'ate': {
    name: 'Campus Ate',
    address: 'Carretera Central Km. 4.5, Ate',
    description: 'El Campus Ate ofrece programas académicos de calidad en el este de Lima, con instalaciones modernas y fácil acceso desde varios distritos.',
    planoUrl: 'https://www.ucv.edu.pe/campus/ate ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sus!4v1734087416781!5m2!1ses-419!2sus!6m8!1m7!1s2JzycJ-hLqO4IAPBnkOn3Q!2m2!1d-12.02293498993353!2d-76.91065334714254!3f138.22163624967112!4f-1.3474337339152385!5f1.1924812503605782" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'callao': {
    name: 'Campus Callao',
    address: 'Av. Argentina 1795, Callao',
    description: 'El Campus Callao brinda educación de calidad en la Provincia Constitucional del Callao, con programas diseñados para satisfacer las necesidades de la región.',
    planoUrl: 'https://www.ucv.edu.pe/campus/callao ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sus!4v1734086917823!5m2!1ses-419!2sus!6m8!1m7!1sKT65SuwvuGuuc3SVptyYtw!2m2!1d-12.05059561315088!2d-77.12334812228968!3f331.0605580196989!4f0!5f1.1924812503605782" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'lima este': {
    name: 'Campus Lima Este',
    address: 'Av. Del Parque 640, Urb. Canto Rey, San Juan de Lurigancho',
    description: 'El Campus Lima Este ofrece una amplia gama de programas académicos en el distrito más poblado de Lima, con instalaciones modernas y de fácil acceso.',
    planoUrl: 'https://www.ucv.edu.pe/campus/san-juan-de-lurigancho ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'huaraz': {
    name: 'Campus Huaraz',
    address: 'Av. Independencia 1488, Huaraz',
    description: 'El Campus Huaraz proporciona educación de calidad en la región Áncash, con un enfoque en programas relevantes para el desarrollo local y regional.',
    planoUrl: 'https://www.ucv.edu.pe/campus/huaraz ',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'moyobamba': {
    name: 'Campus Moyobamba',
    address: 'Jr. San Martín 511, Moyobamba',
    description: 'El Campus Moyobamba ofrece programas académicos adaptados a las necesidades de la región San Martín, contribuyendo al desarrollo sostenible de la Amazonía.',
    planoUrl: 'https://www.ucv.edu.pe/wp-content/uploads/2023/05/plano-moyobamba.jpg',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  },
  'huancayo': {
    name: 'Campus Huancayo',
    address: 'Av. San Carlos 1980, Huancayo',
    description: 'El Campus Huancayo brinda educación de calidad en la región Junín, con programas diseñados para satisfacer las necesidades de desarrollo de la sierra central.',
    planoUrl: 'https://www.ucv.edu.pe/wp-content/uploads/2023/05/plano-huancayo.jpg',
    ubicanosUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.7237660326096!2d-80.65699468522853!3d-5.178642996259947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1a9f3bec9c8d%3A0x45e6c22a1f5b4369!2sUniversidad%20C%C3%A9sar%20Vallejo%20-%20Filial%20Piura!5e0!3m2!1ses-419!2spe!4v1623338989012!5m2!1ses-419!2spe',
    mapData: {markers: [], buildingData: {positions: [], scales: []}}
  }
};

export const predefinedResponses = [
  { patterns: ['hola', 'buenos días', 'buenas tardes', 'buenas noches'], response: "¡Hola! Soy el ChatBot de UCV. ¿En qué puedo ayudarte hoy? 😊" },
  { patterns: ['adiós', 'adios', 'hasta luego', 'chau'], response: "¡Hasta luego! Si necesitas más ayuda, no dudes en volver. 👋" },
  { patterns: ['¿cómo estás?', 'como estas', 'que tal'], response: "Estoy funcionando perfectamente y listo para ayudarte. ¿En qué puedo asistirte hoy? 🤖" },
  { patterns: ['como inicio sesion', 'iniciar sesion', 'entrar a mi cuenta'], response: "Para iniciar sesión, usa el reconocimiento facial en la página principal. Asegúrate de que tu cámara esté habilitada y tu rostro registrado previamente. Si tienes problemas, contacta a soporte técnico." },
  { patterns: ['reconocimiento facial', 'como funciona el reconocimiento facial'], response: "El reconocimiento facial es nuestro método principal de autenticación. Asegúrate de que tu cámara esté funcionando correctamente. Si nunca has registrado tu rostro, ve a la sección de configuración de tu perfil para hacerlo." },
  { patterns: ['cursos', 'mis materias', 'horario de clases'], response: "Puedes consultar tus cursos en el portal estudiantil bajo la sección 'Mis Cursos'. Allí encontrarás los detalles de cada materia, horarios y aulas asignadas." },
  { patterns: ['hora', 'que hora es'], response: `La hora actual es: ${new Date().toLocaleTimeString()}` },
  { patterns: ['configuración de perfil', 'cambiar datos personales'], response: "Para configurar tu perfil, incluyendo el registro de tu rostro para el reconocimiento facial, ve a la sección 'Mi Perfil' en el portal estudiantil y selecciona 'Editar Perfil'." },
  { patterns: ['ayuda en el acceso', 'problemas para entrar'], response: "Si tienes problemas con el acceso, verifica tu conexión a internet y que tu cámara esté funcionando. Si el problema persiste, contacta a soporte técnico en soporte@ucv.edu.pe o al 01 2024342." },
  { patterns: ['mi rostro no esta registrado', 'no puedo usar reconocimiento facial'], response: "Si tu rostro no está registrado, dirígete a la Oficina de Soporte Estudiantil en el edificio principal de tu campus UCV para completar tu registro. Lleva tu carnet de estudiante." },
  { patterns: ['marcar asistencia', 'como registro mi asistencia'], response: "Para marcar tu asistencia, usa la funcionalidad de reconocimiento facial en el portal de asistencias de tu aula. Si tienes problemas, informa a tu profesor o consulta al soporte técnico." },
  { patterns: ['donde veo mi asistencia', 'revisar asistencia'], response: "Puedes verificar tu asistencia en el portal estudiantil en la sección 'Mis Asistencias'. Allí verás el registro de tus entradas y salidas para cada curso." },
  { patterns: ['como registro mi rostro', 'actualizar foto para reconocimiento'], response: "Para registrar o actualizar tu rostro, ve a 'Mi Perfil' en el portal estudiantil, selecciona 'Actualizar Reconocimiento Facial' y sigue las instrucciones para tomar una foto clara de tu rostro en un ambiente bien iluminado." },
  { patterns: ['soporte técnico', 'ayuda con problemas técnicos'], response: "Para soporte técnico, contacta a través del correo soporte@ucv.edu.pe, llama al 01 2024342, o acércate al laboratorio de informática de tu campus UCV." },
  { patterns: ['donde queda el pabellon a'], response: "El pabellón A está cerca de la entrada principal del campus, sobre la Avenida Alfredo Mendiola 6232." },
  { patterns: ['donde queda el pabellon b'], response: "El pabellón B está ubicado a la derecha del pabellón A, siguiendo los pasillos principales." },
  { patterns: ['donde estan los laboratorios de informatica'], response: "Los laboratorios de informática están en el pabellón C, diseñados para clases prácticas." },
  { patterns: ['donde queda el pabellon d'], response: "El pabellón D está detrás del pabellón C y suele ser utilizado para clases teóricas." },
  { patterns: ['donde esta la biblioteca'], response: "La biblioteca está ubicada cerca del pabellón E, en el fondo del campus. Ofrece recursos físicos y digitales para apoyar tu aprendizaje." },
  { patterns: ['que hago si no encuentro mi salon'], response: "Si no encuentras tu salón, puedes consultar los mapas disponibles en el campus o pedir ayuda en la recepción central. También puedes usar la app móvil de UCV para ubicarte dentro del campus." },
  { patterns: ['donde esta el comedor universitario'], response: "El comedor universitario está en el área central del campus, cerca de los jardines. Ofrece opciones variadas y económicas para estudiantes." },
  { patterns: ['donde esta la oficina de atencion al estudiante'], response: "La oficina de atención al estudiante está ubicada en el pabellón principal, cerca de la entrada principal. Allí puedes realizar trámites y obtener información general." },
  { patterns: ['cual es el correo de soporte', 'email de ayuda'], response: "El correo de soporte técnico es soporte@ucv.edu.pe. No dudes en contactarlos para cualquier problema técnico que encuentres." },
  { patterns: ['numero de contacto', 'telefono de la universidad'], response: "El número de contacto principal de UCV es 01 2024342. Para números específicos de cada facultad, visita la página de contacto en el sitio web de UCV." },
  { patterns: ['hola causa', 'que hay causa'], response: "¡Qué pasa, causa! ¿En qué te puedo ayudar hoy? 😎" },
  { patterns: ['carreras', 'programas académicos', 'que puedo estudiar'], response: "UCV ofrece una amplia gama de carreras en diversas áreas. Puedes encontrar información detallada sobre nuestros programas académicos en https://www.ucv.edu.pe/carreras-universitarias/. ¿Hay alguna área específica que te interese?" },
  { patterns: ['campus', 'sedes', 'filiales'], response: "UCV cuenta con varios campus en todo el Perú, incluyendo Lima Norte, Trujillo, Piura, Chiclayo, Chimbote, Tarapoto, Ate, Callao, Lima Este, Huaraz, Moyobamba y Huancayo. Cada campus ofrece una experiencia educativa única. ¿Te gustaría saber más sobre algún campus en particular?" },
  { patterns: ['mapa', 'ubicación', 'cómo llegar'], response: "Puedo mostrarte un mapa de cualquiera de nuestros campus. ¿De qué campus específico necesitas el mapa o la ubicación?" },
  { patterns: ['becas', 'ayuda financiera'], response: "UCV ofrece diversas becas y opciones de ayuda financiera para estudiantes. Puedes encontrar más información en https://www.ucv.edu.pe/admision/becas-y-credito-educativo/. ¿Necesitas detalles sobre algún programa de becas específico?" },
  { patterns: ['admisión', 'como ingreso', 'requisitos para estudiar'], response: "El proceso de admisión en UCV varía según la modalidad. Puedes encontrar información detallada sobre requisitos y fechas en https://www.ucv.edu.pe/admision/. ¿Tienes alguna pregunta específica sobre el proceso de admisión?" },
  { patterns: ['investigación', 'proyectos de investigación'], response: "UCV fomenta la investigación en todas sus áreas académicas. Puedes encontrar información sobre nuestros proyectos de investigación y publicaciones en https://www.ucv.edu.pe/investigacion/. ¿Te interesa algún área de investigación en particular?" },
  { patterns: ['convenios internacionales', 'intercambio estudiantil'], response: "UCV tiene convenios con universidades internacionales para intercambios estudiantiles y colaboraciones académicas. Puedes obtener más información en la Oficina de Relaciones Internacionales o en https://www.ucv.edu.pe/internacional/." },
  { patterns: ['biblioteca virtual', 'recursos en línea'], response: "UCV ofrece una amplia biblioteca virtual con acceso a bases de datos académicas, e-books y revistas científicas. Puedes acceder a estos recursos a través del portal estudiantil con tu cuenta UCV." },
  { patterns: ['servicios estudiantiles', 'bienestar universitario'], response: "UCV ofrece diversos servicios de bienestar estudiantil, incluyendo consejería, servicios de salud y actividades extracurriculares. Visita la oficina de Bienestar Universitario en tu campus para más información." },
  { patterns: ['bolsa de trabajo', 'prácticas profesionales'], response: "UCV cuenta con una bolsa de trabajo y convenios para prácticas profesionales. Puedes acceder a estas oportunidades a través del portal de empleabilidad en el sitio web de UCV o consultando en la oficina de Seguimiento al Graduado." },
  { patterns: ['calendario académico', 'fechas importantes'], response: "El calendario académico actualizado está disponible en el portal estudiantil. Incluye fechas de inicio y fin de semestre, períodos de exámenes y vacaciones. Asegúrate de revisarlo regularmente para estar al día con las actividades académicas." },
  { patterns: ['pabellones', 'edificios', 'instalaciones'], response: "La UCV cuenta con varios pabellones en cada campus. Por ejemplo, en el campus Lima Norte tenemos los pabellones A, B, C y D. Cada uno alberga diferentes facultades y servicios. ¿Sobre qué pabellón específico te gustaría saber más?" },
  { patterns: ['rutas', 'como llegar', 'transporte'], response: "Hay varias rutas para llegar a los campus de la UCV. Por ejemplo, para el campus Lima Norte, puedes tomar el Metropolitano hasta la estación UNI y luego un bus alimentador. También hay rutas de buses directas. ¿A qué campus específico necesitas llegar?" },
  { patterns: ['números telefónicos', 'teléfonos de contacto'], response: "El número de contacto principal de UCV es 01 2024342. Cada facultad y servicio tiene su propio número de extensión. ¿Necesitas el número de alguna facultad o servicio en particular?" },
  { patterns: ['horarios de atención', 'horas de oficina'], response: "Los horarios de atención varían según el servicio y el campus. En general, las oficinas administrativas atienden de lunes a viernes de 8:00 am a 6:00 pm, y los sábados de 8:00 am a 1:00 pm. Las bibliotecas suelen tener horarios extendidos. ¿Necesitas el horario de algún servicio específico?" },
  { patterns: ['medios de comunicación', 'redes sociales', 'contacto'], response: "Puedes comunicarte con la UCV a través de varios medios. Además del teléfono y correo electrónico, estamos en redes sociales como Facebook, Twitter e Instagram. También tenemos un canal de YouTube y una aplicación móvil. ¿Qué medio de comunicación prefieres usar?" },
  { patterns: ['información de carreras', 'programas académicos'], response: "La UCV ofrece una amplia gama de carreras en diversas áreas como Ingeniería, Ciencias de la Salud, Derecho, Educación, entre otras. Cada carrera tiene su propio plan de estudios y perfil del egresado. ¿Hay alguna carrera específica sobre la que te gustaría saber más?" },
  { patterns: ['mallas curriculares', 'plan de estudios'], response: "Las mallas curriculares de todas nuestras carreras están disponibles en el sitio web de la UCV. Puedes encontrarlas en la sección de cada carrera bajo el título 'Plan de Estudios'. Allí verás los cursos por ciclo y los créditos de cada uno. ¿Necesitas el link para alguna carrera en particular?" },
  { patterns: ['requisitos de admisión', 'cómo postular'], response: "Los requisitos de admisión varían según la modalidad de ingreso. En general, necesitarás tu certificado de estudios secundarios, DNI y aprobar el examen de admisión. Para algunas carreras puede haber requisitos adicionales. ¿Te interesa alguna modalidad de admisión en particular?" },
  { patterns: ['costos', 'pensiones', 'precios'], response: "Las pensiones en la UCV varían según la carrera y la sede. Ofrecemos planes de pago flexibles y opciones de becas y descuentos. Para obtener información detallada sobre los costos, te recomiendo contactar directamente con la oficina de admisión. ¿Quieres que te proporcione el contacto de admisión?" },
  { patterns: ['becas', 'ayuda financiera'], response: "La UCV ofrece diversos programas de becas, incluyendo becas por rendimiento académico, becas socioeconómicas y becas para deportistas destacados. También tenemos convenios con entidades financieras para ofrecer créditos educativos. ¿Te gustaría saber más sobre algún tipo de beca en particular?" },
  { patterns: ['vida estudiantil', 'actividades extracurriculares'], response: "La vida estudiantil en la UCV es muy activa. Ofrecemos clubes deportivos, grupos culturales, voluntariado, y diversas actividades extracurriculares. También organizamos eventos, conferencias y talleres regularmente. ¿Hay alguna actividad específica que te interese?" },
  { patterns: ['servicios estudiantiles', 'apoyo al estudiante'], response: "La UCV ofrece varios servicios de apoyo al estudiante, incluyendo tutoría académica, consejería psicológica, servicios de salud, y orientación profesional. También contamos con una bolsa de trabajo para estudiantes y egresados. ¿Necesitas información sobre algún servicio en particular?" },
  { patterns: ['intercambios', 'estudios en el extranjero'], response: "La UCV tiene convenios de intercambio con universidades de varios países. Estos programas te permiten estudiar en el extranjero por un semestre o un año. También ofrecemos programas de doble titulación con algunas universidades. ¿Te interesa estudiar en algún país en particular?" },
  { patterns: ['investigación', 'proyectos', 'publicaciones'], response: "La UCV fomenta la investigación en todas sus áreas académicas. Contamos con grupos de investigación, laboratorios especializados y apoyamos la publicación de trabajos en revistas científicas. También organizamos congresos y seminarios de investigación. ¿Hay algún área de investigación que te interese especialmente?" },
  { patterns: ['egresados', 'alumni', 'graduados'], response: "La UCV mantiene una estrecha relación con sus egresados. Ofrecemos servicios de bolsa de trabajo, formación continua y networking. También organizamos eventos para egresados y los mantenemos informados sobre las novedades de la universidad. ¿Eres egresado o te interesa saber más sobre nuestros servicios post-graduación?" },
  { patterns: ['biblioteca', 'recursos de estudio'], response: "La UCV cuenta con bibliotecas físicas en todos sus campus y una amplia biblioteca virtual. Ofrecemos acceso a bases de datos académicas, e-books, y revistas científicas. También contamos con salas de estudio y computadoras para uso de los estudiantes. ¿Necesitas información sobre algún recurso específico?" },
  { patterns: ['deportes', 'actividades físicas'], response: "La UCV promueve la práctica deportiva. Contamos con equipos en varias disciplinas que compiten a nivel universitario. También ofrecemos instalaciones deportivas como canchas de fútbol, básquet, y gimnasios en nuestros campus. ¿Practicas algún deporte o te interesa unirte a algún equipo?" },
  { patterns: ['convenios', 'alianzas', 'partnerships'], response: "La UCV tiene convenios con diversas instituciones nacionales e internacionales. Estos incluyen convenios para prácticas profesionales, intercambios estudiantiles, investigación conjunta y más. ¿Te interesa saber sobre algún tipo de convenio en particular?" },
  { patterns: ['acreditación', 'calidad educativa'], response: "La UCV está comprometida con la calidad educativa. Varias de nuestras carreras están acreditadas por organismos nacionales e internacionales. Además, participamos en rankings universitarios y constantemente buscamos mejorar nuestros procesos educativos. ¿Quieres saber más sobre la acreditación de alguna carrera específica?" },
  { patterns: ['posgrado', 'maestrías', 'doctorados'], response: "La UCV ofrece diversos programas de posgrado, incluyendo maestrías y doctorados en varias áreas del conocimiento. Estos programas están diseñados para profesionales que buscan especializarse o desarrollar habilidades de investigación. ¿Te interesa algún área de posgrado en particular?" },
  { patterns: ['prácticas profesionales', 'pasantías'], response: "La UCV tiene convenios con diversas empresas e instituciones para prácticas profesionales. Además, contamos con un servicio de bolsa de trabajo que ayuda a los estudiantes a encontrar oportunidades de prácticas. ¿Estás buscando prácticas en algún campo específico?" },
  { patterns: ['laboratorios', 'talleres', 'instalaciones especializadas'], response: "La UCV cuenta con laboratorios y talleres especializados para diversas carreras. Por ejemplo, tenemos laboratorios de ciencias, estudios de grabación, talleres de diseño, y más. Estas instalaciones están equipadas con tecnología de punta para apoyar el aprendizaje práctico. ¿Te interesa saber sobre los laboratorios de alguna carrera en particular?" },
  { patterns: ['calendario académico', 'fechas importantes'], response: "El calendario académico de la UCV incluye las fechas de inicio y fin de ciclo, períodos de exámenes, vacaciones y otros eventos importantes. Este calendario se publica al inicio de cada año académico y está disponible en el portal del estudiante. ¿Necesitas información sobre alguna fecha específica?" },
  { patterns: ['trámites', 'procedimientos administrativos'], response: "La UCV ofrece varios trámites y servicios administrativos, como solicitud de constancias, certificados, carné universitario, entre otros. Muchos de estos trámites se pueden realizar en línea a través del portal del estudiante. ¿Necesitas información sobre algún trámite en particular?" },
  { patterns: ['tecnología', 'recursos digitales'], response: "La UCV invierte constantemente en tecnología educativa. Ofrecemos acceso a plataformas de aprendizaje en línea, software especializado para diferentes carreras, y recursos digitales como bases de datos y bibliotecas virtuales. También contamos con Wi-Fi en todos nuestros campus. ¿Te interesa saber más sobre algún recurso tecnológico específico?" },
  { patterns: ['responsabilidad social', 'proyección social'], response: "La UCV está comprometida con la responsabilidad social. Realizamos diversos proyectos de proyección social en las comunidades donde operamos. También fomentamos el voluntariado entre nuestros estudiantes y personal. ¿Te gustaría participar en algún proyecto de responsabilidad social?" },
  { patterns: ['seguridad', 'protocolos de emergencia'], response: "La seguridad de nuestra comunidad universitaria es una prioridad. Contamos con personal de seguridad en todos nuestros campus, sistemas de vigilancia, y protocolos de emergencia bien establecidos. También ofrecemos capacitaciones en seguridad y primeros auxilios. ¿Tienes alguna preocupación específica sobre seguridad?" },
  { patterns: ['servicios de salud', 'atención médica'], response: "La UCV ofrece servicios de salud básicos en todos sus campus. Contamos con tópicos de enfermería y, en algunos campus, con servicios de atención psicológica. En caso de emergencias mayores, tenemos convenios con clínicas cercanas. ¿Necesitas información sobre algún servicio de salud en particular?" },
  { patterns: ['grupos de estudio', 'asesorías académicas'], response: "La UCV fomenta el aprendizaje colaborativo. Muchas carreras tienen grupos de estudio organizados por los mismos estudiantes. Además, ofrecemos servicios de tutoría y asesoría académica para estudiantes que necesiten apoyo adicional. ¿Te interesa unirte a un grupo de estudio o necesitas asesoría en alguna materia?" },
  { patterns: ['carreras del campus lima norte', 'programas disponibles'], response: "En la UCV ofrecemos una amplia variedad de programas académicos distribuidos en distintas áreas. Aquí tienes una lista de las principales carreras disponibles:\n\n**Ciencias de la Salud:**\n- Enfermería\n- Estomatología\n- Medicina\n- Nutrición\n- Psicología\n- Tecnología Médica en Laboratorio Clínico y Anatomía Patológica\n\n**Ciencias Empresariales:**\n- Administración de Empresas\n- Administración en Turismo y Hotelería\n- Administración y Gestión Pública\n- Administración y Marketing\n- Administración y Negocios Internacionales\n- Contabilidad\n- Economía\n\n**Derecho y Ciencias Políticas:**\n- Derecho\n\n¿Hay alguna carrera en particular que te interese? Estaré encantado de proporcionarte más información."}
  
];

export interface Message {
  text: string;
  isBot: boolean;
  isMap?: boolean;
  planoUrl?: string;
  ubicanosUrl?: string;
  campusUrl?: string;
  mapData?: Campus3DData;
}

export function getBotResponse(userInput: string): Message {
  const input = userInput.toLowerCase().trim();

  for (const [campusKey, info] of Object.entries(campusInfo)) {
    if (input.includes(campusKey.toLowerCase())) {
      return {
        text: `${info.name} está ubicado en ${info.address}. ${info.description}`,
        isBot: true,
        isMap: true,
        planoUrl: info.planoUrl,
        ubicanosUrl: info.ubicanosUrl,
        // Ajustar la URL para evitar el error 404
        campusUrl: `https://www.ucv.edu.pe/campus/${campusKey.toLowerCase().replace(/\s+/g, '-')}`,
        mapData: info.mapData
      };
    }
  }

  // Check for map requests
  if (input.includes('mapa') || input.includes('ubicación') || input.includes('cómo llegar')) {
    return {
      text: "Puedo mostrarte un mapa de cualquiera de nuestros campus. ¿De qué campus específico necesitas el mapa o la ubicación?",
      isBot: true
    };
  }

  // Check for predefined responses
  for (const { patterns, response } of predefinedResponses) {
    if (patterns.some(pattern => input.includes(pattern))) {
      return { text: response, isBot: true };
    }
  }

  return { 
    text: "Lo siento, no tengo información específica sobre eso. ¿Puedes reformular tu pregunta o preguntar sobre alguno de nuestros campus o servicios?", 
    isBot: true 
  };
}