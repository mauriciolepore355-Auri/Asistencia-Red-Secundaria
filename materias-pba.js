/* ===========================================================================
   MATERIAS Y TALLERES — Secundaria de la Provincia de Buenos Aires (DGCyE)
   Para los desplegables de AsistenciaRed (versión secundaria).
   Fuente: Diseños Curriculares oficiales DGCyE / abc.gob.ar.
   ---------------------------------------------------------------------------
   Cómo se usa:
     1) El usuario elige TIPO de escuela: 'comun' o 'tecnica'.
     2) Para común: elige CICLO ('basico' 1-3 / 'superior' 4-6) y, en superior,
        la ORIENTACIÓN. El desplegable de materias = comunes del año + orientadas.
     3) Para técnica: elige año (básico 1-3) o, en superior (4-7), la ESPECIALIDAD.
        El desplegable = formación general + científico-tecnológica + talleres.
     4) Siempre se permite "Otra materia / módulo…" para cargar una a mano.
   Nota: los módulos técnico-específicos por especialidad varían según el plan
   de cada escuela; se incluyen los más usados y se pueden editar/agregar.
   =========================================================================== */

const MATERIAS_PBA = {

  // ───────────────────────── SECUNDARIA COMÚN ─────────────────────────
  comun: {

    // Ciclo Básico (1° a 3°)
    cicloBasico: {
      "1": [
        "Prácticas del Lenguaje",
        "Matemática",
        "Ciencias Naturales",
        "Ciencias Sociales",
        "Inglés",
        "Educación Física",
        "Educación Artística",          // rota: Plástica / Música / Teatro / Danza
        "Construcción de la Ciudadanía"
      ],
      "2": [
        "Prácticas del Lenguaje",
        "Matemática",
        "Ciencias Naturales",
        "Ciencias Sociales",
        "Inglés",
        "Educación Física",
        "Educación Artística",
        "Construcción de la Ciudadanía"
      ],
      "3": [
        "Prácticas del Lenguaje",
        "Matemática",
        "Biología",
        "Físico-Química",
        "Geografía",
        "Historia",
        "Inglés",
        "Educación Física",
        "Educación Artística",
        "Construcción de la Ciudadanía"
      ]
    },

    // Ciclo Superior (4° a 6°) — orientada
    cicloSuperior: {

      // Materias COMUNES a todas las orientaciones
      comunes: {
        "4": [
          "Literatura",
          "Matemática — Ciclo Superior",
          "Inglés",
          "Educación Física",
          "Historia",
          "Geografía",
          "Biología",
          "Introducción a la Física",
          "NTICX (Nuevas Tecnologías de la Información y la Conectividad)",
          "Salud y Adolescencia"
        ],
        // En 5° y 6° varias materias dependen de la orientación. Estas son las
        // comunes a todas; conviene confirmarlas con la caja de cada escuela.
        "5": [
          "Literatura",
          "Matemática — Ciclo Superior",
          "Inglés",
          "Educación Física",
          "Historia",
          "Geografía",
          "Política y Ciudadanía"
        ],
        "6": [
          "Literatura",
          "Inglés",
          "Educación Física",
          "Filosofía",
          "Trabajo y Ciudadanía"
        ]
      },

      // Materias ORIENTADAS por orientación y año
      orientaciones: {

        "Ciencias Naturales": {
          "4": ["Introducción a la Química"],
          "5": ["Fundamentos de la Química", "Física", "Biología", "Ciencias de la Tierra"],
          "6": ["Química del Carbono", "Biología, Genética y Sociedad", "Física Clásica y Moderna", "Ambiente, Desarrollo y Sociedad"]
        },

        "Ciencias Sociales": {
          "4": ["Psicología"],
          "5": ["Comunicación, Cultura y Sociedad", "Economía Política", "Sociología"],
          "6": ["Historia", "Geografía", "Proyecto de Investigación en Ciencias Sociales"]
        },

        "Economía y Administración": {
          "4": ["Sistemas de Información Contable", "Teoría de las Organizaciones"],
          "5": ["Elementos de Micro y Macroeconomía", "Sistemas de Información Contable", "Gestión Organizacional"],
          "6": ["Economía Política", "Proyectos Organizacionales"]
        },

        "Comunicación": {
          "4": ["Psicología", "Introducción a la Comunicación"],
          "5": ["Comunicación y Culturas del Consumo", "Observatorio de Comunicación, Cultura y Sociedad", "Observatorio de Medios"],
          "6": ["Taller de Comunicación Institucional y Comunitaria", "Taller de Producción en Lenguajes", "Comunicación y Transformaciones Socioculturales del Siglo XXI"]
        },

        "Lenguas Extranjeras": {
          "4": ["Portugués I", "Francés I", "Italiano I"],
          "5": ["Estudios Interculturales en Inglés I", "Portugués II", "Francés II", "Italiano II"],
          "6": ["Estudios Interculturales en Inglés II", "Portugués III"]
        },

        "Educación Física": {
          "4": ["Educación Física y Corporeidad", "Psicología", "Prácticas Deportivas y Atléticas"],
          "5": ["Educación Física y Cultura", "Prácticas Deportivas y Acuáticas", "Prácticas Corporales y Deportivas en el Ambiente Natural", "Sociología", "Prácticas Gimnásticas y Expresivas I"],
          "6": ["Educación Física y Comunidad", "Prácticas Deportivas y Juegos", "Prácticas Gimnásticas y Expresivas II"]
        },

        // Arte (subdivide por lenguaje a partir de 5°)
        "Arte — Artes Visuales": {
          "4": ["Producción y Análisis de la Imagen"],
          "5": ["Lenguaje Complementario", "Imagen y Nuevos Medios", "Imagen y Procedimientos Constructivos"],
          "6": ["Historia", "Lenguaje Complementario", "Proyecto de Producción en Artes Visuales"]
        },
        "Arte — Danza": {
          "4": ["Lenguaje de la Danza"],
          "5": ["Lenguaje Complementario", "Análisis Coreográfico", "Improvisación y Composición Coreográfica"],
          "6": ["Historia", "Lenguaje Complementario", "Proyecto de Producción en Danza"]
        },
        "Arte — Literatura": {
          "4": ["Taller de Lectura Literaria y Escritura"],
          "5": ["Lenguaje Complementario", "Seminario de Investigación Literaria", "Taller de Escritura"],
          "6": ["Historia", "Lenguaje Complementario", "Proyecto de Producción Literaria"]
        },
        "Arte — Música": {
          "4": ["Lenguaje Musical"],
          "5": ["Lenguaje Complementario", "Análisis y Producción en Música", "Práctica de Conjuntos Vocales e Instrumentales"],
          "6": ["Historia", "Lenguaje Complementario", "Proyecto de Producción en Música"]
        },
        "Arte — Teatro": {
          "4": ["Actuación"],
          "5": ["Lenguaje Complementario", "Análisis del Lenguaje Teatral", "Actuación y Procedimientos Constructivos en Teatro"],
          "6": ["Historia", "Lenguaje Complementario", "Proyecto de Producción en Teatro"]
        }
      }
    }
  },

  // ──────────────────────── SECUNDARIA TÉCNICA ────────────────────────
  // Modalidad Educación Técnico Profesional (ETP) — 7 años.
  tecnica: {

    // Ciclo Básico Técnico (1° a 3°): formación general + área técnica
    cicloBasico: {
      "1": [
        "Prácticas del Lenguaje", "Matemática", "Ciencias Naturales", "Ciencias Sociales",
        "Inglés", "Educación Física", "Educación Artística", "Construcción de la Ciudadanía",
        // Área técnica (talleres / módulos)
        "Lenguajes Tecnológicos", "Sistemas Tecnológicos", "Procedimientos Técnicos", "Informática"
      ],
      "2": [
        "Prácticas del Lenguaje", "Matemática", "Ciencias Naturales", "Ciencias Sociales",
        "Inglés", "Educación Física", "Educación Artística", "Construcción de la Ciudadanía",
        "Lenguajes Tecnológicos", "Sistemas Tecnológicos", "Procedimientos Técnicos", "Informática"
      ],
      "3": [
        "Prácticas del Lenguaje", "Matemática", "Biología", "Físico-Química",
        "Geografía", "Historia", "Inglés", "Educación Física", "Educación Artística",
        "Construcción de la Ciudadanía",
        "Lenguajes Tecnológicos", "Sistemas Tecnológicos", "Procedimientos Técnicos", "Proyecto Tecnológico", "Informática"
      ]
    },

    // Ciclo Superior Técnico (4° a 7°): se combinan estos tres bloques + especialidad
    formacionGeneral: [
      "Literatura", "Inglés", "Educación Física", "Historia", "Geografía",
      "Arte", "Filosofía", "Política y Ciudadanía", "Salud y Adolescencia"
    ],

    cientificoTecnologica: [
      "Matemática", "Física", "Química",
      "Derecho del Trabajo", "Emprendimientos Productivos y Desarrollo Local",
      "Módulos TIC (Tecnologías de la Información y la Comunicación)"
    ],

    // Tecnicaturas (especialidades) y sus talleres/módulos técnico-específicos
    // representativos. Editar/ampliar según el plan de cada escuela.
    especialidades: {
      "Electromecánica": [
        "Taller", "Dibujo Tecnológico", "Tecnología de los Materiales",
        "Electrotecnia", "Mecánica y Mecanismos", "Resistencia de Materiales",
        "Máquinas Eléctricas", "Sistemas Mecánicos", "Instalaciones Eléctricas",
        "Mantenimiento y Reparación de Equipos e Instalaciones", "Prácticas Profesionalizantes"
      ],
      "Electrónica": [
        "Taller", "Dibujo Tecnológico", "Sistemas Digitales",
        "Análisis de Circuitos Eléctricos", "Electrónica Analógica", "Electrónica Digital",
        "Sistemas de Comunicaciones", "Sistemas de Control", "Microcontroladores",
        "Prácticas Profesionalizantes"
      ],
      "Informática Personal y Profesional": [
        "Taller", "Sistemas de Computación", "Programación",
        "Redes de Datos", "Bases de Datos", "Hardware y Mantenimiento",
        "Diseño de Sistemas", "Soporte Técnico", "Prácticas Profesionalizantes"
      ],
      "Construcciones / Maestro Mayor de Obras": [
        "Taller", "Dibujo Técnico y Computarizado", "Tecnología de los Materiales",
        "Estructuras", "Construcciones", "Instalaciones (sanitarias, eléctricas, gas)",
        "Topografía", "Proyecto y Diseño", "Cómputos y Presupuestos", "Prácticas Profesionalizantes"
      ],
      "Química": [
        "Taller / Laboratorio", "Química General e Inorgánica", "Química Orgánica",
        "Química Analítica", "Fisicoquímica", "Microbiología",
        "Análisis Industriales", "Operaciones Unitarias", "Seguridad e Higiene", "Prácticas Profesionalizantes"
      ],
      "Tecnología de los Alimentos": [
        "Taller / Laboratorio", "Química de los Alimentos", "Microbiología de los Alimentos",
        "Análisis de Alimentos", "Procesos y Operaciones", "Conservación de Alimentos",
        "Bromatología", "Seguridad e Higiene", "Prácticas Profesionalizantes"
      ],
      "Administración de las Organizaciones": [
        "Sistemas de Información Contable", "Administración", "Economía",
        "Derecho", "Gestión de las Organizaciones", "Comercialización",
        "Recursos Humanos", "Subsistema Administrativo Contable", "Prácticas Profesionalizantes"
      ],
      "Automotores": [
        "Taller", "Dibujo Tecnológico", "Tecnología de los Materiales",
        "Motores", "Sistemas de Transmisión", "Sistemas Eléctricos del Automotor",
        "Electrónica del Automotor", "Mantenimiento y Reparación", "Prácticas Profesionalizantes"
      ],
      "Aeronáutica": [
        "Taller", "Dibujo Tecnológico", "Aerodinámica",
        "Estructuras de Aeronaves", "Motores de Aeronaves", "Sistemas de Aeronaves",
        "Mantenimiento Aeronáutico", "Prácticas Profesionalizantes"
      ],
      "Aviónica": [
        "Taller", "Sistemas Digitales", "Electrónica Aplicada",
        "Instrumental de Aeronaves", "Sistemas de Navegación y Comunicación",
        "Mantenimiento de Sistemas Aviónicos", "Prácticas Profesionalizantes"
      ],
      "Servicios Turísticos": [
        "Servicios Turísticos", "Geografía Turística", "Patrimonio Turístico",
        "Agencias de Viajes", "Hotelería", "Inglés Técnico",
        "Gestión de Servicios Turísticos", "Prácticas Profesionalizantes"
      ],
      "Multimedios": [
        "Taller", "Diseño Multimedial", "Producción Gráfica",
        "Producción Audiovisual", "Animación", "Programación Multimedial",
        "Sonido", "Prácticas Profesionalizantes"
      ],
      "Construcciones Navales": [
        "Taller", "Dibujo Tecnológico", "Tecnología de los Materiales",
        "Arquitectura Naval", "Estructuras Navales", "Sistemas de Propulsión",
        "Construcción de Embarcaciones", "Prácticas Profesionalizantes"
      ]
    }
  }
};

// Opción que conviene agregar siempre al final de cada desplegable:
const MATERIA_OTRA = "Otra materia / módulo…";

// (Para módulos: typeof module !== 'undefined' && (module.exports = { MATERIAS_PBA, MATERIA_OTRA });)
