import { Breadcrumbs } from './../../../shared/breadcrumbs/breadcrumbs';
import { Navbar } from './../../../shared/navbar/navbar';
import { ScrollService } from './../../../services/scroll.service';
import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, Router } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Location } from "@angular/common"
import { trigger, style, animate, transition, stagger, query, keyframes } from "@angular/animations"

import { SeoService } from './../../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

interface CVAnalysis {
  score: number
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  keywords: string[]
}

@Component({
  selector: "app-crear-curriculum-ia",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./crear-curriculum-ia.html",
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
    trigger("slideInScale", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.8)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
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
export class CrearCurriculumIa implements OnInit {
  emailSubscription = ""

  // Simulador variables
  experienceLevel = "mid"
  desiredRole = ""
  selectedSector = "tecnologia"
  cvAnalysis: CVAnalysis | null = null
  isAnalyzing = false

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Crear currículum con IA", active: true },
  ]

  experienceLevels = [
    { value: "junior", label: "👶 Junior (0-2 años)", color: "bg-green-100 text-green-700" },
    { value: "mid", label: "🚀 Mid-level (2-5 años)", color: "bg-blue-100 text-blue-700" },
    { value: "senior", label: "⭐ Senior (5+ años)", color: "bg-purple-100 text-purple-700" },
  ]

  sectors = [
    { value: "tecnologia", label: "💻 Tecnología" },
    { value: "salud", label: "🏥 Salud" },
    { value: "educacion", label: "📚 Educación" },
    { value: "finanzas", label: "💰 Finanzas" },
    { value: "marketing", label: "📈 Marketing" },
    { value: "ventas", label: "🎯 Ventas" },
    { value: "diseno", label: "🎨 Diseño" },
    { value: "recursos-humanos", label: "👥 Recursos Humanos" },
    { value: "ingenieria", label: "⚙️ Ingeniería" },
    { value: "otros", label: "🌟 Otros" },
  ]

  tools = [
    {
      name: "ChatGPT",
      description: "Generar contenido, reformular logros, ideas de diseño",
      icon: "🤖",
      url: "https://chat.openai.com",
      category: "Contenido",
      features: ["Resúmenes profesionales", "Reformulación de logros", "Cartas de presentación"],
    },
    {
      name: "Rezi AI",
      description: "Crear CV optimizado para ATS (sistemas de reclutamiento)",
      icon: "🎯",
      url: "https://rezi.ai",
      category: "Optimización ATS",
      features: ["Análisis ATS", "Palabras clave", "Formato optimizado"],
    },
    {
      name: "Resume.io",
      description: "Diseñar tu CV visualmente (plantillas modernas)",
      icon: "📄",
      url: "https://resume.io",
      category: "Diseño",
      features: ["Plantillas profesionales", "Editor visual", "Exportación PDF"],
    },
    {
      name: "Canva AI",
      description: "Diseños creativos rápidos con IA",
      icon: "🎨",
      url: "https://canva.com",
      category: "Diseño Creativo",
      features: ["Templates únicos", "IA generativa", "Elementos visuales"],
    },
  ]

  // Prompts para copiar
  prompts = {
    resumenProfesional:
      "Redacta un resumen profesional para alguien con experiencia en [tu área], que quiere postular a una empresa [tipo de empresa] en el área de [área específica].",
    logrosMediables: "Convierte esta frase en un logro medible y profesional: '[describe tu tarea o responsabilidad]'",
    cvCompleto:
      "Crea un currículum para una persona con [X años] de experiencia en [tu área], que busca empleo [remoto/presencial] en [tipo de empresa]. Incluye resumen, experiencia laboral, habilidades y formación.",
    optimizacionATS:
      "Analiza esta descripción de puesto y sugiere palabras clave que debería incluir en mi CV: [pegar descripción del puesto]",
  }

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object


  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTop();
    }

    const canonical = this.seo.absoluteUrl('/articulos/crear-curriculum-ia');
    const ogImage = this.seo.absoluteUrl('/assets/og/crear-cv-ia.png');

    this.seo.setSEO({
      title: 'Cómo crear tu currículum con inteligencia artificial (y destacar frente a cientos de candidatos)',
      description: 'Aprende a crear un CV profesional, optimizado para reclutadores, usando herramientas de IA. Incluye prompts, plantillas y consejos prácticos.',
      url: canonical,
      image: ogImage,
      type: 'article',
      siteName: 'Blog Tech',
      twitterSite: '@tucuenta',
      locale: 'es_ES',
      publishedTime: '2025-07-30'
    });

    // Añade autor como Persona y dateModified si lo tienes
    this.seo.setJsonLdArticle({
      headline: 'Cómo crear tu currículum con inteligencia artificial',
      description: 'De 0 a CV competitivo: ATS, keywords y logros medibles.',
      authorName: 'Edinson Gómez', // mejor autor real, no “Blog Tech”
      datePublished: '2025-07-30',
      dateModified: '2025-08-10',   // ya aparece en la vista
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
  if (!isPlatformBrowser(this.platformId)) return;

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const data = {
    title: 'Cómo crear tu currículum con inteligencia artificial',
    text: 'Aprende a crear un CV profesional y optimizado usando herramientas de IA',
    url
  };

  if (typeof navigator !== 'undefined' && (navigator as any).share) {
    (navigator as any).share(data).catch(() => {
      navigator.clipboard?.writeText(url);
      alert('URL copiada al portapapeles');
    });
  } else {
    navigator.clipboard?.writeText(url);
    alert('URL copiada al portapapeles');
  }
}

copyPrompt(prompt: string): void {
  if (!isPlatformBrowser(this.platformId)) return;
  navigator.clipboard?.writeText(prompt).then(() => {
    console.log('Prompt copiado');
  }).catch(() => {
    // Fallback simple
    alert('Copia manual: ' + prompt);
  });
}

scrollToAnalyzer(): void {
  if (!isPlatformBrowser(this.platformId)) return;
  document.getElementById('cv-analyzer')?.scrollIntoView({ behavior: 'smooth' });
}

  subscribeNewsletter(): void {
    if (this.emailSubscription) {
      console.log("Suscribiendo:", this.emailSubscription)
      this.emailSubscription = ""
    }
  }

  // Simulador de análisis de CV
  analyzeCv(): void {
    if (!this.desiredRole.trim()) {
      alert("Por favor, especifica el rol al que aspiras para analizar tu perfil.")
      return
    }

    this.isAnalyzing = true

    // Simular análisis de IA
    setTimeout(() => {
      this.cvAnalysis = this.generateCvAnalysis(this.experienceLevel, this.desiredRole, this.selectedSector)
      this.isAnalyzing = false
    }, 2500)
  }

  private generateCvAnalysis(experience: string, role: string, sector: string): CVAnalysis {
    const sectorData = {
      tecnologia: {
        keywords: ["JavaScript", "Python", "React", "Node.js", "AWS", "Git", "Agile", "API"],
        skills: ["programación", "desarrollo web", "bases de datos", "cloud computing"],
      },
      salud: {
        keywords: ["pacientes", "diagnóstico", "tratamiento", "protocolos", "seguridad", "calidad"],
        skills: ["atención al paciente", "conocimientos médicos", "trabajo en equipo", "comunicación"],
      },
      marketing: {
        keywords: ["SEO", "SEM", "Google Analytics", "redes sociales", "conversión", "ROI", "campañas"],
        skills: ["análisis de datos", "creatividad", "comunicación", "estrategia digital"],
      },
      finanzas: {
        keywords: ["análisis financiero", "Excel", "presupuestos", "inversiones", "riesgo", "compliance"],
        skills: ["análisis cuantitativo", "atención al detalle", "normativas", "reporting"],
      },
      diseno: {
        keywords: ["Adobe", "Figma", "UI/UX", "branding", "tipografía", "color", "composición"],
        skills: ["creatividad", "software de diseño", "comunicación visual", "tendencias"],
      },
      ventas: {
        keywords: ["CRM", "prospección", "negociación", "cierre", "KPIs", "pipeline", "clientes"],
        skills: ["comunicación", "persuasión", "orientación a resultados", "networking"],
      },
      educacion: {
        keywords: ["pedagogía", "currículo", "evaluación", "metodologías", "tecnología educativa"],
        skills: ["enseñanza", "paciencia", "comunicación", "adaptabilidad", "liderazgo"],
      },
      "recursos-humanos": {
        keywords: ["reclutamiento", "selección", "nómina", "capacitación", "evaluación", "compliance"],
        skills: ["comunicación", "confidencialidad", "organización", "negociación", "empatía"],
      },
      ingenieria: {
        keywords: ["CAD", "proyectos", "calidad", "procesos", "normativas", "optimización"],
        skills: ["resolución de problemas", "análisis técnico", "trabajo en equipo", "precisión"],
      },
      otros: {
        keywords: ["liderazgo", "comunicación", "organización", "resultados", "eficiencia"],
        skills: ["adaptabilidad", "trabajo en equipo", "orientación a resultados", "comunicación"],
      },
    }

    const data = sectorData[sector as keyof typeof sectorData] || sectorData.otros

    const experienceAnalysis = {
      junior: {
        score: 65,
        strengths: ["Energía y ganas de aprender", "Conocimientos actualizados", "Flexibilidad"],
        improvements: [
          "Agregar más proyectos personales o académicos",
          "Destacar habilidades técnicas específicas",
          "Incluir certificaciones relevantes",
        ],
      },
      mid: {
        score: 78,
        strengths: ["Experiencia práctica sólida", "Balance entre técnico y soft skills", "Historial comprobado"],
        improvements: [
          "Cuantificar mejor los logros obtenidos",
          "Agregar ejemplos de liderazgo o mentoría",
          "Incluir impacto en resultados de negocio",
        ],
      },
      senior: {
        score: 85,
        strengths: ["Amplia experiencia", "Liderazgo demostrado", "Visión estratégica"],
        improvements: [
          "Enfocar en logros de alto impacto",
          "Destacar equipos liderados y resultados",
          "Incluir reconocimientos o premios",
        ],
      },
    }

    const expData = experienceAnalysis[experience as keyof typeof experienceAnalysis]

    return {
      score: expData.score,
      strengths: expData.strengths,
      improvements: expData.improvements,
      recommendations: [
        `Incluye palabras clave específicas de ${this.getSectorLabel(sector)}`,
        `Adapta tu resumen profesional para roles de ${role}`,
        "Usa números y métricas en tus logros",
        "Optimiza el formato para sistemas ATS",
      ],
      keywords: data.keywords.slice(0, 6),
    }
  }

  private getSectorLabel(sector: string): string {
    const sectorObj = this.sectors.find((s) => s.value === sector)
    return sectorObj ? sectorObj.label.split(" ")[1] : "tu sector"
  }

  resetAnalyzer(): void {
    this.experienceLevel = "mid"
    this.desiredRole = ""
    this.selectedSector = "tecnologia"
    this.cvAnalysis = null
  }


}
