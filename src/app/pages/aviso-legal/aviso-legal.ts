import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Navbar } from "../../shared/navbar/navbar";
import { Breadcrumbs } from "../../shared/breadcrumbs/breadcrumbs";
import { ScrollService } from "../../services/scroll.service";
import { SeoService } from "../../services/seo.service";

@Component({
  selector: "app-aviso-legal",
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Breadcrumbs],
  templateUrl: "./aviso-legal.html",
})
export class AvisoLegal implements OnInit {
  breadcrumbItems = [
    { label: "Inicio", route: "/" },
    { label: "Aviso Legal", active: true },
  ];

  constructor(private scroll: ScrollService, private seo: SeoService) {}

  ngOnInit(): void {
    this.scroll.scrollToTop();

    const canonical = this.seo.absoluteUrl('/aviso-legal');
    this.seo.setSEO({
      title: 'Aviso Legal - IA Blog',
      description: 'Aviso legal de IA Blog: información del titular, condiciones de uso y propiedad intelectual.',
      url: canonical,
      image: this.seo.absoluteUrl('/assets/og/about.png'),
      type: 'article',
      siteName: 'IA Blog'
    });

    this.seo.setJsonLd({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Aviso Legal",
      "url": canonical,
      "description": "Aviso legal de IA Blog: información del titular, condiciones de uso y propiedad intelectual."
    });
  }
}
