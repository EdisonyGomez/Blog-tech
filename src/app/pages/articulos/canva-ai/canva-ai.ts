import { ScrollService } from './../../../services/scroll.service';
import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import  { Location } from "@angular/common"
import { Navbar } from '../../../shared/navbar/navbar';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs'; 
import { Router } from '@angular/router'; 
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: "app-canva-ai",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./canva-ai.html",
  styleUrl: "./canva-ai.css",
})
export class CanvaAi implements OnInit {
  emailSubscription = ""

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Canva AI: Diseña presentaciones profesionales", active: true },
  ]

  // Prompts para copiar
  prompt1 =
    "Crea una presentación de 10 diapositivas sobre 'Estrategias de Marketing Digital para Pequeñas Empresas'. Incluye una portada atractiva, agenda, 6 diapositivas de contenido principal, una de conclusiones y una de contacto."
  prompt2 =
    "Genera contenido para una diapositiva sobre 'Beneficios del trabajo remoto' con 4 puntos principales, cada uno con un ícono representativo y una descripción de máximo 15 palabras."
  prompt3 =
    "Sugiere una paleta de colores profesional para una presentación sobre tecnología financiera (fintech) que transmita confianza y modernidad."
  prompt4 =
    "Crea texto para una diapositiva de portada de una presentación sobre 'Sostenibilidad Empresarial' dirigida a ejecutivos de nivel C."

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private title: Title, private meta: Meta
  ) {
    this.title.setTitle('Canva AI: Crea presentaciones geniales en minutos');
    this.meta.updateTag({ name: 'description', content: 'Aprende a hacer presentaciones impactantes aunque no sepas nada de diseño con Canva AI. Te explicamos cómo, paso a paso, para que sea súper fácil.' });
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
        title: "Canva AI: Diseña presentaciones profesionales en minutos",
        text: "Aprende a crear presentaciones impactantes con Canva AI sin experiencia en diseño",
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
