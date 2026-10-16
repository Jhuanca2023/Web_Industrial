// Catálogo demo. Textos y especificaciones tomados de las fichas de euroheaters.mx.
// Las valoraciones (rating) son ficticias, solo para demostrar la UI de estrellas.
export const CATS = [
  { id: "todos", label: "Todos" },
  { id: "controladores", label: "Controladores" },
  { id: "resistencias", label: "Resistencias" },
  { id: "sensores", label: "Sensores" },
  { id: "colada", label: "Colada y accesorios" }
];

const CTX_PLANTA = { src: "/img/planta-inyeccion.jpg", alt: "Máquina de inyección con brazo robótico", fit: "cover" };
const CTX_PANEL = { src: "/img/panel-control.jpg", alt: "Panel de control de un equipo industrial", fit: "cover" };
const CTX_OPERARIO = { src: "/img/operario.jpg", alt: "Operario usando el panel táctil de una máquina", fit: "cover" };
const CTX_PURGA = { src: "/img/moldeo-purga.jpg", alt: "Material plástico purgado de una máquina de moldeo", fit: "cover" };
const g = (src, alt) => ({ src, alt, fit: "contain" });

export const PRODUCTS = [
  {
    id: "temperatura", cat: "controladores", name: "Controlador de temperatura", rating: 4.9,
    sub: "Colada caliente · 1 a 6 zonas",
    short: "Pirómetros digitales 48 × 96 mm en gabinete rack de 19\".",
    desc: "Pirómetros digitales con microprocesador, formato normalizado de 48 × 96 mm y programación por teclado. Gabinetes tipo rack de aluminio, robustos para trabajo en planta.",
    img: "/img/euro-heaters-accesorios-0014.jpeg",
    specs: [["Formato", "48 × 96 mm normalizado"], ["Gabinete", "Rack de aluminio de 19\""], ["Zonas", "1, 4, 5 y 6 (otras bajo pedido)"], ["Programación", "Por teclado"], ["Lectura", "Temperatura deseada y real"], ["Incluye", "Amperímetro"]],
    benefits: ["Si falla la termocupla, pasa a manual con el % de potencia promedio de los últimos minutos", "Soft-start automático", "Control del % de potencia entregada", "Entrega inmediata, garantía y asesoramiento"],
    uses: ["Colada caliente", "Inyección de plástico", "Moldes multizona"],
    gallery: [g("/img/euro-heaters-accesorios-0014.jpeg", "Controlador digital de temperatura con displays rojo y verde"), CTX_PANEL, CTX_PLANTA]
  },
  {
    id: "secuencial", cat: "controladores", name: "Controlador de tiempo de inyección", rating: 4.8,
    sub: "Secuencial · hasta 6 salidas",
    short: "Abre y cierra cada compuerta en el momento exacto.",
    desc: "Temporizador de inyección secuencial que abre y cierra cada compuerta del canal caliente para eliminar líneas de soldadura, ajustar la cantidad por compuerta y reducir la fuerza de cierre.",
    img: "/img/euro-heaters-accesorios-0015.jpeg",
    specs: [["Tensión de salida", "24 V CC o 220 V CA"], ["Modos", "A / B / C"], ["Tiempos", "Apertura y cierre por compuerta"], ["Indicación", "Muestra la tensión de salida en operación"], ["Formato", "Gabinete de 6 módulos"]],
    benefits: ["Elimina líneas de soldadura (weldline)", "Reduce la fuerza de cierre", "Minimiza marcas de flujo", "Salida igual a la tensión del solenoide"],
    uses: ["Piezas con varias compuertas", "Automotriz", "Empaque"],
    gallery: [g("/img/euro-heaters-accesorios-0015.jpeg", "Gabinete de seis módulos del controlador secuencial"), CTX_PLANTA, CTX_PURGA]
  },
  {
    id: "modular", cat: "controladores", name: "Controlador de temperatura modular", rating: 4.7,
    sub: "Serie 5 y Serie 8 · 2 a 48 zonas",
    short: "Módulos individuales o gabinetes de hasta 48 zonas.",
    desc: "Controladores modulares para moldes de colada caliente con el software de sintonía permanente Self Control y componentes electrónicos de última generación.",
    img: "/img/euro-heaters-accesorios-0020.jpeg",
    specs: [["Serie 5", "Módulos de una zona o gabinetes de 2 a 48 zonas"], ["Serie 8", "Módulos compactos de doble zona y gabinetes de 2 a 48 zonas"], ["Software", "Sintonía permanente Self Control"], ["Configuración", "Modular y ampliable"]],
    benefits: ["Ajuste automático permanente del PID", "Amplíe zonas sin cambiar de equipo", "Diseño robusto para trabajo continuo"],
    uses: ["Moldes de muchas zonas", "Plantas en crecimiento"],
    gallery: [g("/img/euro-heaters-accesorios-0020.jpeg", "Tres unidades de control con panel azul"), g("/img/euro-heaters-accesorios-0019.jpeg", "Vista posterior de cuatro unidades con válvulas"), CTX_PANEL]
  },
  {
    id: "presion", cat: "controladores", name: "Transductores de presión", rating: 4.8,
    sub: "Presión de fusión · 0 a 20 000 psi",
    short: "Diafragma de Inconel y garantía de 3 años.",
    desc: "Transductores de presión de fusión con diafragma de Inconel y recubrimientos opcionales. Respaldados por garantía completa contra defectos de fabricación.",
    img: "/img/sistema-colada-caliente-puntas-inyeccion-euroheaters-mexico-073.jpg",
    specs: [["Rango", "0–500 psi hasta 0–20 000 psi"], ["Temperatura", "Hasta 400 °C (750 °F)"], ["Error combinado", "0,5 %"], ["Diafragma", "Inconel estándar"], ["Conexión", "Bayoneta de 6 pines"], ["Garantía", "3 años"]],
    benefits: ["Intercambiable con modelos de la competencia", "Opción de recubrimiento de partículas de diamante", "Calibración al 80 % de la salida"],
    uses: ["Extrusión", "Inyección", "Monitoreo de proceso"],
    gallery: [g("/img/sistema-colada-caliente-puntas-inyeccion-euroheaters-mexico-073.jpg", "Transductores de presión Euroheaters con conexión flexible"), CTX_PURGA, CTX_PLANTA]
  },
  {
    id: "control-presion", cat: "controladores", name: "Controlador de presión", rating: 4.8,
    sub: "Pressure Controllers · entrada de 350 Ω",
    short: "Lectura de proceso con dos alarmas configurables.",
    desc: "Controladores con entrada para galga extensométrica de 350 ohmios y rango escalable. Permiten configurar dos alarmas y realizar la calibración en modo automático o manual.",
    img: "/img/sistema-colada-caliente-puntas-inyeccion-euroheaters-mexico-075.jpg",
    specs: [["Entrada", "Galga extensométrica de 350 Ω"], ["Rango", "Escalable"], ["Alarmas", "2 configurables: alto / bajo / apagado"], ["Calibración", "Automática o manual"], ["Cero", "Ajuste manual"], ["Señal", "Retransmisión del valor de proceso"]],
    benefits: ["Alarmas configurables para supervisar el proceso", "Calibración automática o manual", "Rango adaptable a la aplicación"],
    uses: ["Monitoreo de presión", "Extrusión", "Inyección"],
    gallery: [g("/img/sistema-colada-caliente-puntas-inyeccion-euroheaters-mexico-075.jpg", "Controladores de presión Euroheaters en diferentes formatos"), CTX_PANEL]
  },
  {
    id: "melt-pressure", cat: "controladores", name: "Control de presión de fusión", rating: 4.8,
    sub: "Melt Pressure Control · respuesta de 100 ms",
    short: "Control PID y retransmisión del proceso de 4–20 mA.",
    desc: "Controlador de presión de fusión con sintonización manual PID, muestreo rápido y tiempo de respuesta de control de 100 ms. Incluye retransmisión del valor de proceso y calibración automática o manual.",
    img: "/img/sistema-colada-caliente-puntas-inyeccion-euroheaters-mexico-078.jpg",
    specs: [["Control", "PID de sintonización manual"], ["Muestreo", "100 ms"], ["Respuesta", "100 ms"], ["Retransmisión PV", "4–20 mA"], ["Calibración", "Automática o manual"]],
    benefits: ["Seguimiento rápido de la presión del proceso", "Integración mediante señal de 4–20 mA", "Ajuste manual del control PID"],
    uses: ["Presión de fusión", "Extrusión", "Control de proceso"],
    gallery: [g("/img/sistema-colada-caliente-puntas-inyeccion-euroheaters-mexico-078.jpg", "Panel frontal del controlador de presión de fusión"), CTX_PANEL]
  },
  {
    id: "tubular", cat: "resistencias", name: "Resistencia tubular", rating: 4.6,
    sub: "Revestimiento metálico · a pedido",
    short: "La más versátil: se dobla a la forma de su equipo.",
    desc: "Las resistencias más versátiles de la industria, fabricadas a pedido respetando valores, especificaciones y materiales. Se forman y doblan en muchas formas y tamaños.",
    img: "/img/euro-heaters-accesorios-0044-b.jpeg",
    specs: [["Construcción", "Revestimiento metálico"], ["Fabricación", "A pedido, personalizada"], ["Formas", "Dobleces y tamaños a medida"], ["Valores", "Según su especificación"]],
    benefits: ["Se adapta a contornos y espacios", "Flexibilidad absoluta de formas", "Materiales según la exigencia"],
    uses: ["Electrodomésticos", "Calentamiento de líquidos", "Hornos"],
    gallery: [g("/img/euro-heaters-accesorios-0044-b.jpeg", "Resistencia tubular en espiral"), g("/img/euro-heaters-accesorios-0045.jpeg", "Resistencia tubular, vista alterna"), CTX_OPERARIO]
  },
  {
    id: "banda", cat: "resistencias", name: "Resistencia tipo banda", rating: 4.7,
    sub: "Cilindros y toberas",
    short: "Calentamiento rápido con excelente adherencia.",
    desc: "Genera un rápido incremento de temperatura transferible. Al subir la temperatura la banda se tensiona, asegurando buena adherencia y eliminando vacíos.",
    img: "/img/euro-heaters-accesorios-0057.jpeg",
    specs: [["Fabricación", "A pedido, diámetros y anchos variables"], ["Potencia", "Amplio rango"], ["Terminales", "Distintos tipos de salida"], ["Respuesta", "Incremento rápido de temperatura"]],
    benefits: ["Buena adherencia al calentar", "Elimina vacíos de contacto", "Gran variedad de usos industriales"],
    uses: ["Inyectoras", "Extrusoras", "Empaque"],
    gallery: [g("/img/euro-heaters-accesorios-0057.jpeg", "Resistencia de banda en latón"), g("/img/euro-heaters-accesorios-0058.jpeg", "Resistencia de banda, vista alterna"), CTX_PLANTA]
  },
  {
    id: "plana", cat: "resistencias", name: "Resistencia plana", rating: 4.5,
    sub: "Nicrón sobre mica",
    short: "Placa con blindaje de acero inoxidable.",
    desc: "Resistencia de Nicrón enrollada sobre lámina de mica y aislada por láminas similares, con elevado aislamiento dieléctrico, óptima conductividad térmica y blindaje metálico.",
    img: "/img/euro-heaters-accesorios-0063.jpeg",
    specs: [["Elemento", "Nicrón sobre lámina de mica"], ["Blindaje", "Plancha de acero inoxidable"], ["Terminales", "Pernos, enchufe tipo plancha, bornera de loza o cable níquel-acero"]],
    benefits: ["Alto aislamiento dieléctrico", "Óptima conductividad térmica", "Terminales a elección"],
    uses: ["Placas y platinas", "Troqueles", "Sellado"],
    gallery: [g("/img/euro-heaters-accesorios-0063.jpeg", "Resistencia plana de acero inoxidable"), CTX_OPERARIO, CTX_PANEL]
  },
  {
    id: "infrarroja", cat: "resistencias", name: "Resistencia cerámica infrarroja", rating: 4.8,
    sub: "300 a 700 °C · onda larga",
    short: "Radiación infrarroja de onda larga, eficiente y robusta.",
    desc: "Elementos cerámicos que operan de 300 °C a 700 °C y producen longitudes de onda IR de 2 a 10 micrones.",
    img: "/img/euro-heaters-accesorios-0065.jpeg",
    specs: [["Hilo resistivo", "Hierro-Cromo-Aluminio"], ["Voltaje", "230 V estándar (otros bajo demanda)"], ["Longitud de onda", "2–10 micrones"], ["Duración promedio", "5 000 – 10 000 h"], ["Distancia de radiación", "100 a 200 mm"]],
    benefits: ["Calentamiento por radiación", "Larga vida útil", "Voltajes especiales bajo demanda"],
    uses: ["Termoformado", "Secado", "Hornos"],
    gallery: [g("/img/euro-heaters-accesorios-0065.jpeg", "Resistencia cerámica infrarroja blanca"), g("/img/euro-heaters-accesorios-0066.jpeg", "Resistencia cerámica infrarroja amarilla"), CTX_PLANTA]
  },
  {
    id: "cuarzo", cat: "resistencias", name: "Resistencia de cuarzo", rating: 4.6,
    sub: "Onda media · series Q10 y Q5",
    short: "Longitudes de onda más cortas y respuesta más rápida.",
    desc: "Complementa la gama cerámica con salidas de menor longitud de onda y tiempos de respuesta más rápidos. Disponible en unidades individuales con reflectores y sistemas de cableado.",
    img: "/img/euro-heaters-accesorios-0075.jpeg",
    specs: [["Onda", "Media"], ["Series", "Q10 y Q5, estándar y forma SE"], ["Complementos", "Reflectores y sistemas de cableado"], ["Montaje", "Sistema de cassette modular"]],
    benefits: ["Respuesta más rápida", "Se arma en paneles modulares", "Complementa la gama cerámica"],
    uses: ["Procesos de secado", "Curado", "Calentamiento rápido"],
    gallery: [g("/img/euro-heaters-accesorios-0075.jpeg", "Emisor de cuarzo y módulo"), g("/img/euro-heaters-accesorios-0074.jpeg", "Emisores de cuarzo"), CTX_OPERARIO]
  },
  {
    id: "termopar", cat: "sensores", name: "Termopar", rating: 4.9,
    sub: "Normas ASTM",
    short: "Aislamiento mineral o fibra de vidrio, gran variedad de modelos.",
    desc: "Gran variedad de modelos y tamaños: metal forrado con aislamiento mineral, metales comunes y de alta temperatura, con uniones a tierra, sin tierra y expuestas.",
    img: "/img/euro-heaters-accesorios-0086.jpeg",
    specs: [["Aislamiento", "Mineral o fibra de vidrio"], ["Uniones", "A tierra, sin tierra y expuestas"], ["Calidad", "Verificación bajo normas ASTM"], ["Modelos", "Variedad de tamaños"]],
    benefits: ["Mide altas temperaturas en operación continua", "Controles de calidad estrictos", "Para aplicaciones generales"],
    uses: ["Moldes", "Hornos", "Procesos térmicos"],
    gallery: [g("/img/euro-heaters-accesorios-0086.jpeg", "Termopar con cable trenzado"), g("/img/euro-heaters-accesorios-0087.jpeg", "Termopar, vista alterna"), CTX_PANEL]
  },
  {
    id: "rtd", cat: "sensores", name: "Termoresistencia RTD", rating: 4.9,
    sub: "Alta precisión · a medida",
    short: "Los sensores más precisos, fabricados a su especificación.",
    desc: "Los sensores tipo RTD son los más precisos por los materiales empleados y el cumplimiento de altos estándares de calidad. Se fabrican según sus especificaciones.",
    img: "/img/euro-heaters-accesorios-0091.jpeg",
    specs: [["Tipo", "Termoresistencia RTD"], ["Fabricación", "Personalizada"], ["Precisión", "La más alta entre sensores de temperatura"]],
    benefits: ["Máxima precisión de lectura", "Materiales de calidad", "Diseñado según su exigencia"],
    uses: ["Laboratorio", "Procesos críticos", "Alimentos y farma"],
    gallery: [g("/img/euro-heaters-accesorios-0091.jpeg", "Sensor RTD con cabezal de aluminio"), g("/img/euro-heaters-accesorios-0092.jpeg", "Sensor RTD, vista alterna"), CTX_OPERARIO]
  },
  {
    id: "puntas", cat: "colada", name: "Puntas de inyección", rating: 4.7,
    sub: "Sistema de colada caliente",
    short: "Puntas para sistemas de colada caliente.",
    desc: "Puntas de inyección para sistemas de colada caliente, fabricadas bajo especificación para su molde.",
    img: "/img/puntas-0098.jpeg",
    specs: [["Aplicación", "Sistema de colada caliente"], ["Fabricación", "Bajo especificación"], ["Modelos", "Consulte disponibilidad"]],
    benefits: ["Compatibles con su sistema", "Asesoría para la selección", "Entrega inmediata sujeta a existencia"],
    uses: ["Moldes de colada caliente"],
    gallery: [g("/img/puntas-0098.jpeg", "Puntas de inyección de acero"), g("/img/puntas-0099.jpeg", "Puntas de inyección, vista alterna"), CTX_PURGA]
  },
  {
    id: "cables", cat: "colada", name: "Cables y recubrimientos", rating: 4.6,
    sub: "Silicona, níquel, termopar",
    short: "Cables de silicona, níquel y compensados para termopar.",
    desc: "Cables de caucho de silicona con conductores de cobre, níquel y cobre niquelado, cables compensados para termopar y de resistencia térmica.",
    img: "/img/123.jpeg",
    specs: [["Aislamiento", "Silicona, fibra de vidrio, PTFE"], ["Conductor", "Cobre, níquel o cobre niquelado"], ["Tipos", "Compensados para termopar y de resistencia térmica"]],
    benefits: ["Aptos para alta temperatura", "Para industrias muy distintas", "Surtido amplio por rollo"],
    uses: ["Electrodomésticos", "Naval", "Aeronáutica", "Ferroviaria", "Hornos"],
    gallery: [g("/img/123.jpeg", "Carrete de cable"), CTX_PLANTA, CTX_PANEL]
  }
];
