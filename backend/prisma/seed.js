// prisma/seed.js

import prisma from "./prismaClient.js";

async function main() {
  // Criação de gêneros
  const rock = await prisma.genero.create({
    data: {
      nome: "Rock",
    },
  });

  const pop = await prisma.genero.create({
    data: {
      nome: "Pop",
    },
  });

  const jazz = await prisma.genero.create({
    data: {
      nome: "Jazz",
    },
  });

  // Criação de artistas
  const artista1 = await prisma.artista.create({
    data: {
      nome: "Queen",
      generos: {
        create: [{ genero: { connect: { id: rock.id } } }],
      },
    },
  });

  const artista2 = await prisma.artista.create({
    data: {
      nome: "Michael Jackson",
      generos: {
        create: [{ genero: { connect: { id: pop.id } } }],
      },
    },
  });

  const artista3 = await prisma.artista.create({
    data: {
      nome: "Miles Davis",
      generos: {
        create: [{ genero: { connect: { id: jazz.id } } }],
      },
    },
  });

  // Criação de discos
  const disco1 = await prisma.disco.create({
    data: {
      titulo: "A Night at the Opera",
      anoLancamento: 1975,
      capa: "https://link-da-capa-do-disco1.com",
      artistas: {
        create: [{ artista: { connect: { id: artista1.id } } }],
      },
      generos: {
        create: [{ genero: { connect: { id: rock.id } } }],
      },
      faixas: {
        create: [
          {
            titulo: "Bohemian Rhapsody",
            duracao: 354,
            generos: {
              create: [{ genero: { connect: { id: rock.id } } }],
            },
          },
          {
            titulo: "Love of My Life",
            duracao: 219,
            generos: {
              create: [{ genero: { connect: { id: rock.id } } }],
            },
          },
        ],
      },
    },
  });

  const disco2 = await prisma.disco.create({
    data: {
      titulo: "Thriller",
      anoLancamento: 1982,
      capa: "https://link-da-capa-do-disco2.com",
      artistas: {
        create: [{ artista: { connect: { id: artista2.id } } }],
      },
      generos: {
        create: [{ genero: { connect: { id: pop.id } } }],
      },
      faixas: {
        create: [
          {
            titulo: "Thriller",
            duracao: 358,
            generos: {
              create: [{ genero: { connect: { id: pop.id } } }],
            },
          },
          {
            titulo: "Beat It",
            duracao: 258,
            generos: {
              create: [{ genero: { connect: { id: pop.id } } }],
            },
          },
        ],
      },
    },
  });

  const disco3 = await prisma.disco.create({
    data: {
      titulo: "Kind of Blue",
      anoLancamento: 1959,
      capa: "https://link-da-capa-do-disco3.com",
      artistas: {
        create: [{ artista: { connect: { id: artista3.id } } }],
      },
      generos: {
        create: [{ genero: { connect: { id: jazz.id } } }],
      },
      faixas: {
        create: [
          {
            titulo: "So What",
            duracao: 545,
            generos: {
              create: [{ genero: { connect: { id: jazz.id } } }],
            },
          },
          {
            titulo: "Freddie Freeloader",
            duracao: 589,
            generos: {
              create: [{ genero: { connect: { id: jazz.id } } }],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(() => {
    console.log("Seeds criadas com sucesso!");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Erro ao criar seeds:", error);
    prisma.$disconnect();
    process.exit(1);
  });
