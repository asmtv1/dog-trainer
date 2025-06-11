/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `TrainingDay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainingDay" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ActivityType";

-- CreateIndex
CREATE UNIQUE INDEX "Course_type_key" ON "Course"("type");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingDay_dayNumber_type_key" ON "TrainingDay"("dayNumber", "type");
