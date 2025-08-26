// articulos/usar-chatgpt.ts
import { Breadcrumbs } from './../../../shared/breadcrumbs/breadcrumbs';
import { ScrollService } from './../../../services/scroll.service';
import { Component, type OnInit, AfterViewInit, HostListener, Inject, inject } from "@angular/core";
import { CommonModule, isPlatformBrowser, DOCUMENT } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";
import { Navbar } from '../../../shared/navbar/navbar';
import { trigger, style, animate, transition, stagger, query, keyframes } from "@angular/animations";
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: "app-usar-chatgpt",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./usar-chatgpt.html",
  standalone: true,
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
export class UsarChatgpt implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Si quieres manipular el DOM, inyecta DOCUMENT en vez de usar document global
  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  emailSubscription = "";
  isBookmarked = false;
  readingProgress = 0;
  showFloatingCTA = false;

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "5 ideas para usar ChatGPT", active: true },
  ];

  // Prompts mejorados y expandidos
  prompt1 = `Soy [tu profesión] con [horarios/compromisos fijos]. Mis metas esta semana son: [lista 2-3 objetivos específicos].

Crea un plan semanal que incluya:
- Bloques de trabajo profundo de 60-90 min
- Buffers de 15 min entre tareas importantes  
- Top-3 prioridades diarias (A/B/C)
- Tiempo protegido para imprevistos
- 1 hora de desarrollo personal

Devuélvelo en tabla: Día | Bloques de tiempo | Objetivo principal | Top-3 prioridades | Notas`

  prompt2 = `Contexto: Soy [tu rol] escribiendo a [destinatario] para [objetivo específico].

Tono: [profesional/cercano/formal]
Longitud: [corto <100 palabras / medio 100-200 / largo >200]
Incluir: [CTA específico/documentos adjuntos/fecha límite]

Genera el email completo con:
- Asunto atractivo (40-60 caracteres)
- Saludo personalizado
- Cuerpo estructurado con valor claro
- CTA específico y medible
- Cierre profesional

Después dame 2 variantes: una más directa y otra más detallada.`

  prompt3 = `Inventario actual: [lista ingredientes disponibles]

Restricciones: [alergias/preferencias dietéticas]
Tiempo disponible: [15/30/45 minutos]
Nivel de cocina: [principiante/intermedio/avanzado]

Genera 3 recetas:
1. Rápida (15 min) - ingredientes mínimos
2. Equilibrada (30 min) - nutricionalmente completa  
3. Gourmet (45 min) - técnicas más elaboradas

Para cada receta incluye:
- Lista de ingredientes con cantidades
- Pasos numerados y claros
- Sustituciones posibles
- Valor nutricional aproximado
- Tips de presentación`

  prompt4 = `Perfil de la persona:
- Edad: [edad]
- Intereses: [hobbies/pasiones]
- Personalidad: [3-4 características]
- Relación contigo: [familiar/amigo/pareja/colega]

Ocasión: [cumpleaños/aniversario/graduación/etc.]
Presupuesto: $[cantidad]
Preferencias: [experiencias/objetos/DIY]

Genera 9 ideas organizadas en:

TANGIBLES (3 opciones):
- Opción 1: [producto] - Por qué: [razón] - Dónde: [tienda/web]
- Opción 2: [producto] - Por qué: [razón] - Dónde: [tienda/web]  
- Opción 3: [producto] - Por qué: [razón] - Dónde: [tienda/web]

EXPERIENCIAS (3 opciones):
- Opción 1: [experiencia] - Por qué: [razón] - Cómo: [reserva/organización]
- Opción 2: [experiencia] - Por qué: [razón] - Cómo: [reserva/organización]
- Opción 3: [experiencia] - Por qué: [razón] - Cómo: [reserva/organización]

DIY/PERSONALIZADOS (3 opciones):
- Opción 1: [proyecto] - Materiales: [lista] - Tiempo: [horas]
- Opción 2: [proyecto] - Materiales: [lista] - Tiempo: [horas]
- Opción 3: [proyecto] - Materiales: [lista] - Tiempo: [horas]

Incluye toque personal para cada opción.`

  prompt5 = `Tema a aprender: [concepto específico]
Mi nivel actual: [principiante/intermedio/avanzado]
Objetivo: [qué quiero lograr con este conocimiento]
Tiempo disponible: [minutos/horas]

Explícalo en 3 niveles:

NIVEL 1 (como si tuviera 12 años):
- Analogía simple y visual
- Ejemplo cotidiano
- 2-3 puntos clave máximo

NIVEL 2 (intermedio):
- Conceptos más técnicos
- Conexiones con otros temas
- Aplicaciones prácticas

NIVEL 3 (experto):
- Terminología precisa
- Matices y excepciones
- Implicaciones avanzadas

Después genera:
- 5 preguntas tipo test (diferentes dificultades)
- 3 analogías alternativas
- 5 flashcards (frente/dorso)
- 2 ejercicios prácticos para aplicar el conocimiento`

  prompt6 = `CONTEXTO: [Describe tu situación específica]

OBJETIVO: [Qué quieres lograr exactamente]

DATOS DISPONIBLES: [Información que tienes]

RESTRICCIONES: [Limitaciones de tiempo, presupuesto, recursos]

FORMATO DESEADO: [Tabla/lista/párrafos/esquema/etc.]

EJEMPLO DE LO QUE BUSCAS: [Muestra un ejemplo si es posible]

NIVEL DE DETALLE: [Básico/intermedio/avanzado]

PRÓXIMOS PASOS: [Qué harás con esta información]`

  // Prompts adicionales para las cards
  prompt7 = `Soy [profesión] con [horarios fijos]. Metas: [2-3 objetivos]. Crea plan semanal con bloques de 60-90min, buffers de 15min, top-3 diario y tiempo para imprevistos. Formato: tabla con día, bloques, objetivo, prioridades.`

  prompt8 = `Email de [tu rol] a [destinatario] para [objetivo]. Tono [profesional/cercano]. Incluye asunto 40-60 caracteres, cuerpo estructurado, CTA específico. Dame también versión corta y detallada.`

  prompt9 = `Inventario: [ingredientes]. Tiempo: [15/30/45min]. Genera 3 recetas con ingredientes, pasos, sustituciones, valor nutricional y tips de presentación.`

  prompt10 = `Tema: [concepto]. Nivel: [principiante/intermedio]. Explica en 3 niveles (12 años/intermedio/experto), genera 5 preguntas test, 3 analogías, 5 flashcards y 2 ejercicios prácticos.`

  // Helpers seguros
  private get win(): (Window & typeof globalThis) | null {
    return this.isBrowser ? (this.doc.defaultView ?? window) : null;
  }
  private get nav(): Navigator | null {
    return this.isBrowser ? (this.doc.defaultView?.navigator ?? navigator) : null;
  }

  ngOnInit() {
    // Si el ScrollService usa window/document, también debe estar guardado internamente.
    if (this.isBrowser) {
      this.scrollService.scrollToTop();
      this.updateReadingProgress();
    }
  }

  ngAfterViewInit() {
    // Cualquier lectura del layout/DOM mejor aquí y sólo en browser
    if (this.isBrowser) {
      this.updateReadingProgress();
      this.updateFloatingCTA();
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
    // Si luego persistes en localStorage, hazlo sólo en browser:
    // if (this.isBrowser && this.win) this.win.localStorage.setItem('bookmark', JSON.stringify(this.isBookmarked));
  }

  toggleReadingMode(): void {
    if (!this.isBrowser) return;
    this.doc.body.classList.toggle("reading-mode");
  }

  shareArticle(): void {
    if (!this.isBrowser || !this.win) return;

    const nav = this.nav;
    const url = this.win.location?.href ?? '';

    if (nav && 'share' in nav) {
      (nav as any).share({
        title: "5 ideas sencillas para usar ChatGPT todos los días",
        text: "Descubre cómo usar ChatGPT para organizarte, escribir mejor y aprender más rápido, sin programación",
        url,
      }).catch(console.error);
      return;
    }

    // Fallback copy
    if (nav && 'clipboard' in nav) {
      (nav as Navigator).clipboard.writeText(url)
        .then(() => this.showNotification("URL copiada al portapapeles"))
        .catch(() => this.copyFallback(url));
    } else {
      this.copyFallback(url);
    }
  }

  copyPrompt(prompt: string): void {
    if (!this.isBrowser) return;

    const nav = this.nav;
    if (nav && 'clipboard' in nav) {
      (nav.clipboard as any).writeText(prompt)
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
      clipboard.writeText(text)
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

  scrollToPrompts(): void {
    if (!this.isBrowser) return;
    const element = this.doc.getElementById("prompts");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
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
}
