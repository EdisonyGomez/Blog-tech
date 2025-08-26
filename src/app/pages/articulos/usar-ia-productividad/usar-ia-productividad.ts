import { ScrollService } from './../../../services/scroll.service';
import { Breadcrumbs } from "../../../shared/breadcrumbs/breadcrumbs";
import { Component, type OnInit, type AfterViewInit, HostListener, inject, Inject, DOCUMENT } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";
import { Navbar } from "../../../shared/navbar/navbar";
import { trigger, style, animate, transition, stagger, query, keyframes } from "@angular/animations";
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: "app-usar-ia-productividad",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./usar-ia-productividad.html",
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("slideInLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-30px)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("slideInScale", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
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
    trigger("bounceIn", [
      transition(":enter", [
        animate(
          "800ms ease-out",
          keyframes([
            style({ opacity: 0, transform: "scale(0.3)", offset: 0 }),
            style({ opacity: 1, transform: "scale(1.05)", offset: 0.5 }),
            style({ opacity: 1, transform: "scale(0.95)", offset: 0.7 }),
            style({ opacity: 1, transform: "scale(1)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class UsarIaProductividad implements OnInit, AfterViewInit {
private readonly platformId = inject(PLATFORM_ID);
readonly isBrowser = isPlatformBrowser(this.platformId);


  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  emailSubscription = "";
  isBookmarked = false;
  readingProgress = 0;
  showFloatingCTA = false;

   breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Productividad con IA", active: true },
  ]

  prompts = {
    chatgptTria: `Eres mi asistente de productividad TRIA. Mi perfil:
- Profesión: [TU PROFESIÓN]
- Horario preferido: [TU HORARIO]
- Picos de energía típicos: [MAÑANA/TARDE/NOCHE]
- Tipo de tareas principales: [CREATIVAS/ANALÍTICAS/ADMINISTRATIVAS]

Cuando te comparta mi lista de tareas y nivel de energía actual (1-10), sugiere un plan de trabajo de 6 horas usando el método TRIA (Tiempo, Ritmo, Intención, Adaptación).

Formato de respuesta:
1. Evaluación de carga de trabajo
2. Distribución de tareas por bloques de energía
3. Pausas recomendadas
4. Métricas a trackear
5. Plan de contingencia si la energía cambia

¿Listo para comenzar?`,

    energyEvaluation: `Evalúa mi energía actual del 1 al 10 considerando:
- Energía física (¿cómo me siento corporalmente?)
- Energía mental (¿qué tan clara está mi mente?)
- Energía emocional (¿cuál es mi estado de ánimo?)

Luego sugiere el tipo de tareas más apropiadas para este nivel de energía usando la escala TRIA:
- 8-10: Tareas creativas complejas, decisiones importantes
- 6-7: Tareas analíticas, reuniones importantes
- 4-5: Tareas administrativas, emails, organización
- 1-3: Tareas mecánicas, descanso activo, planificación`,

    weeklyReview: `Revisa mi semana usando métricas TRIA:

Datos de la semana:
- Energía promedio inicial: [X/10]
- Energía promedio final: [X/10]
- Horas en estado de flow: [X horas]
- Intenciones cumplidas: [X%]
- Adaptaciones necesarias: [número]

Analiza:
1. ¿Mi IES (Índice de Energía Sostenible) fue ≥ 0.9?
2. ¿Qué patrones de energía identificas?
3. ¿Qué ajustes recomiendas para la próxima semana?
4. ¿Cómo puedo optimizar mi calendario basándome en estos datos?`,

    taskPrioritization: `Ayúdame a priorizar estas tareas usando el método TRIA:

Tareas pendientes:
[LISTA TUS TAREAS AQUÍ]

Mi energía actual: [X/10]
Tiempo disponible: [X horas]
Contexto del día: [REUNIONES/LIBRE/INTERRUPCIONES ESPERADAS]

Organiza las tareas en:
1. HACER AHORA (alta energía, alta importancia)
2. PROGRAMAR (baja energía actual, alta importancia)
3. DELEGAR/AUTOMATIZAR (baja importancia, consume energía)
4. ELIMINAR (ni importante ni energizante)

Incluye estimación de tiempo y nivel de energía requerido para cada tarea.`,
  }

  private get win(): (Window & typeof globalThis) | null {
    return this.isBrowser ? (this.doc.defaultView ?? window) : null;
  }

  private get nav(): Navigator | null {
    return this.isBrowser ? (this.doc.defaultView?.navigator ?? navigator) : null;
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.scrollService.scrollToTop();
      this.updateReadingProgress();
    }
  }

ngAfterViewInit() {
  if (this.isBrowser) {
    setTimeout(() => {
      this.updateReadingProgress()
      this.updateFloatingCTA()
    })
  }
}


  @HostListener("window:scroll")
  onScroll() {
    if (!this.isBrowser) return;
    this.updateReadingProgress();
    this.updateFloatingCTA();
  }

  private updateReadingProgress() {
    if (!this.isBrowser || !this.win) return;
    const w = this.win;
    const scrollTop = w.pageYOffset || this.doc.documentElement.scrollTop || 0;
    const scrollHeight = (this.doc.documentElement.scrollHeight || 0) - (w.innerHeight || 0);
    this.readingProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  }

  private updateFloatingCTA() {
    if (!this.isBrowser || !this.win) return;
    const w = this.win;
    const scrollTop = w.pageYOffset || this.doc.documentElement.scrollTop || 0;
    this.showFloatingCTA = scrollTop > (w.innerHeight || 0) * 0.3;
  }

  goBack(): void {
    this.location.back();
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
    this.showNotification(this.isBookmarked ? "Artículo guardado en favoritos" : "Artículo removido de favoritos");
  }

  toggleReadingMode(): void {
    if (!this.isBrowser) return;
    this.doc.body.classList.toggle("reading-mode");
    this.showNotification(
      "Modo de lectura " + (this.doc.body.classList.contains("reading-mode") ? "activado" : "desactivado"),
    );
  }

  shareArticle(): void {
    if (!this.isBrowser || !this.win) return;

    const nav = this.nav;
    const url = this.win.location?.href ?? "";

    if (nav && "share" in nav) {
      (nav as any)
        .share({
          title: "El arte de trabajar sin estrés con IA",
          text: "Rediseña tu relación con el trabajo usando IA cognitiva y predictiva.",
          url,
        })
        .catch(console.error);
      return;
    }

    if (nav && "clipboard" in nav) {
      (nav as Navigator).clipboard
        .writeText(url)
        .then(() => this.showNotification("URL copiada al portapapeles"))
        .catch(() => this.copyFallback(url));
    } else {
      this.copyFallback(url);
    }
  }

  copyPrompt(promptKey: keyof typeof this.prompts): void {
    if (!this.isBrowser) return;

    const prompt = this.prompts[promptKey];
    const nav = this.nav;

    if (nav && "clipboard" in nav) {
      (nav as Navigator).clipboard
        .writeText(prompt)
        .then(() => this.showNotification("Prompt copiado al portapapeles"))
        .catch(() => this.copyFallback(prompt));
    } else {
      this.copyFallback(prompt);
    }
  }

  private copyFallback(text: string) {
    if (!this.isBrowser) return;

    const clipboard = (navigator as Navigator).clipboard;

    if (clipboard?.writeText) {
      clipboard
        .writeText(text)
        .then(() => this.showNotification("Copiado al portapapeles"))
        .catch(() => this.showNotification("No se pudo copiar el texto"));
    } else {
      this.showNotification("Tu navegador no soporta copiar al portapapeles");
    }
  }

  subscribeNewsletter(): void {
    if (!this.isBrowser) return;
    if (this.emailSubscription && this.isValidEmail(this.emailSubscription)) {
      console.log("Suscribiendo:", this.emailSubscription);
      this.showNotification("¡Gracias por suscribirte! Revisa tu email.");
      this.emailSubscription = "";
    } else {
      this.showNotification("Por favor, ingresa un email válido");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showNotification(message: string): void {
    if (!this.isBrowser) return;
    const notification = this.doc.createElement("div");
    notification.className =
      "fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-100 transform translate-x-full transition-transform duration-300";
    notification.textContent = message;
    this.doc.body.appendChild(notification);

    setTimeout(() => notification.classList.remove("translate-x-full"), 100);
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        if (notification.parentNode) this.doc.body.removeChild(notification);
      }, 300);
    }, 3000);
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

  scrollToPrompts(): void {
    if (!this.isBrowser) return;
    const el = this.doc.getElementById("prompts");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  get fechaISO(): string {
    return "2025-08-22";
  }

scrollToSection(event: Event, id: string) {
  if (!this.isBrowser) return
  event.preventDefault(); // 👈 Esto es lo que detiene el salto al inicio
  const el = this.doc.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

}
