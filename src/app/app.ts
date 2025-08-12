import { Component, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('blog-tech');

  constructor(public title: Title, private meta: Meta) {
    this.title.setTitle('IA para no técnicos – Guías y herramientas prácticas');
    this.meta.addTags([
      { name: 'description', content: 'Descubre cómo aprovechar la inteligencia artificial sin ser programador. Guías, herramientas y recursos gratuitos.' }
    ]);
}

}
