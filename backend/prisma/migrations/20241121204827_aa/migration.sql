-- DropForeignKey
ALTER TABLE "DiscoArtista" DROP CONSTRAINT "DiscoArtista_discoId_fkey";

-- DropForeignKey
ALTER TABLE "DiscoGenero" DROP CONSTRAINT "DiscoGenero_discoId_fkey";

-- DropForeignKey
ALTER TABLE "Faixa" DROP CONSTRAINT "Faixa_discoId_fkey";

-- AddForeignKey
ALTER TABLE "Faixa" ADD CONSTRAINT "Faixa_discoId_fkey" FOREIGN KEY ("discoId") REFERENCES "Disco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoArtista" ADD CONSTRAINT "DiscoArtista_discoId_fkey" FOREIGN KEY ("discoId") REFERENCES "Disco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoGenero" ADD CONSTRAINT "DiscoGenero_discoId_fkey" FOREIGN KEY ("discoId") REFERENCES "Disco"("id") ON DELETE CASCADE ON UPDATE CASCADE;
