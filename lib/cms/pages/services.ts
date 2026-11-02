import { servicesList } from "@/content/services";
import { serviceMeta } from "@/content/service-meta";
import { definePage } from "./types";

/** Page key under which a service's SEO and content overrides are stored. */
export function servicePageKey(serviceKey: string): string {
  return `service:${serviceKey}`;
}

export const servicePageDefs = servicesList.map((service) => {
  const meta = serviceMeta[service.key];
  return definePage({
    key: servicePageKey(service.key),
    label: service.name.sv,
    group: "Services",
    serviceKey: service.key,
    seo: {
      title: meta?.title ?? service.name,
      description: meta?.description ?? service.summary,
    },
    text: [
      {
        key: "heading",
        label: "Page heading (H1)",
        kind: "text",
        default: meta?.title ?? service.name,
      },
      {
        key: "summary",
        label: "Summary under the heading",
        kind: "textarea",
        default: service.summary,
      },
      {
        key: "teaser",
        label: "Teaser (shown on service cards)",
        kind: "textarea",
        default: service.teaser,
      },
    ],
    lists: [
      { key: "whoItsFor", label: "Who it's for", default: service.whoItsFor },
      {
        key: "whatsIncluded",
        label: "What's included",
        default: service.whatsIncluded,
      },
      {
        key: "process",
        label: "How it works (steps)",
        default: service.process,
      },
      {
        key: "whatToPrepare",
        label: "What to prepare",
        default: service.whatToPrepare,
      },
    ],
    blocks: [{ key: "body", label: "Body text", default: service.body }],
    images: [
      {
        // Key kept from when this was only the hero image (saved overrides use it).
        key: "heroImage",
        label: "Feature image",
        hint: "Landscape, about 3:2. Shown on service cards and at the top of the service page.",
      },
    ],
  });
});
