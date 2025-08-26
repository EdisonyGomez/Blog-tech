import { Component, type OnInit, type OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common"
import { Location } from "@angular/common"
import { Router } from "@angular/router"
import { ScrollService } from "../../../services/scroll.service"
import { SeoService } from "../../../services/seo.service"
import { Navbar } from "../../../shared/navbar/navbar";
import { Breadcrumbs } from "../../../shared/breadcrumbs/breadcrumbs";

@Component({
  selector: "app-automatizar-correo",
  templateUrl: "./automatizar-correo.html",
  styleUrls: ['./automatizar-correo.css'],   // ✅
  standalone: true,
  imports: [Navbar, Breadcrumbs],
})
export class AutomatizarCorreo implements OnInit, OnDestroy {
  isBookmarked = false
  copyFeedback = ""

  private copyTimeout?: number

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

  platformId: Object

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) platformId: Object,   // ✅

  ) {
    this.platformId = platformId
  }

  ngOnInit(): void {
    this.scrollService.scrollToTop()
    this.initializeBookmark()
    this.setupSEO()
  }

  ngOnDestroy(): void {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout)
    }
  }

  private initializeBookmark(): void {
    if (isPlatformBrowser(this.platformId)) {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]")
      this.isBookmarked = bookmarks.includes("automatizar-correo-ia")
    }
  }

  private setupSEO(): void {
    const canonical = this.seo.absoluteUrl("/articulos/automatizar-correo-ia")
    const ogImage = this.seo.absoluteUrl("/assets/og/automatizar-correo-ia.png")

    this.seo.setSEO({
      title: "Automatiza tu correo electrónico con IA en 3 pasos",
      description:
        "Aprende a usar Zapier y ChatGPT para automatizar respuestas, clasificar emails y ahorrar horas semanales.",
      url: canonical,
      image: ogImage,
      type: "article",
      siteName: "Blog Tech",
      twitterSite: "@tucuenta",
      locale: "es_ES",
      publishedTime: "2025-07-06",
    })

    this.seo.setJsonLdArticle({
      headline: "Automatiza tu correo electrónico con IA en 3 pasos",
      description: "Clasifica, resume y responde emails con flujos simples de IA.",
      authorName: "Blog Tech",
      datePublished: "2025-07-06",
      image: ogImage,
      url: canonical,
    })

    this.seo.setJsonLd({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Automatiza tu correo con IA en 3 pasos",
      "totalTime": "PT90M",
      "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0-49" },
      "step": [
        { "@type": "HowToStep", "name": "Clasificación inteligente", "text": "Configura prompt de clasificación y reglas." },
        { "@type": "HowToStep", "name": "Respuestas automáticas", "text": "Crea respuestas con tono y políticas claras." },
        { "@type": "HowToStep", "name": "Integración con Zapier", "text": "Gmail → Formatter → OpenAI → Paths → Sheets/Slack." }
      ],
      "tool": [
        { "@type": "HowToTool", "name": "Gmail/Outlook" },
        { "@type": "HowToTool", "name": "Zapier" },
        { "@type": "HowToTool", "name": "ChatGPT/OpenAI" }
      ]
    })

    this.seo.setJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Puedo enviar respuestas sin revisión humana?",
          "acceptedAnswer": { "@type": "Answer", "text": "Recomendamos revisión humana al inicio y para consultas críticas." }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa con datos sensibles en los correos?",
          "acceptedAnswer": { "@type": "Answer", "text": "Anonimiza PII en logs y limita la retención. Documenta en tu Política de Privacidad." }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo toma el setup?",
          "acceptedAnswer": { "@type": "Answer", "text": "Entre 90 minutos y 1 día según complejidad y herramientas." }
        }
      ]
    })

  }

  goBack(): void {
    this.location.back()
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked

    if (isPlatformBrowser(this.platformId)) {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]")
      const articleId = "automatizar-correo-ia"

      if (this.isBookmarked) {
        if (!bookmarks.includes(articleId)) {
          bookmarks.push(articleId)
        }
      } else {
        const index = bookmarks.indexOf(articleId)
        if (index > -1) {
          bookmarks.splice(index, 1)
        }
      }

      localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarks))
    }
  }

  shareArticle(): void {
    const shareData = {
      title: "Automatiza tu correo electrónico con IA en 3 pasos",
      text: "Aprende a usar Zapier y ChatGPT para automatizar tu email y ahorrar horas semanales",
      url: window.location.href,
    }

    if (isPlatformBrowser(this.platformId) && navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.log("Error sharing:", err)
        this.fallbackShare()
      })
    } else {
      this.fallbackShare()
    }
  }

  private fallbackShare(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          this.showCopyFeedback("URL copiada al portapapeles")
        })
        .catch(() => {
          // Fallback para navegadores que no soportan clipboard API
          const textArea = document.createElement("textarea")
          textArea.value = window.location.href
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          this.showCopyFeedback("URL copiada al portapapeles")
        })
    }
  }

  copyPrompt(prompt: string): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard
        .writeText(prompt)
        .then(() => {
          this.showCopyFeedback("Prompt copiado correctamente")
        })
        .catch(() => {
          // Fallback para navegadores que no soportan clipboard API
          const textArea = document.createElement("textarea")
          textArea.value = prompt
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          this.showCopyFeedback("Prompt copiado correctamente")
        })
    }
  }

  private showCopyFeedback(message: string): void {
    this.copyFeedback = message

    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout)
    }

    this.copyTimeout = window.setTimeout(() => {
      this.copyFeedback = ""
    }, 2000)
  }



  // Métodos para accesibilidad de teclado
  onBookmarkKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.toggleBookmark()
    }
  }

  onShareKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.shareArticle()
    }
  }

  onCopyKeydown(event: KeyboardEvent, prompt: string): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.copyPrompt(prompt)
    }
  }
}
