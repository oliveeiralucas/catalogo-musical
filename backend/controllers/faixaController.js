import prisma from "../prisma/prismaClient.js";

// Criar uma nova faixa
export const createFaixa = async (req, res) => {
  try {
    const { titulo, duracao, discoId, generosIds } = req.body;

    const novaFaixa = await prisma.faixa.create({
      data: {
        titulo,
        duracao,
        disco: discoId ? { connect: { id: discoId } } : undefined,
        generos: {
          create: generosIds.map((generoId) => ({
            genero: { connect: { id: generoId } },
          })),
        },
      },
      include: {
        disco: true,
        generos: {
          include: { genero: true },
        },
      },
    });

    res.status(201).json(novaFaixa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todas as faixas
export const getFaixas = async (req, res) => {
  try {
    const faixas = await prisma.faixa.findMany({
      include: {
        disco: true,
        generos: {
          include: { genero: true },
        },
      },
    });
    res.json(faixas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma faixa
export const updateFaixa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, duracao } = req.body;

    const faixaAtualizada = await prisma.faixa.update({
      where: { id: Number(id) },
      data: {
        titulo,
        duracao,
      },
    });

    res.json(faixaAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar uma faixa
export const deleteFaixa = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.faixa.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Faixa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
