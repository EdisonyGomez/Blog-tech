import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-banner.html'
})
export class CookieBanner implements OnInit {
  showBanner = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        this.showBanner = true;
      }
    }
  }

  acceptCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'true');
      this.showBanner = false;
    }
  }
}
