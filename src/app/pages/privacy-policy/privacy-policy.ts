import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ScrollService } from "../../services/scroll.service"
import { Breadcrumbs } from "../../shared/breadcrumbs/breadcrumbs"
import { Navbar } from "../../shared/navbar/navbar"


@Component({
  selector: "app-privacy-policy",
  imports: [CommonModule, RouterModule, Navbar, Breadcrumbs],
  templateUrl: "./privacy-policy.html",
  styleUrl: "./privacy-policy.css",
  standalone: true,
})
export class PrivacyPolicy implements OnInit {
  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Política de Privacidad", active: true },
  ]

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToTop()
  }
}
