import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from "../../shared/navbar/navbar";
import { Articulos as ArticulosData } from "../../shared/articles/articles"
import { ScrollService } from '../../services/scroll.service';
import { FormsModule } from '@angular/forms';

interface Articulo {
  id: number
  titulo: string
  resumen: string
  fecha: string
  slug: string
  categoria: string
  tiempoLectura: number
  vistas: number
  likes: number
  expanded: boolean // Aunque no se use aquí, mantener por consistencia
  contenidoPreview: string // Aunque no se use aquí, mantener por consistencia
  bookmarked: boolean // Aunque no se use aquí, mantener por consistencia
}
@Component({
  standalone: true,
  selector: 'app-articulos',
imports: [CommonModule, RouterModule, Navbar, FormsModule],
  templateUrl: './articulos.html',
  styleUrl: './articulos.css'
})
export class Articulos {
  articulos = ArticulosData
  filteredArticles: Articulo[] = []
  searchTerm = ""
  selectedTag = "todos"
  loadingMore = false
  hasMoreArticles = false // Por ahora, no hay más artículos para cargar

  constructor(private scrollService: ScrollService) {} // Inyectar ScrollService

  ngOnInit() {
    this.filteredArticles = [...this.articulos]
    this.scrollService.scrollToTop() // Asegurar que la página se cargue desde el top
  }

  filterArticles() {
    this.filteredArticles = this.articulos.filter(
      (articulo) =>
        articulo.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        articulo.resumen.toLowerCase().includes(this.searchTerm.toLowerCase()),
    )
  }

  filterByTag(tag: string) {
    this.selectedTag = tag
    if (tag === "todos") {
      this.filteredArticles = [...this.articulos]
    } else {
      this.filteredArticles = this.articulos.filter((articulo) => articulo.categoria === tag)
    }
  }

  loadMoreArticles() {
    this.loadingMore = true
    // Simular carga de más artículos
    setTimeout(() => {
      this.loadingMore = false
      this.hasMoreArticles = false // Por ahora no hay más
    }, 1500)
  }
}