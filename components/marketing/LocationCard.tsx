import { MapPin } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import type { Location } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LocationCard({
  location,
  locale,
  directionsLabel,
}: {
  location: Location;
  locale: AppLocale;
  directionsLabel: string;
}) {
  return (
    <Card className="p-7">
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-0">
        <MapPin
          className="text-primary mt-0.5 shrink-0"
          size={20}
          aria-hidden="true"
        />
        <CardTitle className="text-base font-semibold">
          {getLocalized(location.name, locale)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-0">
        <address
          dir="ltr"
          className="text-muted-foreground text-body text-start not-italic"
        >
          {location.streetAddress}
          <br />
          {location.postalCode} {location.city}
          <br />
          {location.country}
        </address>
        {location.openingHours && (
          <p className="text-muted-foreground text-body">
            {getLocalized(location.openingHours, locale)}
          </p>
        )}
        <Button
          render={
            <a
              href={location.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          variant="outline"
          size="sm"
          className="w-fit"
        >
          {directionsLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
