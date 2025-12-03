import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ScrollService } from '../../../services/scroll.service';
import { ImagePaths } from '../../../shared/constants/image-paths';

import { SeoService } from '../../../services/seo.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-organiza-tareas',
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: './organiza-tareas.html',
  styleUrl: './organiza-tareas.css'
})
export class OrganizaTareas implements OnInit {
  images = ImagePaths;

  emailSubscription = ""

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Organiza tus tareas con IA", active: true },
  ]

  // Prompts para copiar
  prompt1 = "Organiza mi semana para terminar un proyecto, tener tiempo libre y publicar en redes sociales"
  prompt2 =
    "Crea una lista de tareas para mudarme en 7 días, incluyendo lo que debo empacar, limpiar, trasladar y contratar"

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
    const canonical = this.seo.absoluteUrl('/articulos/organiza-tareas-ia');
    const ogImage = this.seo.absoluteUrl('/assets/og/organiza-tareas.png');

    this.seo.setSEO({
      title: 'Organiza tus tareas con IA | Guía paso a paso + caso de éxito',
      description: 'Dale un respiro a tu cabeza: usa Notion AI y más para priorizar, automatizar y ejecutar tu día a día.',
      url: canonical,
      image: ogImage,
      type: 'article',
      publishedTime: '2025-07-14',
      siteName: 'Blog Tech',
      twitterSite: '@tucuenta',
      locale: 'es_ES'
    });

    // Usa autor real y dateModified visible en el HTML (2025-08-10)
    this.seo.setJsonLdArticle({
      headline: 'Dale un respiro a tu cabeza: organiza tus tareas con la ayuda de la IA',
      description: 'Cómo usar Notion AI y otras herramientas para estructurar tu semana.',
      authorName: 'Edinson Gómez',
      datePublished: '2025-07-14',
      dateModified: '2025-08-10',
      image: ogImage,
      url: canonical
    });


    this.seo.setJsonLdOrganization({
      name: 'Blog Tech',
      url: this.seo.absoluteUrl('/'),
      logo: this.seo.absoluteUrl('/assets/logo.png'),
      sameAs: ['https://www.instagram.com/eyesidgomez']
    });

    this.seo.setJsonLdBreadcrumbs([
      { name: 'Inicio', item: this.seo.absoluteUrl('/') },
      { name: 'Artículos', item: this.seo.absoluteUrl('/articulos') },
      { name: 'Organiza tus tareas con IA', item: this.seo.absoluteUrl('/articulos/organiza-tareas-ia') }
    ]);

    this.seo.setJsonLdFAQ([
      {
        question: '¿Notion AI reemplaza por completo la planificación manual?',
        answer: 'No. Es un apoyo que acelera borradores y priorización inicial; revisa y ajusta a tu realidad cada día.'
      },
      {
        question: '¿ClickUp AI o Motion para equipos?',
        answer: 'ClickUp AI destaca en colaboración y seguimiento; Motion reoptimiza automáticamente el calendario según cambios.'
      },
      {
        question: '¿Qué hago si mi semana cambia de golpe?',
        answer: 'Usa bloques flexibles, replanifica con IA y evita listas rígidas; enfócate en 1–3 prioridades diarias.'
      }
    ]);
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
  
  goBack(): void {
    this.location.back()
  }

  toggleBookmark(): void {
    console.log("Bookmark toggled")
  }

  shareArticle(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const url = typeof window !== 'undefined' ? window.location.href : '';
    const payload = {
      title: 'Organiza tus tareas con asistentes de inteligencia artificial',
      text: 'Guía paso a paso para organizar tu día con IA y un caso de éxito real.',
      url
    };

    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      (navigator as any).share(payload).catch(() => {
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
      alert('Copia manual:\n' + prompt);
    });
  }


  subscribeNewsletter(): void {
    if (this.emailSubscription) {
      console.log("Suscribiendo:", this.emailSubscription)
      this.emailSubscription = ""
    }
  }
}
