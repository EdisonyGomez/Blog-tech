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
        title: "Organiza tus tareas con asistentes de inteligencia artificial",
        text: "Guía paso a paso para organizar tu día con IA y un caso de éxito real.",
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
