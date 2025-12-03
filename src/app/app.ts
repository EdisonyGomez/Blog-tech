import { Component, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/footer/footer";
import { CookieBanner } from "./shared/cookie-banner/cookie-banner";
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, CookieBanner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('blog-tech');

  constructor(public title: Title, private meta: Meta,
              private analytics: AnalyticsService
            ) {
    this.title.setTitle('IA para no técnicos – Guías y herramientas prácticas');
    this.meta.addTags([
      { name: 'description', content: 'Descubre cómo aprovechar la inteligencia artificial sin ser programador. Guías, herramientas y recursos gratuitos.' }
    ]);
  }


   ngOnInit(): void {
    this.analytics.init('G-T19H36C0H7'); 
    this.analytics.grantConsent();
  }
}
