import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { ScrollService } from "../../services/scroll.service"
import { Navbar } from "../../shared/navbar/navbar"
import { Breadcrumbs } from "../../shared/breadcrumbs/breadcrumbs"


@Component({
  selector: "app-contact",
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Breadcrumbs],
  templateUrl: "./contact.html",
  styleUrl: "./contact.css",
  standalone: true,
})
export class Contact implements OnInit {
  name = ""
  email = ""
  message = ""
  formSubmitted = false

  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Contacto", active: true },
  ]

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToTop()
  }

  submitForm(): void {
    // Aquí iría la lógica para enviar el formulario (ej. a un servicio backend)
    console.log("Formulario enviado:", {
      name: this.name,
      email: this.email,
      message: this.message,
    })
    this.formSubmitted = true
    // Resetear el formulario después de un breve tiempo
    setTimeout(() => {
      this.name = ""
      this.email = ""
      this.message = ""
      this.formSubmitted = false
    }, 3000)
  }
}
