import prisma from "../prisma/prismaClient.js";

// Criar um novo disco
export const createDisco = async (req, res) => {
  try {
    const { titulo, anoLancamento, capa, faixas, artistasIds, generosIds } =
      req.body;

    const novoDisco = await prisma.disco.create({
      data: {
        titulo,
        anoLancamento,
        capa,
        faixas: {
          create: faixas, // faixas é um array de objetos { titulo, duracao }
        },
        artistas: {
          create: artistasIds.map((artistaId) => ({
            artista: { connect: { id: artistaId } },
          })),
        },
        generos: {
          create: generosIds.map((generoId) => ({
            genero: { connect: { id: generoId } },
          })),
        },
      },
      include: {
        faixas: true,
        artistas: {
          include: {
            artista: true,
          },
        },
        generos: {
          include: {
            genero: true,
          },
        },
      },
    });

    res.status(201).json(novoDisco);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todos os discos
export const getDiscos = async (req, res) => {
  try {
    const { titulo, artistaNome, generoNome } = req.query;

    const discos = await prisma.disco.findMany({
      where: {
        titulo: titulo ? { contains: titulo, mode: "insensitive" } : undefined,
        artistas: artistaNome
          ? {
              some: {
                artista: {
                  nome: { contains: artistaNome, mode: "insensitive" },
                },
              },
            }
          : undefined,
        generos: generoNome
          ? {
              some: {
                genero: {
                  nome: { contains: generoNome, mode: "insensitive" },
                },
              },
            }
          : undefined,
      },
      include: {
        faixas: true,
        artistas: {
          include: { artista: true },
        },
        generos: {
          include: { genero: true },
        },
      },
    });
    res.json(discos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um disco por ID
export const getDiscoById = async (req, res) => {
  try {
    const { id } = req.params;
    const disco = await prisma.disco.findUnique({
      where: { id: Number(id) },
      include: {
        faixas: true,
        artistas: {
          include: { artista: true },
        },
        generos: {
          include: { genero: true },
        },
      },
    });
    if (!disco) {
      return res.status(404).json({ error: "Disco não encontrado" });
    }
    res.json(disco);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandomDiscos = async (req, res) => {
  try {
    const quantidade = parseInt(req.query.quantidade) || 5; // Quantidade de discos aleatórios
    const discos = await prisma.disco.findMany({
      take: quantidade,
      include: {
        artistas: {
          include: {
            artista: true,
          },
        },
      },
    });

    // Embaralhar os discos
    discos.sort(() => Math.random() - 0.5);

    res.json(discos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter os últimos discos lançados
export const getLatestDiscos = async (req, res) => {
  try {
    const quantidade = parseInt(req.query.quantidade) || 5;
    const discos = await prisma.disco.findMany({
      take: quantidade,
      orderBy: {
        anoLancamento: "desc",
      },
      include: {
        artistas: {
          include: {
            artista: true,
          },
        },
      },
    });
    res.json(discos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter discos populares
export const getPopularDiscos = async (req, res) => {
  try {
    const quantidade = parseInt(req.query.quantidade) || 5;
    const discos = await prisma.disco.findMany({
      take: quantidade,
      orderBy: {
        popularidade: "desc",
      },
      include: {
        artistas: {
          include: {
            artista: true,
          },
        },
      },
    });
    res.json(discos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um disco
export const updateDisco = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, anoLancamento, capa } = req.body;

    const discoAtualizado = await prisma.disco.update({
      where: { id: Number(id) },
      data: {
        titulo,
        anoLancamento,
        capa,
      },
    });

    res.json(discoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um disco
export const deleteDisco = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDisco = await prisma.disco.delete({
      where: { id: Number(id) }, // Certifique-se de que o ID é convertido para número
    });

    if (!deletedDisco) {
      return res.status(404).json({ error: "Disco não encontrado." });
    }

    res.json({ message: "Disco removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover disco:", error);
    res.status(500).json({ error: "Erro ao remover disco." });
  }
};
