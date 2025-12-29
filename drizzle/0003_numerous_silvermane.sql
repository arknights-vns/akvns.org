CREATE INDEX "session_token_idx" ON "session" USING btree ("token");--> statement-breakpoint
CREATE INDEX "session_userId_token_idx" ON "session" USING btree ("user_id","token");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");