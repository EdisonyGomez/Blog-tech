import { type AfterViewInit, Component, Inject, PLATFORM_ID, type OnInit } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { trigger, style, animate, transition } from "@angular/animations"
import { ScrollService } from "../../services/scroll.service"
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
  bookmarked: boolean
}

interface Category {
  id: string
  label: string
  count: number
  icon: string
}

@Component({
  selector: "app-inicio",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./inicio.html",
  styleUrls: ["./inicio.css"],
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
    trigger("filterAnimation", [
      transition("* => *", [
        style({ opacity: 0.8, transform: "scale(0.98)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
    ]),
  ],
})
export class Inicio implements OnInit, AfterViewInit {
  searchTerm = ""
  selectedTag = "todos"
  loadingMore = false
  isSearching = false
  searchTimeout: any

  // Lista de artículos procesada
  articulos: Articulo[] = []
  filteredArticles: Articulo[] = []

  private initialDisplayCount = 6
  displayLimit = this.initialDisplayCount

  // Categorías con contadores dinámicos
  categories: Category[] = [
    { id: "todos", label: "Todos", count: 0, icon: "📚" },
    { id: "chatgpt", label: "ChatGPT", count: 0, icon: "🤖" },
    { id: "herramientas", label: "Herramientas", count: 0, icon: "🛠️" },
    { id: "productividad", label: "Productividad", count: 0, icon: "⚡" },
  ];

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this.initializeArticles()
    this.updateCategoryCounts()
    this.filterArticles()
    this.scrollService.scrollToTop()
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof (window as any).ezstandalone !== "undefined") {
        ; (window as any).ezstandalone.cmd.push(() => {
          ; (window as any).ezstandalone.showAds(109, 112, 115)
        })
      }
    }
  }

  // Helpers (añádelos en la clase)
  private normalize(text: string): string {
    return (text || "")
      .toString()
      .normalize("NFD")               // separa tildes
      .replace(/\p{Diacritic}/gu, "") // quita tildes
      .toLowerCase()
      .trim();
  }

  private includes(haystack: string, needle: string): boolean {
    return this.normalize(haystack).includes(this.normalize(needle));
  }

  private initializeArticles() {
    this.articulos = (Articulos as any[]).map((articulo) => ({
      ...articulo,
      bookmarked: this.getBookmarkStatus(articulo.id),
    }))
  }

  private getBookmarkStatus(articleId: number): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]")
      return bookmarks.includes(articleId)
    }
    return false
  }

  private saveBookmarkStatus(articleId: number, bookmarked: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]")
      if (bookmarked && !bookmarks.includes(articleId)) {
        bookmarks.push(articleId)
      } else if (!bookmarked) {
        const index = bookmarks.indexOf(articleId)
        if (index > -1) bookmarks.splice(index, 1)
      }
      localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarks))
    }
  }

private updateCategoryCounts() {
  // Asegura “todos”
  const allCount = this.articulos.length;

  // Mapa de recuentos reales
  const counts = this.articulos.reduce<Record<string, number>>((acc, a) => {
    const key = this.normalize(a.categoria);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  this.categories = this.categories.map(cat => {
    const key = this.normalize(cat.id);
    return {
      ...cat,
      count: key === "todos" ? allCount : (counts[key] ?? 0),
    };
  });
}


  get displayedArticles(): Articulo[] {
    return this.filteredArticles.slice(0, this.displayLimit)
  }

  get hasMoreArticles(): boolean {
    return this.displayLimit < this.filteredArticles.length
  }

  get totalResults(): number {
    return this.filteredArticles.length
  }

  get hasActiveFilters(): boolean {
    return this.searchTerm.trim() !== "" || this.selectedTag !== "todos"
  }

  scrollToArticles() {
    const articlesElement = document.getElementById("articles")
    if (articlesElement) {
      articlesElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

onSearchInput() {
  this.isSearching = true;
  if (this.searchTimeout) clearTimeout(this.searchTimeout);

  this.searchTimeout = setTimeout(() => {
    this.searchTerm = this.searchTerm.replace(/\s+/g, " ").trim(); // colapsa espacios
    this.filterArticles();
    this.isSearching = false;
  }, 300);
}

  filterArticles() {
  const term = this.normalize(this.searchTerm);
  const activeTag = this.normalize(this.selectedTag);

  let temp = [...this.articulos];

  // 1) Filtro por término (título, resumen, categoría)
  if (term) {
    temp = temp.filter(a =>
      this.includes(a.titulo ?? "", term) ||
      this.includes(a.resumen ?? "", term) ||
      this.includes(a.categoria ?? "", term)
    );
  }

  // 2) Filtro por categoría (ignora 'todos')
  if (activeTag && activeTag !== "todos") {
    temp = temp.filter(a => this.normalize(a.categoria) === activeTag);
  }

  this.filteredArticles = temp;
  this.displayLimit = this.initialDisplayCount;

  this.announceResults();
}

  private announceResults() {
    if (isPlatformBrowser(this.platformId)) {
      const announcement = `Se encontraron ${this.totalResults} artículo${this.totalResults !== 1 ? "s" : ""}`

      // Crear elemento para anuncio accesible
      const announcer = document.createElement("div")
      announcer.setAttribute("aria-live", "polite")
      announcer.setAttribute("aria-atomic", "true")
      announcer.className = "sr-only"
      announcer.textContent = announcement

      document.body.appendChild(announcer)

      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 1000)
    }
  }

  filterByTag(tag: string) {
    if (this.selectedTag === tag) return

    this.selectedTag = tag
    this.filterArticles()

    // Scroll suave a artículos si no están visibles
    setTimeout(() => {
      const articlesSection = document.getElementById("articles")
      if (articlesSection) {
        const rect = articlesSection.getBoundingClientRect()
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          this.scrollToArticles()
        }
      }
    }, 100)
  }

  clearSearch() {
    this.searchTerm = ""
    this.filterArticles()
  }

  clearAllFilters() {
    this.searchTerm = ""
    this.selectedTag = "todos"
    this.filterArticles()
  }

  toggleBookmark(articulo: Articulo, event: Event) {
    event.preventDefault()
    event.stopPropagation()

    articulo.bookmarked = !articulo.bookmarked
    this.saveBookmarkStatus(articulo.id, articulo.bookmarked)

    // Feedback visual temporal
    const button = event.target as HTMLElement
    const originalText = button.getAttribute("aria-label")
    button.setAttribute("aria-label", articulo.bookmarked ? "Guardado en favoritos" : "Removido de favoritos")

    setTimeout(() => {
      if (originalText) {
        button.setAttribute("aria-label", originalText)
      }
    }, 2000)
  }

  loadMoreArticles() {
    this.loadingMore = true

    setTimeout(() => {
      const increment = 6
      this.displayLimit = Math.min(this.displayLimit + increment, this.filteredArticles.length)
      this.loadingMore = false
    }, 500)
  }

  getCategoryIcon(categoria: string): string {
    const category = this.categories.find((cat) => cat.id === categoria)
    return category?.icon || "📄"
  }

  getCategoryLabel(categoria: string): string {
    const category = this.categories.find((cat) => cat.id === categoria)
    return category?.label || categoria
  }

  getReadingTimeText(minutes: number): string {
    return minutes === 1 ? "1 min de lectura" : `${minutes} min de lectura`
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  formatViews(views: number): string {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  getResultsText(): string {
    if (this.totalResults === 0) {
      return "No se encontraron artículos"
    } else if (this.totalResults === 1) {
      return "1 artículo encontrado"
    } else {
      return `${this.totalResults} artículos encontrados`
    }
  }

  getSearchContextText(): string {
    let context = ""

    if (this.searchTerm.trim()) {
      context += ` para "${this.searchTerm}"`
    }

    if (this.selectedTag !== "todos") {
      const categoryLabel = this.getCategoryLabel(this.selectedTag)
      context += ` en ${categoryLabel}`
    }

    return context
  }
}
