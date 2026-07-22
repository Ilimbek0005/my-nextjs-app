-- CreateTable
CREATE TABLE "ScheduleItem" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconKey" TEXT NOT NULL DEFAULT 'guests',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ScheduleItem_pkey" PRIMARY KEY ("id")
);
