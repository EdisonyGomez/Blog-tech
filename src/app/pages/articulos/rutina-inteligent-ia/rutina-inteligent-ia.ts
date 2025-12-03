import { Breadcrumbs } from './../../../shared/breadcrumbs/breadcrumbs';
import { Navbar } from './../../../shared/navbar/navbar';
import { ScrollService } from './../../../services/scroll.service';
import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule,  Router } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Location } from "@angular/common"
import { trigger, style, animate, transition, stagger, query, keyframes } from "@angular/animations"

import { SeoService } from './../../../services/seo.service';


interface SimulatorResult {
  morning: string
  afternoon: string
  evening: string
  aiTips: string[]
}

@Component({
  selector: "app-rutina-inteligent-ia",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./rutina-inteligent-ia.html",
  standalone: true,
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("staggerIn", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(20px)" }),
            stagger(100, [animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),

    trigger("slideInFromLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-50px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("slideInFromRight", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(50px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
  ],
})
export class RutinaInteligentIa implements OnInit {
  emailSubscription = ""

  // Simulador variables
  userTasks = ""
  selectedMood = "normal"
  simulatorResult: SimulatorResult | null = null
  isGenerating = false

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Rutina inteligente con IA", active: true },
  ]

  moods = [
    { value: "estresado", label: "😰 Estresado", color: "bg-red-100 text-red-700" },
    { value: "normal", label: "😊 Normal", color: "bg-blue-100 text-blue-700" },
    { value: "relajado", label: "😌 Relajado", color: "bg-green-100 text-green-700" },
  ]

  tools = [
    {
      name: "Notion AI",
      description: "Organiza tareas y crea planes automáticamente",
      icon: "📝",
      url: "https://notion.so",
      category: "Organización",
    },
    {
      name: "ChatGPT",
      description: "Tu asistente personal para planificación diaria",
      icon: "🤖",
      url: "https://chat.openai.com",
      category: "Planificación",
    },
    {
      name: "Zapier",
      description: "Automatiza tareas repetitivas entre aplicaciones",
      icon: "⚡",
      url: "https://zapier.com",
      category: "Automatización",
    },
    {
      name: "Google Calendar AI",
      description: "Agenda inteligente con sugerencias automáticas",
      icon: "📅",
      url: "https://calendar.google.com",
      category: "Calendario",
    },
  ]

  // Prompts para copiar
  prompts = {
    planificador:
      "Hazme un resumen de tareas para hoy basado en este listado, organizadas por prioridad y tiempo estimado: [tu lista de tareas]",
    coach:
      "Actúa como mi entrenador de productividad. Quiero enfocarme 2h por la mañana, hacer ejercicio y leer 20min. ¿Cómo organizo mi día?",
    automatizacion:
      "Al recibir un correo con 'factura', crea un recordatorio en mi calendario para revisarlo en 2 días",
  }

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTop();

    const canonical = this.seo.absoluteUrl('/articulos/rutina-inteligent-ia');
    const ogImage = this.seo.absoluteUrl('/assets/og/rutina-ia.png'); // crea esta imagen o quita la línea

    this.seo.setSEO({
      title: 'Transforma tu rutina diaria con IA | Guía interactiva para principiantes',
      description: 'Aprende a organizar tu día, automatizar tareas y crear una rutina inteligente con IA. Guía paso a paso para principiantes.',
      url: canonical,
      image: ogImage,
      type: 'article',
      publishedTime: '2025-07-25',
      siteName: 'Blog Tech',
      twitterSite: '@tucuenta',
      locale: 'es_ES'
    });

    this.seo.setJsonLdArticle({
      headline: 'Transforma tu rutina diaria con inteligencia artificial',
      description: 'Guía interactiva para principiantes: organiza, automatiza y optimiza tu día a día con IA.',
      authorName: 'Blog Tech',
      datePublished: '2025-07-25',
      image: ogImage,
      url: canonical
    });
  }

    articleMeta = {
    categoria: "Productividad",
    tiempoLectura: 12,
    fechaPublicacion: "25 de julio de 2025",
    fechaActualizacion: "30 de agosto de 2025",
    autorNombre: "Edinson Gomez",
    autorFoto: "/assets/images/me/me.png",
    autorPerfil: "/about-me",
  };

   get fechaISO(): string {
    return "2025-08-10";
  }

  goBack(): void {
    this.location.back()
  }

  toggleBookmark(): void {
    console.log("Bookmark toggled")
  }

  shareArticle(): void {
    if (navigator.share) {
      navigator.share({
        title: "Transforma tu rutina diaria con inteligencia artificial",
        text: "Guía interactiva para usar IA en tu día a día sin conocimientos técnicos",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("URL copiada al portapapeles")
    }
  }

  copyPrompt(prompt: string): void {
    navigator.clipboard.writeText(prompt).then(() => {
      console.log("Prompt copiado")
    })
  }

  subscribeNewsletter(): void {
    if (this.emailSubscription) {
      console.log("Suscribiendo:", this.emailSubscription)
      this.emailSubscription = ""
    }
  }

  // Simulador de rutina inteligente
  generateSmartRoutine(): void {
    if (!this.userTasks.trim()) {
      alert("Por favor, escribe al menos una tarea para generar tu rutina inteligente.")
      return
    }

    this.isGenerating = true

    // Simular procesamiento de IA
    setTimeout(() => {
      this.simulatorResult = this.generateAIResponse(this.userTasks, this.selectedMood)
      this.isGenerating = false
    }, 2000)
  }

  private generateAIResponse(tasks: string, mood: string): SimulatorResult {
    const taskList = tasks
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const responses = {
      estresado: {
        morning:
          "🌅 Comienza con 5 minutos de respiración profunda. Prioriza solo 1-2 tareas importantes para evitar sobrecarga.",
        afternoon:
          "🍃 Toma descansos de 10 minutos cada hora. Usa técnica Pomodoro para mantener el foco sin agotarte.",
        evening: "🛁 Dedica 30 minutos a relajarte. Prepara el día siguiente para reducir la ansiedad matutina.",
        aiTips: [
          "Usa ChatGPT para dividir tareas grandes en pasos pequeños",
          "Configura recordatorios suaves en lugar de alarmas estresantes",
          "Automatiza decisiones rutinarias (qué desayunar, qué ropa usar)",
        ],
      },
      normal: {
        morning: "☀️ Revisa tus prioridades del día. Dedica las primeras 2 horas a tu tarea más importante.",
        afternoon: "⚡ Mantén el momentum. Agrupa tareas similares para mayor eficiencia.",
        evening: "📚 Reflexiona sobre logros del día. Planifica mañana en 10 minutos.",
        aiTips: [
          "Usa Notion AI para organizar automáticamente tus notas",
          "Configura Zapier para automatizar tareas repetitivas",
          "Pide a ChatGPT que optimice tu horario según tus objetivos",
        ],
      },
      relajado: {
        morning: "🧘 Aprovecha tu calma para planificar estratégicamente. Visualiza tu día ideal.",
        afternoon: "🎯 Es buen momento para tareas creativas o que requieren concentración profunda.",
        evening: "🌙 Perfecto para aprender algo nuevo o trabajar en proyectos personales.",
        aiTips: [
          "Experimenta con nuevas herramientas de IA sin presión",
          "Usa este estado para configurar automatizaciones complejas",
          "Aprovecha para entrenar a ChatGPT con prompts personalizados",
        ],
      },
    }

    const moodResponse = responses[mood as keyof typeof responses] || responses.normal

    return {
      morning: moodResponse.morning,
      afternoon: moodResponse.afternoon,
      evening: moodResponse.evening,
      aiTips: moodResponse.aiTips,
    }
  }

  resetSimulator(): void {
    this.userTasks = ""
    this.selectedMood = "normal"
    this.simulatorResult = null
  }

  scrollToSimulator(): void {
    document.getElementById("simulator")?.scrollIntoView({
      behavior: "smooth",
    })
  }
}
