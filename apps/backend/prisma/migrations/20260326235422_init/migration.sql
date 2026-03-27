-- CreateTable
CREATE TABLE "data" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "data_email_key" ON "data"("email");

-- CreateIndex
CREATE UNIQUE INDEX "data_username_key" ON "data"("username");
