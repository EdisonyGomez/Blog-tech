import { Component, AfterViewInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global { interface Window { adsbygoogle: any[] } }

@Component({
  selector: 'app-adsense-block',
  standalone: true,
  template: `
    <div class="ad-container" style="min-height: 250px;">
      <ins class="adsbygoogle"
           style="display:block"
           [attr.data-ad-client]="adClient"
           [attr.data-ad-slot]="adSlot"
           [attr.data-ad-format]="adFormat"
           [attr.data-full-width-responsive]="fullWidthResponsive">
      </ins>
    </div>
  `
})
export class AdsenseBlock implements AfterViewInit {
  @Input() adClient = 'ca-pub-5160041637266223';
  @Input() adSlot = '5928675878'; // cambia según el bloque que crees en AdSense
  @Input() adFormat = 'auto';
  @Input() fullWidthResponsive = 'true';
  @Input() style ='display:block';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense error:', e);
      }
    }
  }
}