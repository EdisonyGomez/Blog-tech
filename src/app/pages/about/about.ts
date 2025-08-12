import { Breadcrumbs } from './../../shared/breadcrumbs/breadcrumbs';
import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import  { ScrollService } from "../../services/scroll.service"
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: "app-about",
  imports: [CommonModule, RouterModule, Navbar, Breadcrumbs],
  templateUrl: "./about.html",
  styleUrl: "./about.css",
  standalone: true,
})
export class About implements OnInit {
  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Sobre el sitio", active: true },
  ]

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.scrollToTop()
  }
}
