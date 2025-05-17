-- CreateTable
CREATE TABLE "TourGuide" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "Experience" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "profilePic" TEXT NOT NULL,

    CONSTRAINT "TourGuide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourGuide" ADD CONSTRAINT "TourGuide_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
