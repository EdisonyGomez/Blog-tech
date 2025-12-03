import { Component, type OnInit, type OnDestroy, HostListener, inject } from "@angular/core"
import { CommonModule, DOCUMENT, isPlatformBrowser } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { Title, Meta } from "@angular/platform-browser"
import { signal, computed, effect, PLATFORM_ID } from "@angular/core"
import { Navbar } from "../../../shared/navbar/navbar"
import { Breadcrumbs } from "../../../shared/breadcrumbs/breadcrumbs"
import { AdsenseBlock } from "../../anuncios/adsense-block/adsense-block";

/**
 * Componente standalone optimizado para el artículo Nano Banana
 * - Usa Angular 20 signals y control flow moderno
 * - Implementa microinteracciones y animaciones suaves
 * - Diseño responsive y accesible con Tailwind CSS
 * - Progreso de lectura en tiempo real
 * - Funciones de compartir y guardar optimizadas
 */
@Component({
  selector: "app-articulo-nano-banana",
  imports: [CommonModule, RouterModule, Navbar, Breadcrumbs, AdsenseBlock],
  templateUrl: "./articulo-nano-banana.html",
  styleUrl: "./articulo-nano-banana.css",
})
export class ArticuloNanoBanana implements OnInit, OnDestroy {
  // ────────────────────────────────────────────────────────────────────────────
  // Inyecciones & entorno
  // ────────────────────────────────────────────────────────────────────────────
  private readonly router = inject(Router)
  private readonly title = inject(Title)
  private readonly meta = inject(Meta)
  private readonly platformId = inject(PLATFORM_ID)
  private readonly doc = inject(DOCUMENT)

  readonly isBrowser = isPlatformBrowser(this.platformId)

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  breadcrumbItems = [
    { label: "Inicio", url: "/", icon: "home" },
    { label: "IA aplicada", url: "/ia", icon: "brain" },
    { label: "Guías", url: "/ia/guias", icon: "book" },
    { label: "Nano Banana (Gemini 2.5 Flash Image)", url: this.router.url, icon: "image" },
  ]



   /**
   * Metadatos del artículo con información del autor y fechas
   */
  articleMeta = {
    categoria: "Herramientas IA",
    tiempoLectura: 18,
    fechaPublicacion: "06 de Septiembre de 2025",
    fechaActualizacion: "06 de Septiembre de 2025",
    autorNombre: "Edinson Gomez",
    autorFoto: "/assets/images/me/me.png",
    autorPerfil: "/about-me",
    palabrasClave: ["RAG", "IA", "Memoria Personal", "Privacidad", "Productividad"],
    dificultad: "Intermedio",
    audiencia: "Profesionales, Estudiantes, Freelancers",
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  private readonly savedKey = "nb_article_saved"
  saved = signal<boolean>(false)
  progress = signal<number>(0)

  // Nuevos signals para mejor UX
  isScrolled = signal<boolean>(false)
  showBackToTop = signal<boolean>(false)
  activeSection = signal<string>("introduccion")
  isSharing = signal<boolean>(false)
  toastMessage = signal<string>("")
  showToast = signal<boolean>(false)

  // Computed para progreso visual mejorado
  progressPercentage = computed(() => Math.round(this.progress() * 100))
  progressColor = computed(() => {
    const p = this.progress()
    if (p < 0.3) return "bg-blue-500"
    if (p < 0.7) return "bg-green-500"
    return "bg-purple-500"
  })

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  jsCodeExample = `//🚀 Generación de imágenes con Gemini 2.5 Flash Image
// Instalación: npm i @google/genai
// Configuración: export GEMINI_API_KEY="tu_clave_aqui"

import { GoogleGenAI, toGenerativePart } from "@google/genai";
import fs from "node:fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ✨ Función para generar imágenes desde texto
async function generarImagen() {
  const prompt = \`Ilustración de un café humeante en taza cerámica blanca 
    sobre mesa de madera clara, luz lateral suave, estilo editorial, 
    formato 1:1 2048x2048, alta calidad\`;
    
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });

  // 💾 Guardar imágenes generadas
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  parts.forEach((part, index) => {
    if (part.inlineData) {
      fs.writeFileSync(
        \`cafe_generado_\${index}.png\`,
        Buffer.from(part.inlineData.data, "base64")
      );
      console.log(\`✅ Imagen \${index + 1} guardada exitosamente\`);
    }
  });
}

// 🎨 Función para editar imágenes existentes
async function editarImagen() {
  const prompt = \`Elimina la cuchara del plato y aumenta ligeramente 
    el contraste del café, mantén la iluminación natural\`;
    
  const imageBytes = fs.readFileSync("./cafe_original.jpg");
  const imagePart = toGenerativePart(imageBytes, "image/jpeg");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ 
      role: "user", 
      parts: [{ text: prompt }, imagePart] 
    }]
  });

  // 💾 Guardar versión editada
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  parts.forEach((part, index) => {
    if (part.inlineData) {
      fs.writeFileSync(
        \`cafe_editado_\${index}.png\`,
        Buffer.from(part.inlineData.data, "base64")
      );
    }
  });
}

// 🚀 Ejecutar flujo completo
generarImagen()
  .then(() => editarImagen())
  .then(() => console.log('🎉 Proceso completado'))
  .catch(console.error);`

  pythonCodeExample = `# 🐍 Generación de imágenes con Python
# Instalación: pip install -U google-genai
# Configuración: export GEMINI_API_KEY="tu_clave_aqui"

import os
import base64
from pathlib import Path
from google import genai
from google.genai.types import Part

# 🔧 Configuración del cliente
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def generar_poster():
    """✨ Genera un póster minimalista para evento de IA"""
    prompt = """Póster minimalista para evento de IA, fondo blanco cálido, 
    tipografía sans bold negra, acento azul vibrante, formato vertical 1080x1350,
    composición centrada, jerarquía visual clara, estilo moderno"""
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=[prompt]
        )
        
        # 💾 Guardar imágenes generadas
        for i, part in enumerate(response.candidates[0].content.parts):
            if hasattr(part, "inline_data") and part.inline_data:
                filename = f"poster_ia_{i}.png"
                Path(filename).write_bytes(
                    base64.b64decode(part.inline_data.data)
                )
                print(f"✅ {filename} guardado exitosamente")
                
    except Exception as e:
        print(f"❌ Error generando póster: {e}")

def editar_poster():
    """🎨 Edita el póster agregando efectos visuales"""
    if not Path("poster_ia_0.png").exists():
        print("❌ No se encontró el póster base")
        return
        
    prompt = """Agrega un degradado sutil azul en el fondo y una sombra 
    suave al texto principal, mantén el estilo minimalista"""
    
    try:
        img_bytes = Path("poster_ia_0.png").read_bytes()
        
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=[
                Part.from_text(prompt), 
                Part.from_bytes(img_bytes, "image/png")
            ]
        )
        
        # 💾 Guardar versión editada
        for i, part in enumerate(response.candidates[0].content.parts):
            if hasattr(part, "inline_data") and part.inline_data:
                filename = f"poster_editado_{i}.png"
                Path(filename).write_bytes(
                    base64.b64decode(part.inline_data.data)
                )
                print(f"✅ {filename} guardado exitosamente")
                
    except Exception as e:
        print(f"❌ Error editando póster: {e}")

if __name__ == "__main__":
    print("🚀 Iniciando generación de póster...")
    generar_poster()
    print("🎨 Aplicando ediciones...")
    editar_poster()
    print("🎉 Proceso completado")`

  curlCodeExample = `# 🌐 Solicitud REST con cURL
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent" \\
  -H "x-goog-api-key: $GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "contents": [{
      "parts": [{
        "text": "Infografía isométrica de ciberseguridad, estilo limpio y moderno, paleta azul/gris, tipografía legible, iconografía consistente, formato 1920x1080, alta resolución"
      }]
    }],
    "generationConfig": {
      "temperature": 0.7,
      "maxOutputTokens": 2048
    }
  }' | jq '.candidates[0].content.parts[0].inlineData.data' | base64 -d > infografia.png`

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  private _prompts = signal<Array<{ category: string; prompt: string; icon: string }>>([
    {
      category: "Producto",
      icon: "📦",
      prompt:
        "Composición de producto: smartphone sobre superficie de mármol blanco, luz lateral fría profesional, sombras suaves definidas, reflejo sutil en la superficie; formato 2000px lado mayor; estilo publicitario limpio y premium",
    },
    {
      category: "Retrato",
      icon: "👤",
      prompt:
        "Convierte esta foto en retrato corporativo profesional: limpia la piel de forma natural, balance de blancos neutro, fondo gris medio con bokeh suave; respeta rasgos reales, iluminación favorecedora",
    },
    {
      category: "Infografía",
      icon: "📊",
      prompt:
        "Infografía isométrica sobre ciberseguridad doméstica, tipografía sans serif legible, layout en 2 columnas, paleta azul/gris corporativa, 1920x1080; estilo minimal moderno, iconografía consistente y clara",
    },
    {
      category: "Póster",
      icon: "🎨",
      prompt:
        "Póster minimalista para evento de IA, fondo blanco cálido, tipografía sans bold negra, acento azul vibrante, formato vertical 1080x1350; composición centrada y jerarquía visual clara",
    },
    {
      category: "Edición",
      icon: "✂️",
      prompt:
        "Edita esta imagen: elimina el cable del piso y reconstruye el patrón de madera de forma natural; mantiene iluminación original y textura consistente, sin artefactos",
    },
    {
      category: "Iluminación",
      icon: "💡",
      prompt:
        "Reilumina con iluminación templada lateral desde la izquierda, sombras suaves y naturales, realce de contraste +8%, saturación +5%, sin recorte de highlights",
    },
    {
      category: "Fusión",
      icon: "🔄",
      prompt:
        "Funde estas dos imágenes (producto + escenario): coloca el termo azul sobre mesa de madera clara, luz natural de ventana, sombra de contacto realista y reflejo sutil",
    },
    {
      category: "Variaciones",
      icon: "🌈",
      prompt:
        "Genera 4 variaciones de iluminación: amanecer cálido dorado, mediodía neutro brillante, tarde dorada suave y noche con neón azul; conserva encuadre y elementos base",
    },
  ])

  prompts = computed(() => this._prompts())

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  private progressEffect = effect(() => {
    if (!this.isBrowser) return

    const progressBar = this.doc.getElementById("readingProgress")
    if (!progressBar) return

    const percentage = Math.max(0, Math.min(1, this.progress())) * 100
    progressBar.style.width = `${percentage}%`

    // Actualizar estados derivados
    this.isScrolled.set(this.progress() > 0.05)
    this.showBackToTop.set(this.progress() > 0.3)
  })

  private toastEffect = effect(() => {
    if (!this.showToast()) return

    // Auto-hide toast después de 3 segundos
    setTimeout(() => {
      this.showToast.set(false)
    }, 3000)
  })

  // ────────────────────────────────────────────────────────────────────────────
  // Ciclo de vida
  // ────────────────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.restoreSaved()
    this.setSEO()

    if (this.isBrowser) {
      requestAnimationFrame(() => {
        this.calculateReadingProgress()
        this.setupIntersectionObserver()
      })
    }
  }

  ngOnDestroy(): void {
    // Los effects se limpian automáticamente
  }
 
  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  private setSEO(): void {
    const seoTitle = "Cómo usar Nano Banana (Gemini 2.5 Flash Image) para generar y editar imágenes con IA"
    const seoDesc =
      "Guía práctica completa: instalación, flujo sin código en AI Studio, integración con JavaScript/Python, edición por texto, fusión de imágenes y buenas prácticas para principiantes."
    const keywords =
      "Nano Banana, Gemini 2.5 Flash Image, generación imágenes IA, edición imágenes texto, Google AI Studio, JavaScript Python IA"

    this.title.setTitle(seoTitle)
    this.meta.updateTag({ name: "description", content: seoDesc })
    this.meta.updateTag({ name: "keywords", content: keywords })
    this.meta.updateTag({ name: "author", content: "Tu Nombre" })
    this.meta.updateTag({ property: "og:title", content: seoTitle })
    this.meta.updateTag({ property: "og:description", content: seoDesc })
    this.meta.updateTag({ property: "og:type", content: "article" })
    this.meta.updateTag({ property: "og:image", content: "/assets/nano-banana-og.jpg" })
    this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" })
    this.meta.updateTag({ name: "twitter:title", content: seoTitle })
    this.meta.updateTag({ name: "twitter:description", content: seoDesc })
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  private setupIntersectionObserver(): void {
    if (!this.isBrowser) return

    const sections = this.doc.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" },
    )

    sections.forEach((section) => observer.observe(section))
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────

scrollTo(id: string) {
  if (!this.isBrowser) return;

  const el = this.doc.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Actualiza el hash sin recargar ni navegar:
    history.replaceState(null, '', `#${id}`);
    // Opcional: sincroniza el signal por si el observer tarda en disparar
    this.activeSection.set(id);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────


  goBack(): void {
    if (!this.isBrowser) return

    // Animación suave antes de navegar
    const button = this.doc.querySelector("[data-back-button]") as HTMLElement
    if (button) {
      button.style.transform = "scale(0.95)"
      setTimeout(() => {
        if (window.history.length > 1) {
          window.history.back()
        } else {
          this.router.navigateByUrl("/")
        }
      }, 150)
    }
  }

  scrollToTop(): void {
    if (!this.isBrowser) return

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  async onShare(): Promise<void> {
    if (!this.isBrowser || this.isSharing()) return

    this.isSharing.set(true)

    const url = this.doc.location?.href ?? ""
    const shareData = {
      title: "Cómo usar Nano Banana (Gemini 2.5 Flash Image) para generar y editar imágenes con IA",
      text: "Guía práctica completa con pasos claros, ejemplos de código y mejores prácticas para generar imágenes con IA.",
      url,
    } as ShareData

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData)
        this.showToastMessage("¡Artículo compartido exitosamente! 🎉")
      } else {
        await this.copyToClipboard(url)
        this.showToastMessage("Enlace copiado al portapapeles 📋")
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        await this.copyToClipboard(url)
        this.showToastMessage("Enlace copiado al portapapeles 📋")
      }
    } finally {
      this.isSharing.set(false)
    }
  }

  onBookmark(): void {
    const wasBookmarked = this.saved()
    const newState = !wasBookmarked

    this.saved.set(newState)

    try {
      if (this.isBrowser) {
        localStorage.setItem(this.savedKey, String(newState))
      }
    } catch {
      // Silently handle localStorage errors
    }

    const message = newState ? "¡Artículo guardado en favoritos! ⭐" : "Artículo eliminado de favoritos 📝"
    this.showToastMessage(message)
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  @HostListener("window:scroll")
  @HostListener("window:resize")
  onViewportChange(): void {
    if (this.isBrowser) {
      requestAnimationFrame(() => this.calculateReadingProgress())
    }
  }

  private calculateReadingProgress(): void {
    if (!this.isBrowser) return

    const { documentElement, body } = this.doc
    const scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
    const scrollHeight = Math.max(
      body.scrollHeight,
      documentElement.scrollHeight,
      body.offsetHeight,
      documentElement.offsetHeight,
      body.clientHeight,
      documentElement.clientHeight,
    )

    const viewport = window.innerHeight || documentElement.clientHeight || 0
    const totalScrollable = scrollHeight - viewport
    const progress = totalScrollable > 0 ? Math.min(scrollTop / totalScrollable, 1) : 0

    this.progress.set(progress)
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  private restoreSaved(): void {
    if (!this.isBrowser) return

    try {
      const savedState = localStorage.getItem(this.savedKey)
      this.saved.set(savedState === "true")
    } catch {
      this.saved.set(false)
    }
  }

  private async copyToClipboard(text: string): Promise<void> {
    if (!this.isBrowser) return

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback para navegadores sin soporte de Clipboard API
      const textarea = this.doc.createElement("textarea")
      textarea.value = text
      textarea.style.position = "fixed"
      textarea.style.left = "-9999px"
      textarea.style.opacity = "0"

      this.doc.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, 99999)

      try {
        this.doc.execCommand("copy")
      } catch {
        // Silently fail if execCommand is not supported
      }

      this.doc.body.removeChild(textarea)
    }
  }

  private showToastMessage(message: string): void {
    this.toastMessage.set(message)
    this.showToast.set(true)
  }

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────
  copyCodeToClipboard(code: string, language: string): void {
    this.copyToClipboard(code)
    this.showToastMessage(`Código ${language} copiado al portapapeles! 📋`)
  }

  trackByIndex(index: number): number {
    return index
  }

  trackByCategory(index: number, item: any): string {
    return item.category
  }
  
}
