import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"

@Component({
  selector: "app-navbar",
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.html",
  styleUrl: "./navbar.css",
  standalone: true,
})
export class Navbar {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  constructor(private router: Router) {}

  navigateHome(): void {
    this.router.navigate(["/"])
  }

  navigateToArticles(): void {
    this.router.navigate(["/articulos"])
  }
}
