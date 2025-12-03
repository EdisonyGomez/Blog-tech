// src/app/core/analytics.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window { dataLayer?: any[]; gtag?: (...args: any[]) => void; }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private isBrowser = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init(measurementId: string) {
    if (!this.isBrowser) return;

    // Envía un page_view en cada navegación completa
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((evt) => {
        const page_path = evt.urlAfterRedirects || evt.url;
        const page_title = this.document.title;

        // Aseguramos la función gtag (inyectada por el script del head)
        window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };

        window.gtag('event', 'page_view', {
          page_title,
          page_path,
          send_to: measurementId
        });
      });
  }

  // (Opcional) marca eventos clave
  event(name: string, params: Record<string, any> = {}) {
    if (!this.isBrowser) return;
    window.gtag?.('event', name, params);
  }

  // (Opcional) actualiza consent cuando el usuario acepta cookies
  grantConsent() {
    if (!this.isBrowser) return;
    window.gtag?.('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }
}
