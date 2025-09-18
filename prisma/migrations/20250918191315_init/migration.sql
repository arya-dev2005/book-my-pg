-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "public"."FoodType" AS ENUM ('VEG', 'NON_VEG', 'VEGAN', 'MIXED');

-- CreateEnum
CREATE TYPE "public"."TransportType" AS ENUM ('BUS', 'SHUTTLE', 'TRAIN', 'METRO', 'OTHER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PG" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "facilities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collegeId" TEXT,

    CONSTRAINT "PG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "public"."MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pgId" TEXT,
    "collegeId" TEXT,
    "foodId" TEXT,
    "transportId" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."FoodType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pgId" TEXT,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."TransportType" NOT NULL,
    "route" TEXT,
    "startPoint" TEXT,
    "endPoint" TEXT,
    "fare" DOUBLE PRECISION,
    "schedule" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pgId" TEXT,
    "collegeId" TEXT,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_pgId_key" ON "public"."Wishlist"("userId", "pgId");

-- AddForeignKey
ALTER TABLE "public"."PG" ADD CONSTRAINT "PG_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wishlist" ADD CONSTRAINT "Wishlist_pgId_fkey" FOREIGN KEY ("pgId") REFERENCES "public"."PG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_pgId_fkey" FOREIGN KEY ("pgId") REFERENCES "public"."PG"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "public"."Transport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Food" ADD CONSTRAINT "Food_pgId_fkey" FOREIGN KEY ("pgId") REFERENCES "public"."PG"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transport" ADD CONSTRAINT "Transport_pgId_fkey" FOREIGN KEY ("pgId") REFERENCES "public"."PG"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transport" ADD CONSTRAINT "Transport_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;
