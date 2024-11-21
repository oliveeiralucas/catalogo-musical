-- CreateTable
CREATE TABLE "Disco" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "capa" TEXT,

    CONSTRAINT "Disco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Artista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faixa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "discoId" INTEGER,

    CONSTRAINT "Faixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscoArtista" (
    "discoId" INTEGER NOT NULL,
    "artistaId" INTEGER NOT NULL,

    CONSTRAINT "DiscoArtista_pkey" PRIMARY KEY ("discoId","artistaId")
);

-- CreateTable
CREATE TABLE "DiscoGenero" (
    "discoId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,

    CONSTRAINT "DiscoGenero_pkey" PRIMARY KEY ("discoId","generoId")
);

-- CreateTable
CREATE TABLE "ArtistaGenero" (
    "artistaId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,

    CONSTRAINT "ArtistaGenero_pkey" PRIMARY KEY ("artistaId","generoId")
);

-- CreateTable
CREATE TABLE "FaixaGenero" (
    "faixaId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,

    CONSTRAINT "FaixaGenero_pkey" PRIMARY KEY ("faixaId","generoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "Genero"("nome");

-- AddForeignKey
ALTER TABLE "Faixa" ADD CONSTRAINT "Faixa_discoId_fkey" FOREIGN KEY ("discoId") REFERENCES "Disco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoArtista" ADD CONSTRAINT "DiscoArtista_discoId_fkey" FOREIGN KEY ("discoId") REFERENCES "Disco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoArtista" ADD CONSTRAINT "DiscoArtista_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoGenero" ADD CONSTRAINT "DiscoGenero_discoId_fkey" FOREIGN KEY ("discoId") REFERENCES "Disco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscoGenero" ADD CONSTRAINT "DiscoGenero_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistaGenero" ADD CONSTRAINT "ArtistaGenero_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistaGenero" ADD CONSTRAINT "ArtistaGenero_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaixaGenero" ADD CONSTRAINT "FaixaGenero_faixaId_fkey" FOREIGN KEY ("faixaId") REFERENCES "Faixa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaixaGenero" ADD CONSTRAINT "FaixaGenero_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
