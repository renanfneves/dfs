-- CreateIndex
CREATE INDEX "chat_sessions_agentId_userId_idx" ON "chat_sessions"("agentId", "userId");
