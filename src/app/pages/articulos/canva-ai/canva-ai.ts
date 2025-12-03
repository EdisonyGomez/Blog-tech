import { ScrollService } from './../../../services/scroll.service';
import { Component, type OnInit, type OnDestroy, type ElementRef, ViewChild, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule,  Router } from "@angular/router"
import { FormsModule } from "@angular/forms"
import  { Location } from "@angular/common"
import { trigger, state, style, transition, animate } from "@angular/animations"
import { Navbar } from '../../../shared/navbar/navbar'; 
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs'; 

@Component({
  selector: "app-canva-ai",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./canva-ai.html",
  standalone: true,
  styleUrl: "./canva-ai.css",
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("slideInOut", [
      state("in", style({ transform: "translateX(0)", opacity: 1 })),
      transition("void => *", [style({ transform: "translateX(100%)", opacity: 0 }), animate("300ms ease-in")]),
      transition("* => void", [animate("300ms ease-out", style({ transform: "translateX(100%)", opacity: 0 }))]),
    ]),
    trigger("hoverScale", [
      state("default", style({ transform: "scale(1)" })),
      state("hovered", style({ transform: "scale(1.05)" })),
      transition("default <=> hovered", animate("200ms ease-in-out")),
    ]),
    trigger("slideInLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-50px)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("slideInRight", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(50px)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
  ],
})
export class CanvaAi implements OnInit, OnDestroy {
  @ViewChild("newsletterSection", { static: false }) newsletterSection!: ElementRef

  emailSubscription = ""
  isSubscribing = false
  isBookmarked = false
  readingProgress = 0
  showFloatingCta = false
  activeTab = "business"
  copiedPrompts: string[] = []

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Canva AI: Diseña presentaciones profesionales", active: true },
  ]

  // Prompts básicos
  prompt1 =
    "Crea una presentación de 10 diapositivas sobre 'Estrategias de Marketing Digital para Pequeñas Empresas'. Incluye una portada atractiva, agenda, 6 diapositivas de contenido principal, una de conclusiones y una de contacto."
  prompt2 =
    "Genera contenido para una diapositiva sobre 'Beneficios del trabajo remoto' con 4 puntos principales, cada uno con un ícono representativo y una descripción de máximo 15 palabras."
  prompt3 =
    "Sugiere una paleta de colores profesional para una presentación sobre tecnología financiera (fintech) que transmita confianza y modernidad."
  prompt4 =
    "Crea texto para una diapositiva de portada de una presentación sobre 'Sostenibilidad Empresarial' dirigida a ejecutivos de nivel C."

  // Prompts avanzados
  advancedPrompt1 =
    "Crea un pitch deck de 12 diapositivas para startup de energías renovables: portada con logo, problema del mercado con estadísticas, solución única con diferenciadores, modelo de negocio canvas, análisis de mercado TAM/SAM/SOM, estrategia go-to-market, proyecciones financieras 3 años, equipo fundador con experiencia, roadmap producto 18 meses, competencia y ventajas, uso de fondos detallado, contacto y next steps. Estilo: moderno, minimalista, colores verde y azul, tipografía sans-serif."

  advancedPrompt2 =
    "Diseña una presentación educativa de 15 diapositivas sobre 'Inteligencia Artificial en la Educación' para profesores universitarios: introducción con objetivos de aprendizaje, contexto histórico IA, conceptos fundamentales con ejemplos visuales, aplicaciones actuales en educación con casos reales, herramientas prácticas para docentes, beneficios y desafíos éticos, metodologías de implementación, casos de estudio exitosos, ejercicios interactivos, evaluación del aprendizaje, recursos adicionales, plan de acción personal, Q&A, conclusiones y certificación. Incluye iconos educativos, gráficos explicativos y paleta azul académica."

  advancedPrompt3 =
    "Genera un dashboard ejecutivo de 8 diapositivas para reporte trimestral Q4: resumen ejecutivo con KPIs principales, análisis financiero con gráficos de ingresos/gastos/beneficios, métricas operacionales con comparativa vs objetivos, análisis de mercado y competencia, performance por departamentos con semáforos, proyecciones Q1 siguiente año, riesgos identificados y planes de mitigación, recomendaciones estratégicas con timeline. Diseño: corporativo, colores azul marino y dorado, gráficos profesionales, tipografía Montserrat."

  private scrollListener?: () => void

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTop()
    this.setupScrollListener()
    this.animateStats()
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener)
    }
  }

    articleMeta = {
    categoria: "Productividad",
    tiempoLectura: 12,
    fechaPublicacion: "22 de agosto de 2025",
    fechaActualizacion: "10 de agosto de 2025",
    autorNombre: "Edinson Gomez",
    autorFoto: "/assets/images/me/me.png",
    autorPerfil: "/about-me",
  };

   get fechaISO(): string {
    return "2025-08-22";
  }
  // @HostListener("window:scroll", ["$event"])
  onScroll() {
    this.updateReadingProgress()
    this.updateFloatingCta()
  }

  private setupScrollListener() {
    this.scrollListener = () => {
      this.updateReadingProgress()
      this.updateFloatingCta()
    }
    window.addEventListener("scroll", this.scrollListener)
  }

  private updateReadingProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    this.readingProgress = (scrollTop / scrollHeight) * 100
  }

  private updateFloatingCta() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const showThreshold = 1000 // Show after scrolling 1000px
    this.showFloatingCta = scrollTop > showThreshold
  }

  private animateStats() {
    setTimeout(() => {
      this.animateNumber('[data-target="15"]', 15, 1000)
      this.animateNumber('[data-target="90"]', 90, 1500)
      this.animateNumber('[data-target="1000"]', 1000, 2000)
    }, 500)
  }

  private animateNumber(selector: string, target: number, duration: number) {
    const element = document.querySelector(selector)
    if (!element) return

    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        element.textContent = target.toString()
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(start).toString()
      }
    }, 16)
  }

  goBack(): void {
    this.location.back()
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked
    // Here you would typically save to localStorage or send to backend
    console.log("Bookmark toggled:", this.isBookmarked)
  }

  shareArticle(): void {
    if (navigator.share) {
      navigator.share({
        title: "Canva AI: Diseña presentaciones profesionales en minutos",
        text: "Aprende a crear presentaciones impactantes con Canva AI sin experiencia en diseño",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      this.showNotification("URL copiada al portapapeles")
    }
  }

  copyPrompt(prompt: string): void {
    navigator.clipboard.writeText(prompt).then(() => {
      const promptKey = this.getPromptKey(prompt)
      this.copiedPrompts.push(promptKey)

      setTimeout(() => {
        const index = this.copiedPrompts.indexOf(promptKey)
        if (index > -1) {
          this.copiedPrompts.splice(index, 1)
        }
      }, 2000)

      this.showNotification("Prompt copiado al portapapeles")
    })
  }

  private getPromptKey(prompt: string): string {
    if (prompt === this.prompt1) return "prompt1"
    if (prompt === this.prompt2) return "prompt2"
    if (prompt === this.prompt3) return "prompt3"
    if (prompt === this.prompt4) return "prompt4"
    if (prompt === this.advancedPrompt1) return "advancedPrompt1"
    if (prompt === this.advancedPrompt2) return "advancedPrompt2"
    if (prompt === this.advancedPrompt3) return "advancedPrompt3"
    return "unknown"
  }

  subscribeNewsletter(): void {
    if (this.emailSubscription && !this.isSubscribing) {
      this.isSubscribing = true

      // Simulate API call
      setTimeout(() => {
        console.log("Suscribiendo:", this.emailSubscription)
        this.emailSubscription = ""
        this.isSubscribing = false
        this.showNotification("¡Suscripción exitosa! Revisa tu email.")
      }, 2000)
    }
  }

  scrollToNewsletter(): void {
    if (this.newsletterSection) {
      this.newsletterSection.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  hideFloatingCta(): void {
    this.showFloatingCta = false
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  selectColorPalette(palette: string): void {
    const colors = {
      tech: "#3182CE, #4A5568",
      finance: "#1A365D, #D69E2E",
      health: "#38A169, #68D391",
      creative: "#E53E3E, #9F7AEA",
    }

    const colorCode = colors[palette as keyof typeof colors]
    if (colorCode) {
      navigator.clipboard.writeText(colorCode)
      this.showNotification(`Códigos de color copiados: ${colorCode}`)
    }
  }

  private showNotification(message: string): void {
    // Create a simple notification
    const notification = document.createElement("div")
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #48bb78;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease-out;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-in"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
}
