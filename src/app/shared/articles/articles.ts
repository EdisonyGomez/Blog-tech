export interface Article {
  id: number
  titulo: string
  resumen: string
  fecha: string
  slug: string
  categoria: string
  tiempoLectura: number
  vistas: number
  likes: number
  expanded: boolean
  contenidoPreview: string
  bookmarked: boolean
  // Nuevas propiedades mejoradas
  autor: string
  fechaActualizacion?: string
  tags: string[]
  dificultad: "Principiante" | "Intermedio" | "Avanzado"
  tipoContenido: "Guía" | "Tutorial" | "Análisis" | "Caso de estudio" | "Herramientas"
  imagenDestacada: string
  metaDescripcion: string
  palabrasClave: string[]
  tiempoImplementacion: string // ej: "15 minutos", "1 hora"
  herramientasNecesarias: string[]
  nivelAhorro: "Bajo" | "Medio" | "Alto" // Nivel de ahorro de tiempo/dinero
  puntuacionSEO: number // 1-100
  estadisticasImpacto: {
    tiempoAhorrado: string
    porcentajeMejora: string
    usuariosAyudados: number
  }
  recursosAdicionales: {
    plantillas?: string[]
    herramientasRecomendadas?: string[]
    enlacesUtiles?: string[]
  }
  actualizacionesPendientes: boolean
  featured: boolean
  trending: boolean
  comentariosHabilitados: boolean
}

export const Articulos: Article[] = [
  {
    id: 1,
    titulo: "5 ideas sencillas para usar ChatGPT todos los días",
    resumen:
      "Descubre cómo integrar ChatGPT en tu rutina diaria para organizarte mejor, escribir más rápido y desbloquear ideas creativas, sin necesidad de programación.",
    fecha: "11 de julio de 2025",
    fechaActualizacion: "15 de julio de 2025",
    slug: "usar-chatgpt-vida-diaria",
    categoria: "ChatGPT",
    tiempoLectura: 9,
    vistas: 1250,
    likes: 89,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["ChatGPT", "Productividad", "IA", "Automatización", "Prompts"],
    dificultad: "Principiante",
    tipoContenido: "Guía",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Aprende 5 formas prácticas de usar ChatGPT en tu día a día: organizar tareas, escribir correos, cocinar, encontrar regalos y aprender más rápido. Incluye prompts copiables.",
    palabrasClave: ["ChatGPT", "productividad", "IA", "prompts", "automatización", "organización"],
    tiempoImplementacion: "10-15 minutos",
    herramientasNecesarias: ["ChatGPT (gratuito o Plus)", "Navegador web"],
    nivelAhorro: "Alto",
    puntuacionSEO: 95,
    estadisticasImpacto: {
      tiempoAhorrado: "2-3 horas diarias",
      porcentajeMejora: "85% menos estrés organizacional",
      usuariosAyudados: 1250,
    },
    recursosAdicionales: {
      plantillas: ["Plantilla de organización semanal", "Prompts para correos profesionales"],
      herramientasRecomendadas: ["ChatGPT Plus", "Notion", "Google Calendar"],
      enlacesUtiles: ["https://chat.openai.com", "Guía oficial de OpenAI"],
    },
    actualizacionesPendientes: false,
    featured: true,
    trending: true,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>🎯 Lo que aprenderás:</h4>
      <ul>
        <li>Organizar tu semana como un asistente personal</li>
        <li>Escribir correos profesionales en segundos</li>
        <li>Generar ideas para comidas con ingredientes disponibles</li>
        <li>Encontrar regalos únicos y personalizados</li>
        <li>Aprender temas nuevos de forma rápida</li>
      </ul>
      <p><strong>Bonus:</strong> Incluye prompts listos para copiar y pegar.</p>
    `,
    bookmarked: false,
  },
  {
    id: 2,
    titulo: "Canva AI: Diseña presentaciones profesionales sin ser diseñador",
    resumen:
      "Guía completa para crear diseños impactantes usando las herramientas de inteligencia artificial de Canva, con plantillas, elementos automáticos y consejos de diseño.",
    fecha: "8 de julio de 2025",
    fechaActualizacion: "12 de julio de 2025",
    slug: "canva-ai-presentaciones",
    categoria: "Herramientas",
    tiempoLectura: 7,
    vistas: 980,
    likes: 67,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["Canva", "Diseño", "Presentaciones", "IA", "Creatividad"],
    dificultad: "Principiante",
    tipoContenido: "Tutorial",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Aprende a crear presentaciones profesionales con Canva AI en minutos. Guía paso a paso con plantillas, trucos de diseño y elementos automáticos.",
    palabrasClave: ["Canva AI", "presentaciones", "diseño", "plantillas", "IA", "creatividad"],
    tiempoImplementacion: "30 minutos",
    herramientasNecesarias: ["Canva (gratuito o Pro)", "Navegador web"],
    nivelAhorro: "Medio",
    puntuacionSEO: 88,
    estadisticasImpacto: {
      tiempoAhorrado: "1-2 horas por presentación",
      porcentajeMejora: "70% mejor calidad visual",
      usuariosAyudados: 980,
    },
    recursosAdicionales: {
      plantillas: ["Pack de plantillas profesionales", "Guía de colores y tipografías"],
      herramientasRecomendadas: ["Canva Pro", "Unsplash", "Google Fonts"],
      enlacesUtiles: ["https://canva.com", "Canva Design School"],
    },
    actualizacionesPendientes: false,
    featured: false,
    trending: false,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>🎨 Qué incluye esta guía:</h4>
      <ul>
        <li>Configuración inicial de Canva AI</li>
        <li>Templates inteligentes que se adaptan a tu contenido</li>
        <li>Generación automática de colores y tipografías</li>
        <li>Trucos para presentaciones que impacten</li>
      </ul>
      <p><strong>Resultado:</strong> Presentaciones de nivel profesional en menos de 10 minutos.</p>
    `,
    bookmarked: false,
  },
  {
    id: 3,
    titulo: "Automatiza tu correo electrónico con IA (y ahorra 2 horas diarias)",
    resumen:
      "Descubre cómo usar herramientas de IA para automatizar respuestas, clasificar emails y gestionar tu bandeja de entrada de forma inteligente.",
    fecha: "6 de julio de 2025",
    slug: "automatizar-correo-ia",
    categoria: "Productividad",
    tiempoLectura: 8,
    vistas: 1450,
    likes: 112,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["Email", "Automatización", "IA", "Productividad", "Gestión"],
    dificultad: "Intermedio",
    tipoContenido: "Guía",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Automatiza tu correo electrónico con IA: respuestas inteligentes, clasificación automática y gestión eficiente. Ahorra 2+ horas diarias.",
    palabrasClave: ["automatización email", "IA", "productividad", "gestión correo", "respuestas automáticas"],
    tiempoImplementacion: "45 minutos",
    herramientasNecesarias: ["Gmail/Outlook", "Zapier", "ChatGPT"],
    nivelAhorro: "Alto",
    puntuacionSEO: 92,
    estadisticasImpacto: {
      tiempoAhorrado: "2-3 horas diarias",
      porcentajeMejora: "90% reducción en emails pendientes",
      usuariosAyudados: 1450,
    },
    recursosAdicionales: {
      plantillas: ["Plantillas de respuestas automáticas", "Filtros de clasificación"],
      herramientasRecomendadas: ["Zapier", "IFTTT", "Gmail API"],
      enlacesUtiles: ["https://zapier.com", "Gmail Help Center"],
    },
    actualizacionesPendientes: false,
    featured: true,
    trending: true,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>⚡ Sistema de automatización:</h4>
      <ul>
        <li>Clasificación automática de emails importantes</li>
        <li>Respuestas inteligentes para consultas frecuentes</li>
        <li>Resúmenes diarios de tu bandeja de entrada</li>
        <li>Integración con tu calendario y tareas</li>
      </ul>
      <p><strong>Ahorro estimado:</strong> 2-3 horas por semana.</p>
    `,
    bookmarked: false,
  },
  {
    id: 4,
    titulo: "Organiza tus tareas con IA: de caos a productividad en 15 minutos",
    resumen:
      "Transforma tu lista de pendientes en un sistema organizado usando IA para priorizar, categorizar y planificar tus tareas de manera inteligente.",
    fecha: "14 de julio de 2025",
    slug: "organiza-tareas-ia",
    categoria: "Productividad",
    tiempoLectura: 6,
    vistas: 750,
    likes: 55,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["Organización", "Tareas", "IA", "Productividad", "Planificación"],
    dificultad: "Principiante",
    tipoContenido: "Guía",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Organiza tus tareas con IA: priorización inteligente, categorización automática y planificación eficiente. De caos a productividad en 15 minutos.",
    palabrasClave: ["organización tareas", "IA", "productividad", "planificación", "gestión tiempo"],
    tiempoImplementacion: "15 minutos",
    herramientasNecesarias: ["Notion AI", "ClickUp", "ChatGPT"],
    nivelAhorro: "Medio",
    puntuacionSEO: 85,
    estadisticasImpacto: {
      tiempoAhorrado: "1 hora diaria",
      porcentajeMejora: "60% mejor organización",
      usuariosAyudados: 750,
    },
    recursosAdicionales: {
      plantillas: ["Template de organización de tareas", "Sistema de prioridades"],
      herramientasRecomendadas: ["Notion AI", "ClickUp AI", "Motion"],
      enlacesUtiles: ["https://notion.so", "ClickUp Templates"],
    },
    actualizacionesPendientes: false,
    featured: false,
    trending: false,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>📋 Lo que aprenderás:</h4>
      <ul>
        <li>Cómo usar Notion AI para generar planes de tareas</li>
        <li>Consejos para escribir prompts efectivos</li>
        <li>Personalizar y ejecutar tu plan de organización</li>
        <li>Caso de éxito real de una emprendedora</li>
      </ul>
      <p><strong>Herramientas:</strong> Notion AI, ClickUp AI, Motion.</p>
    `,
    bookmarked: false,
  },
  {
    id: 5,
    titulo: "El arte de trabajar sin estrés: Cómo usar IA para redefinir la productividad humana", 
    resumen:
      "Rediseña tu relación con el trabajo con el modelo TRIA (Tiempo, Ritmo, Intención, Adaptación) y herramientas de IA. Menos estrés, más claridad y resultados sostenibles.",
    fecha: "22 de agosto de 2025",
    fechaActualizacion: "22 de agosto de 2025",
    slug: "productividad-con-ia",
    categoria: "Productividad",
    tiempoLectura: 15,
    vistas: 0,
    likes: 0,
    expanded: false,
    autor: "Edinson Gomez",
    tags: [
      "TRIA",
      "Productividad Consciente",
      "IA",
      "Trabajo Profundo",
      "Bienestar",
      "Ritmos Ultradianos",
      "Planificación"
    ],
    dificultad: "Intermedio",
    tipoContenido: "Análisis",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Aprende a aplicar la IA para trabajar sin estrés con el modelo TRIA. Guía completa con pasos de implementación, métricas de bienestar y herramientas recomendadas.",
    palabrasClave: [
      "productividad con IA",
      "modelo TRIA",
      "trabajo sin estrés",
      "ritmos ultradianos",
      "fatiga decisional",
      "trabajo profundo",
      "bienestar laboral",
      "reclaim ai",
      "motion",
      "notion ai"
    ],
    tiempoImplementacion: "30 días (plan escalonado)",
    herramientasNecesarias: [
      "ChatGPT",
      "Notion AI",
      "Motion",
      "Reclaim.ai",
      "RescueTime",
      "Zapier + OpenAI API (opcional)"
    ],
    nivelAhorro: "Alto",
    puntuacionSEO: 94,
    estadisticasImpacto: {
      tiempoAhorrado: "2-3 horas diarias",
      porcentajeMejora: "25-40% más enfoque sostenido",
      usuariosAyudados: 0
    },
    recursosAdicionales: {
      plantillas: [
        "Template evaluación de energía diaria (TRIA)",
        "Plantilla revisión semanal TRIA",
        "Dashboard semanal de métricas (IES, Flow, Intención)"
      ],
      herramientasRecomendadas: [
        "Notion AI",
        "Motion",
        "Reclaim.ai",
        "RescueTime",
        "Clockify AI"
      ],
      enlacesUtiles: [
        "/articulos/organiza-tareas-ia",
        "/articulos/usar-chatgpt-vida-diaria"
      ]
    },
    actualizacionesPendientes: false,
    featured: true,
    trending: true,
    comentariosHabilitados: true,
    contenidoPreview: `
    <h4>🌿 Productividad que respira contigo</h4>
    <p>Aplica el modelo <strong>TRIA</strong> (Tiempo, Ritmo, Intención, Adaptación) para trabajar menos horas, con más claridad y cero culpa.</p>
    <ul>
      <li><strong>Neurociencia práctica:</strong> Ritmos ultradianos (bloques de 90 min + pausas de 15-20)</li>
      <li><strong>IA como copiloto:</strong> reduce la fatiga decisional, predice tus picos de energía y sugiere pausas inteligentes</li>
      <li><strong>Plan 30 días:</strong> mapea energía → crea ritmo → define intención → adapta con datos</li>
      <li><strong>Métricas TRIA:</strong> IES (Índice de Energía Sostenida), Ratio de trabajo profundo, Intención cumplida</li>
      <li><strong>Prompts incluidos:</strong> evaluación diaria, priorización inteligente y revisión semanal</li>
    </ul>
    <p><em>Resultado:</em> -30% de agotamiento y +25% de satisfacción con el trabajo en 4 semanas.</p>
  `,
    bookmarked: false,
  },

  {
    id: 6,
    titulo: "Cómo usar inteligencia artificial para planear un viaje completo",
    resumen:
      "Descubre cómo la IA puede ayudarte a planificar cada aspecto de tu viaje: desde la investigación inicial hasta el itinerario detallado, presupuesto y recomendaciones personalizadas.",
    fecha: "20 de julio de 2025",
    slug: "planear-viaje-con-ia",
    categoria: "Herramientas",
    tiempoLectura: 8,
    vistas: 320,
    likes: 28,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["Viajes", "Planificación", "IA", "Turismo", "Itinerarios"],
    dificultad: "Principiante",
    tipoContenido: "Guía",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Planifica tu viaje completo con IA: itinerarios personalizados, presupuestos optimizados y recomendaciones inteligentes. Guía paso a paso.",
    palabrasClave: ["planificación viajes", "IA", "itinerarios", "turismo", "presupuesto viaje"],
    tiempoImplementacion: "30-45 minutos",
    herramientasNecesarias: ["ChatGPT", "Google Bard", "Tripnotes AI"],
    nivelAhorro: "Alto",
    puntuacionSEO: 82,
    estadisticasImpacto: {
      tiempoAhorrado: "5-8 horas de planificación",
      porcentajeMejora: "75% mejor organización del viaje",
      usuariosAyudados: 320,
    },
    recursosAdicionales: {
      plantillas: ["Template de planificación de viaje", "Lista de verificación pre-viaje"],
      herramientasRecomendadas: ["Tripnotes AI", "Kayak AI", "Google Maps"],
      enlacesUtiles: ["https://tripnotes.ai", "Google Travel"],
    },
    actualizacionesPendientes: false,
    featured: true,
    trending: true,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>✈️ Lo que aprenderás:</h4>
      <ul>
        <li>Elegir destinos ideales con ChatGPT y Google Bard</li>
        <li>Generar itinerarios completos con Tripnotes AI</li>
        <li>Encontrar vuelos económicos con Kayak AI</li>
        <li>Buscar hospedaje perfecto sin complicaciones</li>
        <li>Crear presupuestos detallados con ayuda de IA</li>
      </ul>
      <p><strong>Caso real:</strong> Marco y su primer viaje internacional con IA.</p>
    `,
    bookmarked: false,
  },
  {
    id: 7,
    titulo: "Transforma tu rutina diaria con inteligencia artificial: guía interactiva",
    resumen:
      "Aprende a integrar herramientas de IA en tu día a día para optimizar tiempo, mejorar decisiones y crear hábitos más efectivos con nuestra guía paso a paso.",
    fecha: "25 de julio de 2025",
    slug: "rutina-inteligente-con-ia",
    categoria: "Productividad",
    tiempoLectura: 10,
    vistas: 180,
    likes: 15,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["Rutinas", "Hábitos", "IA", "Productividad", "Bienestar"],
    dificultad: "Principiante",
    tipoContenido: "Guía",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Transforma tu rutina diaria con IA: optimización de tiempo, mejores decisiones y hábitos efectivos. Guía interactiva con simulador incluido.",
    palabrasClave: ["rutina diaria", "IA", "productividad", "hábitos", "optimización tiempo"],
    tiempoImplementacion: "20-30 minutos",
    herramientasNecesarias: ["ChatGPT", "Notion", "Google Calendar"],
    nivelAhorro: "Alto",
    puntuacionSEO: 87,
    estadisticasImpacto: {
      tiempoAhorrado: "2 horas diarias",
      porcentajeMejora: "85% mejor organización personal",
      usuariosAyudados: 180,
    },
    recursosAdicionales: {
      plantillas: ["Simulador de rutina personalizada", "Template de hábitos"],
      herramientasRecomendadas: ["Notion AI", "Google Assistant", "IFTTT"],
      enlacesUtiles: ["https://notion.so", "IFTTT Applets"],
    },
    actualizacionesPendientes: false,
    featured: true,
    trending: false,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>🚀 Experiencia interactiva:</h4>
      <ul>
        <li>Infografía animada: Día sin IA vs con IA</li>
        <li>Simulador personalizado de rutina inteligente</li>
        <li>3 pasos para automatizar tareas repetitivas</li>
        <li>Caso de éxito: Sandra recuperó 2 horas diarias</li>
        <li>Herramientas esenciales con acceso directo</li>
      </ul>
      <p><strong>Incluye:</strong> Simulador interactivo para generar tu rutina personalizada.</p>
    `,
    bookmarked: false,
  },
  {
    id: 8,
    titulo: "Cómo crear tu currículum con inteligencia artificial (y destacar frente a cientos de candidatos)",
    resumen:
      "Aprende a crear un CV profesional, optimizado para reclutadores, usando herramientas de inteligencia artificial. Incluye prompts, plantillas y consejos prácticos.",
    fecha: "30 de julio de 2025",
    slug: "crear-curriculum-con-ia",
    categoria: "Herramientas",
    tiempoLectura: 12,
    vistas: 95,
    likes: 8,
    expanded: false,
    autor: "Equipo IA Blog",
    tags: ["Currículum", "CV", "IA", "Empleo", "Reclutamiento", "ATS"],
    dificultad: "Principiante",
    tipoContenido: "Guía",
    imagenDestacada: "/placeholder.svg?height=400&width=600",
    metaDescripcion:
      "Crea tu currículum con IA: optimizado para ATS, destacado frente a competidores. Incluye prompts, plantillas y analizador de CV.",
    palabrasClave: ["currículum IA", "CV", "ATS", "reclutamiento", "empleo", "búsqueda trabajo"],
    tiempoImplementacion: "45-60 minutos",
    herramientasNecesarias: ["ChatGPT", "Rezi AI", "Resume.io", "Canva AI"],
    nivelAhorro: "Alto",
    puntuacionSEO: 90,
    estadisticasImpacto: {
      tiempoAhorrado: "3-5 horas de creación",
      porcentajeMejora: "90% mejor tasa de respuesta",
      usuariosAyudados: 95,
    },
    recursosAdicionales: {
      plantillas: ["Analizador de CV personalizado", "Templates por sector"],
      herramientasRecomendadas: ["Rezi AI", "Resume.io", "Canva AI"],
      enlacesUtiles: ["https://rezi.ai", "Resume.io Templates"],
    },
    actualizacionesPendientes: false,
    featured: true,
    trending: true,
    comentariosHabilitados: true,
    contenidoPreview: `
      <h4>📄 Lo que incluye esta guía:</h4>
      <ul>
        <li>4 herramientas esenciales: ChatGPT, Rezi AI, Resume.io, Canva AI</li>
        <li>Prompts específicos para cada sección del CV</li>
        <li>Simulador interactivo para analizar tu perfil</li>
        <li>Optimización para sistemas ATS de reclutamiento</li>
        <li>Caso real: Kevin consiguió trabajo en 10 días</li>
      </ul>
      <p><strong>Incluye:</strong> Analizador de CV personalizado según tu sector y experiencia.</p>
    `,
    bookmarked: false,
  },
  {
  id: 9,
  titulo: "Construye tu Memoria Personal con IA: RAG doméstico y privacidad primero",
  resumen:
    "Crea tu ‘segundo cerebro’ con IA: rutas No-Code y Low-Code local (Ollama + Chroma/Qdrant), privacidad por diseño y un tablero de métricas para lograr decisiones más rápidas con citas a tus fuentes.",
  fecha: "30 de agosto de 2025",
  fechaActualizacion: "30 de agosto de 2025",
  slug: "memoria-personal-con-ia",
  categoria: "Herramientas",
  tiempoLectura: 14,
  vistas: 0,
  likes: 0,
  expanded: false,
  autor: "Edinson Gomez",
  tags: [
    "Memoria Personal",
    "RAG",
    "Privacidad",
    "Ollama",
    "Chroma",
    "Qdrant",
    "Markdown",
    "Obsidian",
    "Notion",
    "Automatización"
  ],
  dificultad: "Intermedio",
  tipoContenido: "Guía",
  imagenDestacada: "/assets/images/info/segundo-cerebro-ia.png",
  metaDescripcion:
    "Aprende a montar una Memoria Personal con IA: RAG doméstico, rutas No-Code y Low-Code local, privacidad por diseño y métricas de éxito en 30 días.",
  palabrasClave: [
    "memoria personal",
    "RAG",
    "segundo cerebro",
    "Ollama",
    "Chroma",
    "Qdrant",
    "Obsidian",
    "Notion",
    "privacidad",
    "IA local",
    "embeddings",
    "gestión del conocimiento"
  ],
  tiempoImplementacion: "30-60 minutos (No-Code) / 2-3 horas (Low-Code)",
  herramientasNecesarias: [
    "Notion o Google Drive",
    "Zapier o Make",
    "Obsidian (Markdown)",
    "Ollama",
    "Chroma o Qdrant"
  ],
  nivelAhorro: "Alto",
  puntuacionSEO: 96,
  estadisticasImpacto: {
    tiempoAhorrado: "2-4 horas semanales",
    porcentajeMejora: "70% menos tiempo de búsqueda",
    usuariosAyudados: 0
  },
  recursosAdicionales: {
    plantillas: [
      "Estructura de carpetas Markdown (vault)",
      "Checklist de ingesta y limpieza de notas",
      "Tablero semanal de métricas (respuesta y citas)"
    ],
    herramientasRecomendadas: [
      "Obsidian",
      "Ollama",
      "Qdrant",
      "Chroma",
      "Notion"
    ],
    enlacesUtiles: [
      "https://obsidian.md",
      "https://ollama.com",
      "https://qdrant.tech",
      "https://www.trychroma.com",
      "/articulos/organiza-tareas-ia",
      "/articulos/productividad-con-ia"
    ]
  },
  actualizacionesPendientes: false,
  featured: true,
  trending: true,
  comentariosHabilitados: true,
  contenidoPreview: `
    <h4>🗂️ Tu conocimiento, en orden (y privado)</h4>
    <ul>
      <li><strong>Dos rutas:</strong> No-Code (rápida) y Low-Code local con Ollama + Chroma/Qdrant</li>
      <li><strong>Privacidad por diseño:</strong> datos bajo tu control y respuestas con <em>citas</em> a tus notas</li>
      <li><strong>Mantenimiento fácil:</strong> estandariza títulos, etiquetas y limpia duplicados</li>
      <li><strong>Prompts incluidos:</strong> consulta con contexto, resúmenes vivos y vacíos de información</li>
      <li><strong>Métricas:</strong> &lt; 3 min para encontrar respuesta y % de decisiones con fuente</li>
    </ul>
    <p><em>Resultado:</em> decisiones más rápidas, menos ruido y aprendizaje acumulativo.</p>
  `,
  bookmarked: false,
},
{
  id: 10,
  titulo: "Cómo usar “Nano Banana” (Gemini 2.5 Flash Image) para crear y editar imágenes con IA",
  resumen:
    "Guía completa y práctica para principiantes: configuración en Google AI Studio, generación sin código, integración con JavaScript/Python, edición por texto, fusión de imágenes y mejores prácticas. Incluye sección de prompts inyectados desde el TS.",
  fecha: "5 de septiembre de 2025",
  fechaActualizacion: "5 de septiembre de 2025",
  slug: "nano-banana",
  categoria: "Herramientas",
  tiempoLectura: 14,
  vistas: 0,
  likes: 0,
  expanded: false,
  autor: "Equipo IA Blog",
  tags: [
    "Gemini",
    "Nano Banana",
    "Generación de Imágenes",
    "Edición con IA",
    "Google AI Studio",
    "JavaScript",
    "Python"
  ],
  dificultad: "Principiante",
  tipoContenido: "Guía",
  imagenDestacada: "/assets/images/articulos/nano-banana-gemini-flash-image.png",
  metaDescripcion:
    "Aprende a usar “Nano Banana” (Gemini 2.5 Flash Image) para generar y editar imágenes con IA. Pasos sin código, integración con JS/Python, edición por texto, fusión multi-imagen y buenas prácticas.",
  palabrasClave: [
    "Nano Banana",
    "Gemini 2.5 Flash Image",
    "Google AI Studio",
    "generar imágenes con IA",
    "editar imágenes con IA",
    "SDK @google/genai",
    "google-genai",
    "prompts de imagen"
  ],
  tiempoImplementacion: "20-40 minutos",
  herramientasNecesarias: [
    "Google AI Studio",
    "GEMINI_API_KEY",
    "Node.js 18+ (opcional)",
    "Python 3.9+ (opcional)",
    "@google/genai (JS, opcional)",
    "google-genai (Python, opcional)"
  ],
  nivelAhorro: "Alto",
  puntuacionSEO: 93,
  estadisticasImpacto: {
    tiempoAhorrado: "2-4 horas por pieza visual",
    porcentajeMejora: "70% reducción de iteraciones manuales",
    usuariosAyudados: 0
  },
  recursosAdicionales: {
    plantillas: [
      "Plantilla de prompts por categoría (producto, retrato, póster, infografía)",
      "Checklist de exportación para web (peso, nitidez, perfil de color)"
    ],
    herramientasRecomendadas: [
      "Google AI Studio",
      "@google/genai",
      "google-genai",
      "Photopea/Photoshop (post-pro ligero)"
    ],
    enlacesUtiles: [
      "/articulos/organiza-tareas-ia",
      "/articulos/usar-chatgpt-vida-diaria"
    ]
  },
  actualizacionesPendientes: false,
  featured: true,
  trending: true,
  comentariosHabilitados: true,
  contenidoPreview: `
    <h4>🖼️ Crea y edita imágenes con IA (paso a paso)</h4>
    <ul>
      <li><strong>Sin código:</strong> genera imágenes desde Google AI Studio y valida ideas en minutos.</li>
      <li><strong>Con código:</strong> integra el modelo en JS/Python para automatizar y escalar.</li>
      <li><strong>Edición textual:</strong> elimina objetos, reilumina, corrige color y aplica desenfoque de fondo.</li>
      <li><strong>Fusión multi-imagen:</strong> combina producto + escenario con instrucciones claras.</li>
      <li><strong>UX/SEO:</strong> estructura semántica, accesibilidad y buenas prácticas para web.</li>
    </ul>
    <p class="text-sm">Nota: la sección de <em>Prompts</em> se renderiza desde el <strong>TS</strong> con <code>@for</code> (no se incluyen en el HTML).</p>
  `,
  bookmarked: false
}


]

// Funciones auxiliares para el manejo de artículos
export const getArticleById = (id: number): Article | undefined => {
  return Articulos.find((article) => article.id === id)
}

export const getArticleBySlug = (slug: string): Article | undefined => {
  return Articulos.find((article) => article.slug === slug)
}

export const getFeaturedArticles = (): Article[] => {
  return Articulos.filter((article) => article.featured)
}

export const getTrendingArticles = (): Article[] => {
  return Articulos.filter((article) => article.trending)
}

export const getArticlesByCategory = (categoria: string): Article[] => {
  return Articulos.filter((article) => article.categoria.toLowerCase() === categoria.toLowerCase())
}

export const getArticlesByTag = (tag: string): Article[] => {
  return Articulos.filter((article) =>
    article.tags.some((articleTag) => articleTag.toLowerCase() === tag.toLowerCase()),
  )
}

export const getRelatedArticles = (currentArticle: Article, limit = 3): Article[] => {
  return Articulos.filter(
    (article) =>
      article.id !== currentArticle.id &&
      (article.categoria === currentArticle.categoria || article.tags.some((tag) => currentArticle.tags.includes(tag))),
  )
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, limit)
}

export const searchArticles = (query: string): Article[] => {
  const searchTerm = query.toLowerCase()
  return Articulos.filter(
    (article) =>
      article.titulo.toLowerCase().includes(searchTerm) ||
      article.resumen.toLowerCase().includes(searchTerm) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      article.palabrasClave.some((keyword) => keyword.toLowerCase().includes(searchTerm)),
  )
}
