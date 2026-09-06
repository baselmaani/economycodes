export interface BreadcrumbTrailItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(trail: BreadcrumbTrailItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
