/*
  Warnings:

  - The values [INTERVIEW] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [NO_SHOW] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PROCESSING,SUCCEEDED,REFUNDED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ONGOING] on the enum `ScheduleStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cancellationReason` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `cancelledAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryRestrictions` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `cuisine` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `learningPoints` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiptUrl` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `refundAmount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `refundId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `refundReason` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `refundedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSessionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `StaffApplication` table. All the data in the column will be lost.
  - You are about to drop the column `certificates` on the `StaffApplication` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `StaffApplication` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioDescription` on the `StaffApplication` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioImages` on the `StaffApplication` table. All the data in the column will be lost.
  - You are about to drop the column `specialties` on the `StaffApplication` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ActivityLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEmailPreference` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `StaffApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."StaffApplication" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "StaffApplication" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "public"."ApplicationStatus_old";
ALTER TABLE "StaffApplication" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PENDING', 'PAID', 'FAILED');
ALTER TABLE "public"."Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ScheduleStatus_new" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Schedule" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Schedule" ALTER COLUMN "status" TYPE "ScheduleStatus_new" USING ("status"::text::"ScheduleStatus_new");
ALTER TYPE "ScheduleStatus" RENAME TO "ScheduleStatus_old";
ALTER TYPE "ScheduleStatus_new" RENAME TO "ScheduleStatus";
DROP TYPE "public"."ScheduleStatus_old";
ALTER TABLE "Schedule" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropIndex
DROP INDEX "public"."Payment_stripePaymentIntentId_idx";

-- DropIndex
DROP INDEX "public"."Payment_stripePaymentIntentId_key";

-- DropIndex
DROP INDEX "public"."Payment_stripeSessionId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "cancellationReason",
DROP COLUMN "cancelledAt",
DROP COLUMN "dietaryRestrictions";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "cuisine",
DROP COLUMN "images",
DROP COLUMN "ingredients",
DROP COLUMN "learningPoints";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
DROP COLUMN "receiptUrl",
DROP COLUMN "refundAmount",
DROP COLUMN "refundId",
DROP COLUMN "refundReason",
DROP COLUMN "refundedAt",
DROP COLUMN "stripePaymentIntentId",
DROP COLUMN "stripeSessionId";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "notes";

-- AlterTable
ALTER TABLE "StaffApplication" DROP COLUMN "address",
DROP COLUMN "certificates",
DROP COLUMN "dateOfBirth",
DROP COLUMN "portfolioDescription",
DROP COLUMN "portfolioImages",
DROP COLUMN "specialties",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "dateOfBirth";

-- DropTable
DROP TABLE "public"."ActivityLog";

-- DropTable
DROP TABLE "public"."EmailLog";

-- DropTable
DROP TABLE "public"."EmailSchedule";

-- DropTable
DROP TABLE "public"."EmailTemplate";

-- DropTable
DROP TABLE "public"."Review";

-- DropTable
DROP TABLE "public"."SystemSetting";

-- DropTable
DROP TABLE "public"."UserEmailPreference";

-- DropEnum
DROP TYPE "public"."EmailStatus";

-- DropEnum
DROP TYPE "public"."EmailType";

-- CreateIndex
CREATE INDEX "Staff_active_idx" ON "Staff"("active");
