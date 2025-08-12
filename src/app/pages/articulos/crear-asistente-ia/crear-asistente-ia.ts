import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { Navbar } from '../../../shared/navbar/navbar';
import { ScrollService } from '../../../services/scroll.service';

@Component({
  selector: 'app-crear-asistente-ia',
  imports: [
          CommonModule, RouterModule, FormsModule,
           Navbar, Breadcrumbs],
  templateUrl: './crear-asistente-ia.html',
  styleUrls: ['./crear-asistente-ia.css']
})
export class CrearAsistenteIa  implements OnInit {
  emailSubscription = ""

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Artículos", route: "/articulos" },
    { label: "Crea tu asistente virtual con IA", active: true },
  ]

  // Prompts para copiar
  prompt1 = "Organiza mi semana para terminar un proyecto, tener tiempo libre y publicar en redes sociales"
  prompt2 =
    "Crea una lista de tareas para mudarme en 7 días, incluyendo lo que debo empacar, limpiar, trasladar y contratar"

  constructor(
    private router: Router,
    private location: Location,
    private scrollService: ScrollService,
  ) {}

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
        title: "Cómo crear tu propia asistente virtual con inteligencia artificial (sin saber programar)",
        text: "Guía paso a paso para crear tu asistente personal con Voiceflow, ChatGPT y Zapier.",
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
