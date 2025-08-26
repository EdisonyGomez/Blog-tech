import { Component,  OnInit,  OnDestroy,  ElementRef, ViewChild,  AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { trigger, state, style, transition, animate, query, stagger } from "@angular/animations"
import  { ScrollService } from "../../services/scroll.service"
import { Navbar } from "../../shared/navbar/navbar" 
import { Breadcrumbs } from "../../shared/breadcrumbs/breadcrumbs" 

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: "app-about",
  imports: [ RouterModule, Navbar, Breadcrumbs,  CommonModule,
    FormsModule],
  templateUrl: "./about.html",
  styleUrl: "./about.css",
  standalone: true,
  animations: [
    trigger("fadeInUp", [
      state("in", style({ opacity: 1, transform: "translateY(0)" })),
      transition("void => *", [style({ opacity: 0, transform: "translateY(30px)" }), animate("600ms ease-out")]),
    ]),
    trigger("staggerCards", [
      transition("* => *", [
        query(
          ".stagger-item",
          [
            style({ opacity: 0, transform: "translateY(20px)" }),
            stagger(100, [animate("500ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger("scaleIn", [
      transition("void => *", [
        style({ transform: "scale(0.8)", opacity: 0 }),
        animate("400ms ease-out", style({ transform: "scale(1)", opacity: 1 })),
      ]),
    ]),
    trigger("slideInLeft", [
      transition("void => *", [
        style({ transform: "translateX(-50px)", opacity: 0 }),
        animate("600ms ease-out", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
    ]),
  ],
})
export class About implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("heroSection", { static: false }) heroSection!: ElementRef
  @ViewChild("statsSection", { static: false }) statsSection!: ElementRef

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Sobre el sitio", active: true },
  ]

  // Estadísticas animadas
  stats = [
    { label: "Contenido original", value: "100%", animated: false, finalValue: 100 },
    { label: "Guías publicadas", value: "25+", animated: false, finalValue: 25 },
    { label: "Horas ahorradas", value: "500+", animated: false, finalValue: 500 },
    { label: "Usuarios activos", value: "2.5K+", animated: false, finalValue: 2500 },
  ]

  // Newsletter
  newsletterEmail = ""
  newsletterStatus: "idle" | "loading" | "success" | "error" = "idle"
  newsletterMessage = ""

  // FAQ
  faqItems = [
    {
      question: "¿El contenido es completamente gratuito?",
      answer:
        "Sí, todo nuestro contenido es gratuito. Creemos que el conocimiento sobre IA debe ser accesible para todos. Si recomendamos herramientas de pago, siempre lo indicamos claramente.",
      isOpen: false,
    },
    {
      question: "¿Usan enlaces de afiliados?",
      answer:
        "Podríamos usar algunos enlaces de afiliados para mantener el sitio, pero siempre los marcamos claramente y solo recomendamos herramientas que realmente aportan valor y hemos probado personalmente.",
      isOpen: false,
    },
    {
      question: "¿Con qué frecuencia publican contenido nuevo?",
      answer:
        "Publicamos contenido nuevo semanalmente, incluyendo guías prácticas, análisis de herramientas y casos de estudio. También actualizamos regularmente el contenido existente.",
      isOpen: false,
    },
    {
      question: "¿Cómo puedo sugerir un tema o colaborar?",
      answer:
        "Nos encanta recibir sugerencias. Puedes contactarnos a través de nuestro formulario de contacto, redes sociales, o enviarnos un email. Leemos y respondemos a todos los mensajes.",
      isOpen: false,
    },
    {
      question: "¿Ofrecen consultoría o servicios personalizados?",
      answer:
        "Actualmente nos enfocamos en crear contenido educativo gratuito. Sin embargo, estamos evaluando ofrecer consultoría especializada en IA para empresas en el futuro.",
      isOpen: false,
    },
  ]

  // Testimonios
  testimonials = [
    {
      name: "María González",
      role: "Marketing Manager",
      company: "StartupTech",
      content:
        "Las guías de IA Blog me ayudaron a automatizar mi flujo de trabajo con ChatGPT. Ahora ahorro 3 horas diarias en tareas repetitivas.",
      avatar: "👩‍💼",
    },
    {
      name: "Carlos Ruiz",
      role: "Freelancer",
      company: "Diseño Gráfico",
      content:
        "Gracias a los tutoriales de Canva AI, puedo crear presentaciones profesionales en minutos. Mis clientes están impresionados.",
      avatar: "👨‍🎨",
    },
    {
      name: "Ana Martín",
      role: "Estudiante",
      company: "Universidad",
      content:
        "Los prompts para estudiar con IA cambiaron mi forma de aprender. Ahora entiendo conceptos complejos mucho más rápido.",
      avatar: "👩‍🎓",
    },
  ]

  private intersectionObserver!: IntersectionObserver
  private animatedElements = new Set<Element>()

  constructor(private scrollService: ScrollService,
              @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.scrollService.scrollToTop()

     // Solo en el navegador
  if (isPlatformBrowser(this.platformId) && 'IntersectionObserver' in window) {
    this.setupIntersectionObserver();
  }

  }
ngAfterViewInit() {
  if (
    isPlatformBrowser(this.platformId) &&
    this.intersectionObserver &&
    this.statsSection
  ) {
    this.intersectionObserver.observe(this.statsSection.nativeElement);
  }
}

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animatedElements.add(entry.target)

            if (entry.target === this.statsSection?.nativeElement) {
              this.animateStats()
            }
          }
        })
      },
      { threshold: 0.3 },
    )
  }

  private animateStats() {
    this.stats.forEach((stat, index) => {
      setTimeout(() => {
        this.animateNumber(stat)
      }, index * 200)
    })
  }

  private animateNumber(stat: any) {
    const duration = 2000
    const steps = 60
    const increment = stat.finalValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.finalValue) {
        current = stat.finalValue
        clearInterval(timer)
        stat.animated = true
      }

      if (stat.finalValue >= 1000) {
        stat.value = (current / 1000).toFixed(1) + "K+"
      } else {
        stat.value = Math.floor(current) + (stat.finalValue === 100 ? "%" : "+")
      }
    }, duration / steps)
  }

  toggleFaq(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen
  }

  async subscribeNewsletter() {
    if (!this.newsletterEmail || !this.isValidEmail(this.newsletterEmail)) {
      this.newsletterStatus = "error"
      this.newsletterMessage = "Por favor, introduce un email válido"
      return
    }

    this.newsletterStatus = "loading"

    // Simular llamada a API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      this.newsletterStatus = "success"
      this.newsletterMessage = "¡Gracias! Te has suscrito correctamente. Revisa tu email para confirmar."
      this.newsletterEmail = ""
    } catch (error) {
      this.newsletterStatus = "error"
      this.newsletterMessage = "Hubo un error. Por favor, inténtalo de nuevo."
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      this.newsletterStatus = "idle"
      this.newsletterMessage = ""
    }, 5000)
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  shareOnTwitter() {
    const text = "Descubre cómo usar IA en tu día a día con guías prácticas y sin tecnicismos en IA Blog"
    const url = window.location.href
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  shareOnLinkedIn() {
    const url = window.location.href
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Mostrar notificación de éxito
      const notification = document.createElement("div")
      notification.textContent = "¡Enlace copiado!"
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300"
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.remove()
      }, 2000)
    })
  }
}
