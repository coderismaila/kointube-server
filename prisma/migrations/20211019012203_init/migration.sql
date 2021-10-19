-- CreateIndex
CREATE INDEX "User_id_email_username_idx" ON "User"("id", "email", "username");
