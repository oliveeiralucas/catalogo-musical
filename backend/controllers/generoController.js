import prisma from "../prisma/prismaClient.js";

// Criar um novo gênero
export const createGenero = async (req, res) => {
  try {
    const { nome } = req.body;

    const novoGenero = await prisma.genero.create({
      data: { nome },
    });

    res.status(201).json(novoGenero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todos os gêneros
export const getGeneros = async (req, res) => {
  try {
    const { nome } = req.query;

    const generos = await prisma.genero.findMany({
      where: {
        nome: nome ? { contains: nome, mode: "insensitive" } : undefined,
      },
    });
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um gênero pelo ID
export const getGeneroById = async (req, res) => {
  try {
    const { id } = req.params;

    const genero = await prisma.genero.findUnique({
      where: { id: Number(id) },
      include: {
        artistas: {
          include: {
            artista: true,
          },
        },
        discos: {
          include: {
            disco: true,
          },
        },
      },
    });

    if (!genero) {
      return res.status(404).json({ error: "Gênero não encontrado" });
    }

    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um gênero
export const updateGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const generoAtualizado = await prisma.genero.update({
      where: { id: Number(id) },
      data: { nome },
    });

    res.json(generoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um gênero

export const deleteGenero = async (req, res) => {
  try {
    const { id } = req.params;

    // Remover associações com artistas
    await prisma.artistaGenero.deleteMany({
      where: { generoId: Number(id) },
    });

    // Remover associações com discos
    await prisma.discoGenero.deleteMany({
      where: { generoId: Number(id) },
    });

    // Remover associações com faixas
    await prisma.faixaGenero.deleteMany({
      where: { generoId: Number(id) },
    });

    // Agora podemos excluir o gênero
    await prisma.genero.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Gênero deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
