CREATE TABLE "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"slug" jsonb NOT NULL,
	"title" jsonb NOT NULL,
	"excerpt" jsonb NOT NULL,
	"body" jsonb NOT NULL,
	"cover_image" jsonb NOT NULL,
	"faq_ids" text[] DEFAULT '{}' NOT NULL,
	"seo" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"published_at" text NOT NULL,
	"updated_at" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"modified_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"alt" jsonb NOT NULL,
	"content_type" text NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "page_overrides" (
	"key" text PRIMARY KEY NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"modified_at" timestamp with time zone DEFAULT now() NOT NULL
);
