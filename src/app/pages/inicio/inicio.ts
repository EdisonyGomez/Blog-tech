import { AfterViewInit, Component, Inject, PLATFORM_ID, type OnInit } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { trigger, style, animate, transition, state } from "@angular/animations" // Importar 'state'
import  { ScrollService } from "../../services/scroll.service"
import { Articulos } from "../../shared/articles/articles"

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
  expanded: boolean
  contenidoPreview: string
  bookmarked: boolean
}

@Component({
  selector: "app-inicio",
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./inicio.html",
  styleUrl: "./inicio.css",
  standalone: true,
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("slideInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("expandCollapse", [
      state("void", style({ height: "0", opacity: 0, overflow: "hidden" })),
      state("*", style({ height: "*", opacity: 1, overflow: "hidden" })),
      transition("void <=> *", animate("300ms ease-in-out")),
    ]),
  ],
})
export class Inicio implements OnInit, AfterViewInit  {
  searchTerm = ""
  selectedTag = "todos"
  loadingMore = false

 

  // Lista de artículos importada desde el archivo compartido
  articulos = Articulos as Articulo[]
  filteredArticles: Articulo[] = []

  private initialDisplayCount = 4
  displayLimit = this.initialDisplayCount

  constructor(private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      if (typeof (window as any).ezstandalone !== 'undefined') {
        (window as any).ezstandalone.cmd.push(() => {
          (window as any).ezstandalone.showAds(109, 112, 115);
        });
      }
    }
  }

  ngOnInit() {
    this.filterArticles() // Llama a filterArticles para inicializar filteredArticles y displayedArticles
    this.scrollService.scrollToTop()
  }

  get displayedArticles(): Articulo[] {
    return this.filteredArticles.slice(0, this.displayLimit)
  }

  get hasMoreArticles(): boolean {
    return this.displayLimit < this.filteredArticles.length
  }

  scrollToArticles() {
    document.getElementById("articles")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  filterArticles() {
    let tempArticles = [...this.articulos]

    // Aplicar filtro por término de búsqueda
    if (this.searchTerm) {
      tempArticles = tempArticles.filter(
        (articulo) =>
          articulo.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          articulo.resumen.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }

    // Aplicar filtro por categoría
    if (this.selectedTag !== "todos") {
      tempArticles = tempArticles.filter((articulo) => articulo.categoria === this.selectedTag)
    }

    this.filteredArticles = tempArticles
    this.displayLimit = this.initialDisplayCount // Resetear el límite al aplicar filtros
  }

  filterByTag(tag: string) {
    this.selectedTag = tag
    this.filterArticles() // Reutilizar filterArticles para aplicar el filtro de tag
  }

  toggleArticleExpansion(articulo: Articulo) {
    articulo.expanded = !articulo.expanded
  }

  toggleBookmark(articulo: Articulo) {
    articulo.bookmarked = !articulo.bookmarked
  }

  loadMoreArticles() {
    this.loadingMore = true
    // Simular carga de más artículos
    setTimeout(() => {
      this.displayLimit = this.filteredArticles.length // Mostrar todos los artículos restantes
      this.loadingMore = false
    }, 500) // Reducido el tiempo para una mejor UX
  }
}
