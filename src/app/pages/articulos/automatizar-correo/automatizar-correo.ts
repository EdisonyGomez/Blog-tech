import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import  { Location } from "@angular/common"
import { Navbar } from "../../../shared/navbar/navbar"
import { Breadcrumbs } from "../../../shared/breadcrumbs/breadcrumbs"
import { Router } from "@angular/router" 
import { ScrollService } from "../../../services/scroll.service"
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: "app-automatizar-correo",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./automatizar-correo.html",
  styleUrl: "./automatizar-correo.css",
})
export class AutomatizarCorreo implements OnInit {
  emailSubscription = ""

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Automatiza tu correo electrónico con IA", active: true },
  ]

  // Prompts para copiar
  prompt1 =
    "Analiza este email y clasifícalo en una de estas categorías: URGENTE (requiere respuesta inmediata), IMPORTANTE (requiere respuesta en 24h), INFORMATIVO (solo para conocimiento), SPAM (eliminar). Email: [pegar contenido del email aquí]"
  prompt2 =
    "Escribe una respuesta profesional y amable para este email de consulta sobre precios. Mantén un tono cordial pero directo, solicita más detalles sobre sus necesidades específicas y ofrece agendar una llamada. Email original: [pegar email aquí]"
  prompt3 =
    "Crea un resumen ejecutivo de máximo 3 líneas de estos emails recibidos hoy. Enfócate en: acciones requeridas, deadlines importantes y oportunidades de negocio. Emails: [pegar lista de emails]"
  prompt4 =
    "Genera 5 respuestas automáticas diferentes para emails de consultas frecuentes sobre [tu producto/servicio]. Cada respuesta debe ser única, profesional y incluir un call-to-action específico."

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private title: Title, private meta: Meta
  ) {
     this.title.setTitle('Automatiza tu correo electrónico con IA en 3 pasos');
    this.meta.updateTag({ name: 'description', content: 'Aprende a usar la inteligencia artificial para contestar emails, programar envíos y ganar tiempo. ¡Y no necesitas saber nada de programación!' });

  }

  ngOnInit() {
    this.scrollService.scrollToTop()
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
        title: "Automatiza tu correo electrónico con IA en 3 pasos",
        text: "Aprende a usar Zapier y ChatGPT para automatizar tu email y ahorrar horas semanales",
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
}
