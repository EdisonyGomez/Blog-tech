import { Breadcrumbs } from './../../../shared/breadcrumbs/breadcrumbs';
import { Navbar } from './../../../shared/navbar/navbar';
import { ScrollService } from './../../../services/scroll.service';
import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule,  Router } from "@angular/router"
import { FormsModule } from "@angular/forms"
import  { Location } from "@angular/common"
import { trigger, style, animate, transition, stagger, query } from "@angular/animations"

import { SeoService } from './../../../services/seo.service';

@Component({
  selector: "app-planear-viaje-ia",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./planear-viaje-ia.html",
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
  ],
})
export class PlanearViajeIa implements OnInit {
  emailSubscription = ""

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Planear viaje con IA", active: true },
  ]

  // Prompts para copiar
  prompts = {
    destino:
      "¿Qué destinos recomendás para septiembre si me interesa la naturaleza, la fotografía y evitar multitudes?",
    presupuesto: "Y si solo tengo $1,000 USD y quiero viajar desde Bogotá, ¿qué opciones se adaptan mejor?",
    itinerario: "Viaje de 4 días en Ciudad de México, me gusta la historia, la comida y la arquitectura",
    vuelos: "Quiero viajar de Lima a Cusco en octubre. Presupuesto: $150. ¿Qué fechas me convienen?",
    hospedaje: "Recomiéndame 3 hoteles económicos cerca del centro de Medellín con buena puntuación en Booking",
    presupuestoDetallado:
      "Calcula un presupuesto para 5 días en Cartagena con hospedaje medio, comida local, transporte público y entradas a museos",
  }

  tools = [
    {
      name: "ChatGPT",
      description: "Para generar ideas de destinos y planificación general",
      url: "https://chat.openai.com",
      icon: "🤖",
    },
    {
      name: " Roam Around",
      description: "Genera itinerarios día por día con mapas",
      url: "https://roamaround.app/plan?tweaks=",
      icon: "🗺️",
    },
    {
      name: "Kayak AI",
      description: "Búsqueda conversacional de vuelos",
      url: "https://kayak.ai/",
      icon: "✈️",
    },
    {
      name: "GuideGeek",
      description: "Asistente de viajes por WhatsApp",
      url: "https://guidegeek.com",
      icon: "💬",
    },
  ]

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private seo: SeoService
  ) {}

 ngOnInit() {
    this.scrollService.scrollToTop();

    const canonical = this.seo.absoluteUrl('/articulos/planear-viaje-con-ia');
    const ogImage = this.seo.absoluteUrl('/assets/og/planear-viaje.png');

    this.seo.setSEO({
      title: 'Cómo usar IA para planear un viaje completo (sin ser experto)',
      description: 'Destinos, itinerarios, vuelos, hospedaje y presupuesto con ChatGPT, Roam Around y Kayak AI.',
      url: canonical,
      image: ogImage,
      type: 'article',
      publishedTime: '2025-07-20',
      siteName: 'Blog Tech',
      twitterSite: '@tucuenta',
      locale: 'es_ES'
    });

    this.seo.setJsonLdArticle({
      headline: 'Cómo usar inteligencia artificial para planear un viaje completo',
      description: 'Guía paso a paso para elegir destino, armar itinerario y calcular presupuesto con IA.',
      authorName: 'Blog Tech',
      datePublished: '2025-07-20',
      image: ogImage,
      url: canonical
    });
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
        title: "Cómo usar inteligencia artificial para planear un viaje completo",
        text: "Aprende a usar herramientas de IA para organizar tus vacaciones sin estrés",
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
