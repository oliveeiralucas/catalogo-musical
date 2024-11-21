import prisma from "../prisma/prismaClient.js";

// Criar um novo artista
export const createArtista = async (req, res) => {
  try {
    const { nome, generosIds, discosIds } = req.body;

    const novoArtista = await prisma.artista.create({
      data: {
        nome,
        generos: {
          create: generosIds.map((generoId) => ({
            genero: { connect: { id: generoId } },
          })),
        },
        discos: {
          create: discosIds.map((discoId) => ({
            disco: { connect: { id: discoId } },
          })),
        },
      },
      include: {
        generos: {
          include: { genero: true },
        },
        discos: {
          include: { disco: true },
        },
      },
    });

    res.status(201).json(novoArtista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todos os artistas
export const getArtistas = async (req, res) => {
  try {
    const { nome, generoNome } = req.query;

    const artistas = await prisma.artista.findMany({
      where: {
        nome: nome ? { contains: nome, mode: "insensitive" } : undefined,
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
        generos: {
          include: { genero: true },
        },
        discos: {
          include: { disco: true },
        },
      },
    });
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um artista por ID
export const getArtistaById = async (req, res) => {
  try {
    const { id } = req.params;
    const artista = await prisma.artista.findUnique({
      where: { id: Number(id) },
      include: {
        generos: {
          include: { genero: true },
        },
        discos: {
          include: { disco: true },
        },
      },
    });
    if (!artista) {
      return res.status(404).json({ error: "Artista não encontrado" });
    }
    res.json(artista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um artista
export const updateArtista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const artistaAtualizado = await prisma.artista.update({
      where: { id: Number(id) },
      data: {
        nome,
      },
    });

    res.json(artistaAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um artista
export const deleteArtista = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.artista.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Artista deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
