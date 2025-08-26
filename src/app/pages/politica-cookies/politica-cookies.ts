import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Navbar } from "../../shared/navbar/navbar";
import { Breadcrumbs } from "../../shared/breadcrumbs/breadcrumbs";
import { ScrollService } from "../../services/scroll.service";
import { SeoService } from "../../services/seo.service";

@Component({
  selector: "app-politica-cookies",
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Breadcrumbs],
  templateUrl: "./politica-cookies.html",
})
export class PoliticaCookies implements OnInit {
  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Política de Cookies", active: true },
  ];

  constructor(private scroll: ScrollService, private seo: SeoService) {}

  ngOnInit(): void {
    this.scroll.scrollToTop();

    const canonical = this.seo.absoluteUrl('/politica-cookies');
    this.seo.setSEO({
      title: 'Política de Cookies - IA Blog',
      description: 'Conoce qué cookies usamos en IA Blog, su finalidad y cómo gestionarlas en tu navegador.',
      url: canonical,
      image: this.seo.absoluteUrl('/assets/og/about.png'),
      type: 'article',
      siteName: 'IA Blog'
    });

    this.seo.setJsonLd({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Política de Cookies",
      "url": canonical,
      "description": "Conoce qué cookies usamos en IA Blog, su finalidad y cómo gestionarlas en tu navegador."
    });
  }
}
