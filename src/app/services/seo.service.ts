import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

type SeoInput = {
  title: string;
  description: string;
  url: string;                 // Canonical absoluto
  image?: string;              // URL absoluta si la tienes (ideal para OG/Twitter)
  type?: 'article' | 'website';
  publishedTime?: string;      // ISO 8601
  modifiedTime?: string;       // ISO 8601
  locale?: string;             // 'es_ES'
  siteName?: string;           // Nombre del sitio
  twitterSite?: string;        // @cuenta
  ogImageWidth?: number;
  ogImageHeight?: number;
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly SITE_URL = 'https://exploraelfuturo.com';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  // ========= SEO TAGS =========
  setSEO(input: SeoInput) {
    const {
      title, description, url, image,
      type = 'article',
      publishedTime, modifiedTime,
      locale = 'es_ES',
      siteName = 'Blog Tech',
      twitterSite = '@tucuenta',
      ogImageWidth,
      ogImageHeight
    } = input;

    // <title>
    this.title.setTitle(title);

    // Meta básicas
    this.meta.updateTag({ name: 'description', content: description });

    // Canonical
    this.setCanonical(url);

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
      if (ogImageWidth)  this.meta.updateTag({ property: 'og:image:width', content: String(ogImageWidth) });
      if (ogImageHeight) this.meta.updateTag({ property: 'og:image:height', content: String(ogImageHeight) });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:site', content: twitterSite });
    if (image) this.meta.updateTag({ name: 'twitter:image', content: image });

    // Article meta opcionales
    if (type === 'article') {
      if (publishedTime) this.meta.updateTag({ property: 'article:published_time', content: publishedTime });
      if (modifiedTime)  this.meta.updateTag({ property: 'article:modified_time',  content: modifiedTime  });
    }
  }

  setRobots(content: string) {
    // ejemplos: "index,follow", "noindex,nofollow", "max-snippet:-1, max-image-preview:large"
    this.meta.updateTag({ name: 'robots', content });
  }

  setPrevNext(prevUrl?: string, nextUrl?: string) {
    const head = this.doc.head;
    this.setLinkTag(head, 'prev', prevUrl);
    this.setLinkTag(head, 'next', nextUrl);
  }

  setOgImageSize(width?: number, height?: number) {
    if (width)  this.meta.updateTag({ property: 'og:image:width',  content: String(width) });
    if (height) this.meta.updateTag({ property: 'og:image:height', content: String(height) });
  }

  // ========= JSON-LD HELPERS =========
  /** Inyecta cualquier JSON-LD. Útil para WebPage, BreadcrumbList, FAQPage, etc. */
  setJsonLd(data: Record<string, any>, id = 'ld-json-generic') {
    this.injectJsonLd(id, data);
  }

  replaceJsonLd(id: string, data: Record<string, any>) {
    this.injectJsonLd(id, data, true);
  }

  removeJsonLd(id: string) {
    const existing = this.doc.getElementById(id);
    if (existing) existing.remove();
  }

  /** WebSite (para portada) */
  setJsonLdWebSite(data: {
    name: string;
    url: string;
    searchUrlTemplate?: string; // Ej: https://sitio.com/buscar?q={search_term_string}
  }) {
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.name,
      url: data.url
    };
    if (data.searchUrlTemplate) {
      jsonLd.potentialAction = {
        '@type': 'SearchAction',
        target: `${data.searchUrlTemplate}`,
        'query-input': 'required name=search_term_string'
      };
    }
    this.injectJsonLd('ld-json-website', jsonLd);
  }

  /** Organization (mejora E-E-A-T) */
  setJsonLdOrganization(data: {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[]; // redes verificadas
  }) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      logo: data.logo ? { '@type': 'ImageObject', url: data.logo } : undefined,
      sameAs: data.sameAs?.length ? data.sameAs : undefined
    };
    this.injectJsonLd('ld-json-org', jsonLd);
  }

  /** WebPage (páginas estáticas) */
  setJsonLdWebPage(data: {
    name: string;
    url: string;
    description?: string;
    inLanguage?: string; // ej. 'es-ES'
    isPartOf?: { '@type': 'WebSite'; name: string; url: string };
  }) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: data.name,
      url: data.url,
      description: data.description,
      inLanguage: data.inLanguage || 'es-ES',
      isPartOf: data.isPartOf
    };
    this.injectJsonLd('ld-json-webpage', jsonLd);
  }

  /** Article (autor Person + fechas + imagen) */
  setJsonLdArticle(data: {
    headline: string;
    description: string;
    authorName: string;
    datePublished: string;   // ISO 8601
    dateModified?: string;   // ISO 8601
    image?: string;          // URL absoluta
    url: string;             // Canonical
    publisherName?: string;
    publisherLogo?: string;  // URL absoluta
  }) {
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      author: { '@type': 'Person', name: data.authorName },
      mainEntityOfPage: data.url,
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      image: data.image ? [data.image] : undefined,
      url: data.url
    };
    if (data.publisherName) {
      jsonLd.publisher = {
        '@type': 'Organization',
        name: data.publisherName,
        logo: data.publisherLogo ? { '@type': 'ImageObject', url: data.publisherLogo } : undefined
      };
    }
    this.injectJsonLd('ld-json-article', jsonLd);
  }

  /** BreadcrumbList */
  setJsonLdBreadcrumbs(items: { name: string; item: string }[]) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.item
      }))
    };
    this.injectJsonLd('ld-json-breadcrumbs', jsonLd);
  }

  /** FAQPage */
  setJsonLdFAQ(faqs: { question: string; answer: string }[]) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer }
      }))
    };
    this.injectJsonLd('ld-json-faq', jsonLd);
  }

  // ========= UTILS =========
  absoluteUrl(pathOrUrl: string) {
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
    const cleaned = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${this.SITE_URL}${cleaned}`;
  }

  private setCanonical(url: string) {
    const head = this.doc.head;
    const linkSelector = 'link[rel="canonical"]';
    let link: HTMLLinkElement | null = head.querySelector(linkSelector);
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setLinkTag(head: HTMLHeadElement, rel: 'prev'|'next', href?: string) {
    const selector = `link[rel="${rel}"]`;
    let link: HTMLLinkElement | null = head.querySelector(selector);
    if (!href) {
      if (link) link.remove();
      return;
    }
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private injectJsonLd(id: string, json: Record<string, any>, replace = false) {
    if (replace) {
      const existing = this.doc.getElementById(id);
      if (existing) existing.remove();
    } else {
      // Evita duplicados si ya existe el mismo id
      const existing = this.doc.getElementById(id);
      if (existing) existing.remove();
    }

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;

    // Elimina claves undefined para evitar warnings
    const cleaned = JSON.parse(JSON.stringify(json));
    script.text = JSON.stringify(cleaned);
    this.doc.head.appendChild(script);
  }
}
