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

    await prisma.genero.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Gênero deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
