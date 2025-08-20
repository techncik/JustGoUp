-- CreateTable
CREATE TABLE "_UserTickedClimbs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserTickedClimbs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserTickedClimbs_B_index" ON "_UserTickedClimbs"("B");

-- AddForeignKey
ALTER TABLE "_UserTickedClimbs" ADD CONSTRAINT "_UserTickedClimbs_A_fkey" FOREIGN KEY ("A") REFERENCES "Climb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTickedClimbs" ADD CONSTRAINT "_UserTickedClimbs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
