import { Component, type OnInit } from "@angular/core"
import { CommonModule, Location } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Navbar } from "../../../shared/navbar/navbar"
import { Breadcrumbs } from "../../../shared/breadcrumbs/breadcrumbs" 
import { Router, RouterModule } from "@angular/router"
import { ScrollService } from "../../../services/scroll.service"
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: "app-usar-chatgpt",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./usar-chatgpt.html",
  styleUrl: "./usar-chatgpt.css",
})
export class UsarChatgpt implements OnInit {
  emailSubscription = ""

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "5 Ideas Sencillas Para Usar ChatGPT", active: true },
  ]

  // Prompts para copiar
  prompt1 =
    "A ver, ayúdame a organizar mi semana. Trabajo de lunes a viernes de 8 a.m. a 4 p.m., voy a yoga los martes y jueves a las 6 p.m. y quiero leer unas tres veces por semana."
  prompt2 = "Escribe un correo formal para pedir una reunión con un proveedor el viernes a las 10 a.m."
  prompt3 = "¿Qué puedo cocinar con arroz, huevos y tomates?"
  prompt4 = "Sugiere regalos para una chica de 30 años que le encanta leer, viajar y tomar café"
  prompt5 = "Explícame qué es el impuesto a la renta en Colombia"

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
    private title: Title, private meta: Meta
  ) {
    this.title.setTitle('5 formas prácticas de usar ChatGPT | IA para no técnicos');
    this.meta.updateTag({ name: 'description', content: 'Aprende a usar ChatGPT sin ser programador: recetas, planificación, correos, y más.' });

  }

  ngOnInit() {
    // Asegurar que la página se cargue desde el top
    this.scrollService.scrollToTop()
  }

  goBack(): void {
    this.location.back()
  }

  toggleBookmark(): void {
    // Lógica para guardar/quitar bookmark
    console.log("Bookmark toggled")
  }

  shareArticle(): void {
    if (navigator.share) {
      navigator.share({
        title: "5 Ideas Sencillas Para Usar ChatGPT",
        text: "Descubre cómo usar ChatGPT en tu día a día sin ser técnico",
        url: window.location.href,
      })
    } else {
      // Fallback: copiar URL al clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("URL copiada al portapapeles")
    }
  }

  copyPrompt(prompt: string): void {
    navigator.clipboard.writeText(prompt).then(() => {
      // Mostrar feedback visual
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
