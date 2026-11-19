import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getAbsoluteUrl } from "@/lib/routes";
import { getSoftwareSubpageContent } from "@/lib/cms/content";
import {
  isSoftwarePagePublic,
  softwarePages,
  visibleSoftwareSubpages,
} from "@/content/software";
import { softwareSubpages } from "@/content/software-pages";
import { PageBreadcrumbs } from "@/components/page/PageBreadcrumbs";
import {
  SoftwareCtaBand,
  SoftwareFaqSection,
  SoftwareFeatureRow,
  SoftwareHero,
  SoftwareRelated,
  SoftwareSteps,
} from "./SoftwareSections";

type SubpageKey = keyof typeof softwareSubpages;

/**
 * Shared layout of the feature and integration pages: hero, one worked
 * workflow, feature sections, FAQ, links to the other pages, and the CTA.
 */
export async function SoftwareSubpage({
  pageKey,
  locale,
}: {
  pageKey: SubpageKey;
  locale: AppLocale;
}) {
  const entry = softwarePages[pageKey];
  const overview = softwarePages.overview;
  const content = await getSoftwareSubpageContent(pageKey);
  const pending = entry.status !== "live";

  const title = getLocalized(content.hero.title, locale);
  const lead = getLocalized(content.hero.lead, locale);
  const overviewLabel = getLocalized(overview.navLabel, locale);
  const pageLabel = getLocalized(entry.navLabel, locale);
  const related = [overview, ...visibleSoftwareSubpages()].filter(
    (page) => page.key !== pageKey && isSoftwarePagePublic(page.key),
  );

  return (
    <>
      <SoftwareHero
        locale={locale}
        breadcrumbs={
          <PageBreadcrumbs
            locale={locale}
            items={[
              { label: overviewLabel, routeKey: overview.route },
              { label: pageLabel },
            ]}
            currentUrl={getAbsoluteUrl(entry.route, locale)}
          />
        }
        eyebrow={getLocalized(content.hero.eyebrow, locale)}
        title={title}
        lead={lead}
        shot={content.hero.shot}
        pending={pending}
      />

      {pending && content.pendingNote ? (
        <div className="bg-amber-50 py-4 text-center text-sm text-amber-900">
          {getLocalized(content.pendingNote, locale)}
        </div>
      ) : null}

      <SoftwareSteps
        locale={locale}
        id="sa-fungerar-det"
        title={getLocalized(content.workflow.title, locale)}
        lead={getLocalized(content.workflow.lead, locale)}
        steps={content.workflow.steps}
        pending={pending}
      />

      {content.features.map((feature, index) => (
        <SoftwareFeatureRow
          key={feature.id}
          feature={feature}
          locale={locale}
          index={index + 1}
        />
      ))}

      <SoftwareFaqSection faqs={content.faqs} locale={locale} />
      <SoftwareRelated pages={related} locale={locale} />
      <SoftwareCtaBand locale={locale} />
    </>
  );
}
