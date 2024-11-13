import prisma from "../lib/db.js";

const searchController = {
  async universalSearch(req, res) {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ error: "Search term is required" });
    }

    try {
      const numericTerm = parseInt(term, 10); // Tenta converter o termo para número

      // Consultas em cada tabela
      const albums = await prisma.album.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            ...(isNaN(numericTerm) ? [] : [{ releaseYear: numericTerm }]),
          ],
        },
      });

      const artists = await prisma.artist.findMany({
        where: {
          name: { contains: term, mode: "insensitive" },
        },
      });

      const genres = await prisma.genre.findMany({
        where: {
          name: { contains: term, mode: "insensitive" },
        },
      });

      // Combinar os resultados e filtrar somente os não vazios
      const results = {};
      if (albums.length > 0) results.albums = albums;
      if (artists.length > 0) results.artists = artists;
      if (genres.length > 0) results.genres = genres;

      // Responder com os resultados filtrados ou mensagem de nenhum resultado encontrado
      if (Object.keys(results).length === 0) {
        return res.json({ message: "Nenhum resultado foi encontrado" });
      }

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to perform search" });
    }
  },
};

export default searchController;
