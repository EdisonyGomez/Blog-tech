import { Component, OnInit, AfterViewInit, HostListener, Inject, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


import { Navbar } from '../../../shared/navbar/navbar';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { ScrollService } from '../../../services/scroll.service';



interface AIPrompt {
  id: string
  title: string
  description: string
  prompt: string
  category: "consulta" | "aprendizaje" | "memoria" | "analisis"
  difficulty: "basico" | "intermedio" | "avanzado"
  estimatedTime: string
  tags: string[]
}


interface UseCase {
  id: string
  title: string
  userType: string
  problem: string
  solution: string
  results: string[]
  timeToValue: string
  tools: string[]
}


interface Metric {
  name: string
  description: string
  target: string
  frequency: string
  importance: "alta" | "media" | "baja"
}

@Component({
  selector: 'app-memoria-personal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: './memoria-personal.html',
  styleUrl: './memoria-personal.css'
})
export class MemoriaPersonal implements OnInit, AfterViewInit  {
  private readonly platformId = inject(PLATFORM_ID)
  readonly isBrowser = isPlatformBrowser(this.platformId)

  // Estados de la UI
  isBookmarked = false
  readingProgress = 0
  showFloatingCTA = false
  selectedPromptCategory = "consulta"
  expandedUseCaseId: string | null = null

  // Control de rendimiento para scroll
  private ticking = false

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
  @Inject(DOCUMENT) private doc: Document,   // ✅ CORRECTO
  ) {}

  /**
   * Configuración de breadcrumbs para navegación
   */
  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Memoria Personal con IA", active: true },
  ]

  /**
   * Metadatos del artículo con información del autor y fechas
   */
  articleMeta = {
    categoria: "Herramientas IA",
    tiempoLectura: 18,
    fechaPublicacion: "30 de agosto de 2025",
    fechaActualizacion: "30 de agosto de 2025",
    autorNombre: "Edinson Gomez",
    autorFoto: "/assets/images/me/me.png",
    autorPerfil: "/about-me",
    palabrasClave: ["RAG", "IA", "Memoria Personal", "Privacidad", "Productividad"],
    dificultad: "Intermedio",
    audiencia: "Profesionales, Estudiantes, Freelancers",
  }

  /**
   * Colección de prompts profesionales organizados por categoría
   * Cada prompt incluye contexto, estructura y casos de uso específicos
   */
  aiPrompts: AIPrompt[] = [
    {
      id: "consulta-contextual",
      title: "Consulta Contextual con Citas",
      description: "Obtén respuestas precisas con referencias a tus fuentes originales",
      category: "consulta",
      difficulty: "basico",
      estimatedTime: "2-3 min",
      tags: ["citas", "contexto", "fuentes"],
      prompt: `Actúa como mi asistente de Memoria Personal especializado en recuperación de información.

CONTEXTO: Necesito [OBJETIVO_ESPECÍFICO] para [SITUACIÓN/PROYECTO].

INSTRUCCIONES:
1. Busca en mis notas sobre: [TEMA_PRINCIPAL] y [SUBTEMAS_RELACIONADOS]
2. Prioriza información de los últimos [PERÍODO_TIEMPO]
3. Considera mi nivel de experiencia: [PRINCIPIANTE/INTERMEDIO/AVANZADO]

FORMATO DE RESPUESTA:
📋 **Respuesta Ejecutiva** (2-3 líneas)
🎯 **Acciones Inmediatas** (3-5 viñetas priorizadas)
📚 **Fuentes Citadas** (archivo → sección → fecha)
⚠️ **Limitaciones** (qué información falta o está desactualizada)

EJEMPLO DE USO:
"Necesito preparar una propuesta de marketing digital para un cliente de e-commerce. Busca en mis notas sobre estrategias de conversión, casos de éxito anteriores y métricas clave de los últimos 6 meses."

Si no encuentras suficiente información, sugiere específicamente qué documentar para futuras consultas.`,
    },
    {
      id: "aprendizaje-acumulativo",
      title: "Síntesis de Conocimiento Acumulativo",
      description: "Conecta y consolida aprendizajes dispersos en mapas conceptuales",
      category: "aprendizaje",
      difficulty: "intermedio",
      estimatedTime: "5-8 min",
      tags: ["síntesis", "mapas mentales", "conexiones"],
      prompt: `Actúa como mi curador de conocimiento personal para crear síntesis inteligentes.

OBJETIVO: Consolidar y conectar mi conocimiento sobre [TEMA_CENTRAL]

PROCESO DE ANÁLISIS:
1. **Inventario**: Lista todas mis notas relacionadas con [TEMA]
2. **Conexiones**: Identifica patrones, contradicciones y sinergias
3. **Evolución**: Rastrea cómo ha cambiado mi comprensión del tema
4. **Aplicaciones**: Encuentra casos donde apliqué este conocimiento

ENTREGABLES:
🗺️ **Mapa Conceptual** (estructura jerárquica con enlaces)
📖 **Resumen Ejecutivo** (300-500 palabras con evolución temporal)
🔗 **Red de Conexiones** (cómo se relaciona con otros temas en mi vault)
📝 **Vacíos Identificados** (qué investigar/documentar próximamente)
🎯 **Aplicaciones Prácticas** (3-5 formas de usar este conocimiento)

CRITERIOS DE CALIDAD:
- Cada afirmación debe tener al menos 2 fuentes de mi vault
- Incluir fechas para mostrar evolución del pensamiento
- Destacar insights únicos que he desarrollado
- Sugerir experimentos o validaciones pendientes

FORMATO FINAL: Documento vivo que pueda actualizar incrementalmente`,
    },
    {
      id: "memoria-contextual",
      title: "Recuperación de Memoria Contextual",
      description: "Reconstruye contextos completos de proyectos o decisiones pasadas",
      category: "memoria",
      difficulty: "avanzado",
      estimatedTime: "8-12 min",
      tags: ["contexto", "decisiones", "histórico"],
      prompt: `Actúa como mi arqueólogo de memoria digital para reconstruir contextos completos.

SITUACIÓN: Necesito recordar todo el contexto sobre [PROYECTO/DECISIÓN/SITUACIÓN] que ocurrió aproximadamente [PERÍODO_TIEMPO].

METODOLOGÍA DE RECUPERACIÓN:
1. **Cronología**: Ordena eventos y decisiones temporalmente
2. **Stakeholders**: Identifica personas involucradas y sus roles
3. **Decisiones Clave**: Extrae puntos de inflexión con sus justificaciones
4. **Recursos**: Lista documentos, herramientas y referencias utilizadas
5. **Resultados**: Compila outcomes y lecciones aprendidas

ESTRUCTURA DE RECONSTRUCCIÓN:
📅 **Línea de Tiempo**
- Hitos principales con fechas exactas
- Decisiones críticas y sus triggers
- Cambios de dirección y sus causas

👥 **Mapa de Stakeholders**
- Roles y responsabilidades
- Dinámicas de comunicación
- Puntos de fricción o alineación

🧠 **Razonamiento de Decisiones**
- Contexto que llevó a cada decisión
- Alternativas consideradas
- Criterios de evaluación utilizados

📊 **Métricas y Resultados**
- KPIs definidos vs. resultados reales
- Factores de éxito/fracaso
- Aplicabilidad a situaciones futuras

VALIDACIÓN: Señala dónde la información es incompleta y sugiere fuentes adicionales para completar el contexto.`,
    },
    {
      id: "analisis-tendencias",
      title: "Análisis de Tendencias Personales",
      description: "Identifica patrones en tu comportamiento y evolución de ideas",
      category: "analisis",
      difficulty: "avanzado",
      estimatedTime: "10-15 min",
      tags: ["patrones", "evolución", "insights"],
      prompt: `Actúa como mi analista de datos personales para identificar patrones y tendencias.

ALCANCE: Analiza mis notas de los últimos [PERÍODO] para identificar:

DIMENSIONES DE ANÁLISIS:
1. **Evolución Temática**: Cómo han cambiado mis intereses y enfoques
2. **Patrones de Productividad**: Cuándo y cómo genero mejor contenido
3. **Redes Conceptuales**: Qué ideas se conectan frecuentemente
4. **Ciclos de Aprendizaje**: Cómo abordo nuevos temas o habilidades

METODOLOGÍA:
📈 **Análisis Cuantitativo**
- Frecuencia de temas por período
- Longitud y profundidad de notas
- Patrones temporales de creación/actualización

🔍 **Análisis Cualitativo**
- Evolución del lenguaje y conceptos
- Cambios en perspectivas o enfoques
- Emergencia de nuevas conexiones

ENTREGABLES:
📊 **Dashboard Personal**
- Top 5 temas más desarrollados
- Tendencias de crecimiento/declive
- Correlaciones interesantes

🎯 **Insights Accionables**
- Fortalezas cognitivas identificadas
- Áreas de oportunidad
- Recomendaciones para optimizar mi sistema

⚡ **Predicciones**
- Temas que probablemente exploraré próximamente
- Conexiones potenciales no exploradas
- Oportunidades de síntesis o aplicación

CRITERIO: Basar todos los insights en evidencia cuantificable de mis notas.`,
    },
  ]

  /**
   * Casos de uso detallados con métricas reales y herramientas específicas
   */
  useCases: UseCase[] = [
    {
      id: "estudiante-medicina",
      title: "Estudiante de Medicina - 4to Año",
      userType: "Estudiante Universitario",
      problem:
        "María tenía 847 PDFs de papers médicos, notas de clase dispersas en 3 apps diferentes, y tardaba 45-60 minutos en encontrar información específica para casos clínicos. Sus resúmenes para exámenes eran inconsistentes y perdía conexiones importantes entre materias.",
      solution:
        "Implementó un sistema RAG local con Obsidian + Ollama + Chroma. Estructuró su vault por sistemas corporales con enlaces bidireccionales. Creó templates para casos clínicos y papers con metadatos estandarizados (especialidad, nivel de evidencia, fecha, palabras clave).",
      results: [
        "Tiempo de búsqueda: 45-60 min → 3-7 min (87% reducción)",
        "Precisión en exámenes: +23% en preguntas de conexión entre materias",
        "Preparación de casos clínicos: 2-3 horas → 45 min",
        "Retención a largo plazo: +34% en evaluaciones semestrales",
      ],
      timeToValue: "21 días",
      tools: ["Obsidian", "Ollama (Llama 2 7B)", "Chroma DB", "Zotero", "Anki (integrado)"],
    },
    {
      id: "freelancer-ux",
      title: "Freelancer UX/UI - 6 años experiencia",
      userType: "Profesional Independiente",
      problem:
        "Carlos manejaba 15-20 proyectos simultáneos con briefs, wireframes, feedback y entregables dispersos en Figma, Slack, email y Google Drive. Repetía investigación de usuarios y patrones de diseño. Las propuestas comerciales le tomaban 4-6 horas por falta de templates contextualizados.",
      solution:
        "Sistema híbrido: Notion para gestión de proyectos + ChatGPT Enterprise para consultas sobre su base de conocimiento curada. Creó una taxonomía de componentes, patrones y casos de éxito con metadatos (industria, complejidad, resultados, testimonios).",
      results: [
        "Tiempo de propuestas: 4-6 horas → 1.5-2 horas (67% reducción)",
        "Reutilización de componentes: +156% (menos diseño desde cero)",
        "Satisfacción del cliente: 4.2/5 → 4.7/5 (mejor contextualización)",
        "Ingresos mensuales: +31% por mayor velocidad de entrega",
      ],
      timeToValue: "14 días",
      tools: ["Notion", "ChatGPT Enterprise", "Figma (con plugins)", "Zapier", "Calendly"],
    },
    {
      id: "startup-tech",
      title: "Startup Tecnológica - 8 personas",
      userType: "Equipo Pequeño",
      problem:
        'El equipo de "HealthTech Solutions" tenía conocimiento crítico atrapado en Slack threads, decisiones técnicas sin documentar, y onboarding de nuevos miembros que tomaba 3-4 semanas. Las retrospectivas no generaban aprendizaje acumulativo.',
      solution:
        'Implementaron un "Team Brain" con GitBook + integración a Slack + workflows automatizados. Cada decisión técnica, post-mortem y learning se documenta con template estandarizado. Bot de Slack que responde preguntas frecuentes con citas a la documentación.',
      results: [
        "Onboarding time: 3-4 semanas → 1.5 semanas (62% reducción)",
        "Decisiones documentadas: 23% → 89% (mejor trazabilidad)",
        "Tiempo de resolución de dudas: 2-3 horas → 15-30 min",
        "Retención de conocimiento post-salida de empleados: +78%",
      ],
      timeToValue: "28 días",
      tools: ["GitBook", "Slack Bot", "GitHub Actions", "Miro", "Linear"],
    },
  ]

  /**
   * Métricas clave para medir el éxito del sistema de memoria personal
   */
  keyMetrics: Metric[] = [
    {
      name: "Tiempo Medio de Recuperación (TMR)",
      description: "Tiempo promedio para encontrar información específica con cita verificable",
      target: "< 3 minutos",
      frequency: "Semanal",
      importance: "alta",
    },
    {
      name: "Tasa de Decisiones Documentadas (TDD)",
      description: "Porcentaje de decisiones importantes respaldadas con fuentes del vault",
      target: "> 75%",
      frequency: "Semanal",
      importance: "alta",
    },
    {
      name: "Índice de Conexiones Activas (ICA)",
      description: "Número de enlaces bidireccionales creados entre notas nuevas y existentes",
      target: "> 3 por nota nueva",
      frequency: "Mensual",
      importance: "media",
    },
    {
      name: "Ratio de Actualización (RA)",
      description: "Proporción de notas actualizadas vs. notas nuevas creadas",
      target: "1:3 (1 actualización cada 3 notas nuevas)",
      frequency: "Mensual",
      importance: "media",
    },
    {
      name: "Score de Aplicación Práctica (SAP)",
      description: "Número de acciones tomadas basadas en insights del sistema",
      target: "> 5 acciones/semana",
      frequency: "Semanal",
      importance: "alta",
    },
  ]

  /**
   * Getter para fecha en formato ISO
   */
  get fechaISO(): string {
    return "2025-08-30"
  }

  /**
   * Getter seguro para window object
   */
  private get win(): (Window & typeof globalThis) | null {
    return this.isBrowser ? window : null
  }

  /**
   * Getter seguro para navigator object
   */
  private get nav(): Navigator | null {
    return this.isBrowser ? navigator : null
  }

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    if (!this.isBrowser) return
    this.scrollService.scrollToTop()
    this.updateReadingProgress()
  }

  /**
   * Configuración post-renderizado
   */
  ngAfterViewInit(): void {
    if (!this.isBrowser) return
    // Primer cálculo tras render completo
    setTimeout(() => {
      this.updateReadingProgress()
      this.updateFloatingCTA()
    }, 100)
  }

  /**
   * Manejo optimizado del scroll con requestAnimationFrame
   */
  @HostListener("window:scroll")
  onScroll(): void {
    if (!this.isBrowser || this.ticking) return

    this.ticking = true
    window.requestAnimationFrame(() => {
      this.updateReadingProgress()
      this.updateFloatingCTA()
      this.ticking = false
    })
  }

  /**
   * Actualiza la barra de progreso de lectura
   */
  private updateReadingProgress(): void {
    if (!this.isBrowser) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0
    const scrollHeight = (document.documentElement.scrollHeight || 0) - (window.innerHeight || 0)

    this.readingProgress = scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0
  }

  /**
   * Controla la visibilidad del CTA flotante
   */
  private updateFloatingCTA(): void {
    if (!this.isBrowser) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0
    this.showFloatingCTA = scrollTop > (window.innerHeight || 0) * 0.25
  }

  /**
   * Navegación hacia atrás
   */
  goBack(): void {
    this.location.back()
  }

  /**
   * Toggle del estado de marcador con feedback visual
   */
  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked
    const message = this.isBookmarked ? "⭐ Artículo guardado en favoritos" : "📝 Artículo removido de favoritos"
    this.showNotification(message)
  }

  /**
   * Toggle del modo de lectura con optimizaciones visuales
   */
  toggleReadingMode(): void {
    if (!this.isBrowser) return

    document.body.classList.toggle("reading-mode")
    const isActive = document.body.classList.contains("reading-mode")
    const message = `📖 Modo de lectura ${isActive ? "activado" : "desactivado"}`
    this.showNotification(message)
  }

  /**
   * Funcionalidad de compartir con fallbacks múltiples
   */
  shareArticle(): void {
    if (!this.isBrowser) return

    const shareData = {
      title: "Construye tu Memoria Personal con IA - Guía Completa",
      text: "RAG doméstico, privacidad primero y resultados medibles en 30 días. Una guía práctica para crear tu segundo cerebro con IA.",
      url: window.location.href,
    }

    // Intento 1: Web Share API (móviles modernos)
    const nav = navigator as any
    if (nav?.share && typeof nav.share === "function") {
      nav
        .share(shareData)
        .then(() => this.showNotification("🚀 Artículo compartido exitosamente"))
        .catch(() => this.fallbackToClipboard(shareData.url))
      return
    }

    // Intento 2: Clipboard API
    this.fallbackToClipboard(shareData.url)
  }

  /**
   * Filtrar prompts por categoría
   */
  filterPrompts(category: string): void {
    this.selectedPromptCategory = category
  }

  /**
   * Obtener prompts filtrados por categoría
   */
  getFilteredPrompts(): AIPrompt[] {
    return this.aiPrompts.filter((prompt) => prompt.category === this.selectedPromptCategory)
  }

  /**
   * Toggle de expansión para casos de uso
   */
  toggleUseCase(id: string): void {
    this.expandedUseCaseId = this.expandedUseCaseId === id ? null : id
  }

  /**
   * Copiar prompt al portapapeles
   */
  copyPrompt(prompt: AIPrompt): void {
    if (!this.isBrowser) return

    const fullPrompt = `# ${prompt.title}\n\n${prompt.description}\n\n${prompt.prompt}`

    navigator?.clipboard
      ?.writeText(fullPrompt)
      .then(() => this.showNotification(`📋 Prompt "${prompt.title}" copiado al portapapeles`))
      .catch(() => this.showNotification("❌ Error al copiar el prompt"))
  }

  /**
   * Fallback para copiar al portapapeles
   */
  private fallbackToClipboard(text: string): void {
    const clip = navigator?.clipboard
    if (clip?.writeText) {
      clip
        .writeText(text)
        .then(() => this.showNotification("📋 URL copiada al portapapeles"))
        .catch(() => this.showNotification("❌ No se pudo copiar la URL"))
    } else {
      this.showNotification("⚠️ Tu navegador no soporta copiar al portapapeles")
    }
  }

  /**
   * Sistema de notificaciones mejorado con iconos y animaciones
   */
  private showNotification(message: string): void {
    if (!this.isBrowser) return

    const notification = document.createElement("div")
    notification.className = `
      fixed top-24 right-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white 
      px-6 py-4 rounded-xl shadow-2xl z-[100] transform translate-x-full 
      transition-all duration-500 ease-out backdrop-blur-sm border border-white/20
      max-w-sm text-sm font-medium
    `
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        <span>${message}</span>
      </div>
    `

    document.body.appendChild(notification)

    // Animación de entrada
    setTimeout(() => notification.classList.remove("translate-x-full"), 100)

    // Animación de salida
    setTimeout(() => {
      notification.classList.add("translate-x-full", "opacity-0")
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification)
        }
      }, 500)
    }, 4000)
  }

  /**
   * Navegación suave a secciones específicas
   */
  scrollToSection(event: Event, id: string): void {
    if (!this.isBrowser) return

    event.preventDefault()
    const element = document.getElementById(id)

    if (element) {
      const offset = 80 // Compensar navbar fijo
      const elementPosition = element.offsetTop - offset

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }
}
