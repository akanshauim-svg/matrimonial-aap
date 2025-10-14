-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "age" INTEGER,
    "location" TEXT,
    "profession" TEXT,
    "bio" TEXT,
    "skills" TEXT,
    "imageUrl" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "partnerName" TEXT NOT NULL,
    "storyText" TEXT NOT NULL,
    "dateOfMatch" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);



CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");



ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
