DO $$ BEGIN
 CREATE TYPE "content_type" AS ENUM('article', 'quiz', 'video');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_progress" (
	"user_id" text NOT NULL,
	"content_id" text NOT NULL,
	"type" "content_type" NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"last_progress_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"percentage" integer,
	"latest_question_id" text,
	CONSTRAINT content_progress_user_id_type_content_id PRIMARY KEY("user_id","type","content_id")
);
