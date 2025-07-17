-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('RELEASED', 'UPCOMING');

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "originalTitle" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "genre" TEXT[],
    "director" TEXT NOT NULL,
    "cast" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "languages" TEXT[],
    "budget" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "profit" TEXT NOT NULL,
    "trailerUrl" TEXT NOT NULL,
    "status" "MovieStatus" NOT NULL DEFAULT 'UPCOMING',
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
