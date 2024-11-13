import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.favorite.deleteMany();
  await prisma.album.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // Inserir gêneros
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: "Pop" } }),
    prisma.genre.create({ data: { name: "Soul" } }),
    prisma.genre.create({ data: { name: "Rock" } }),
  ]);

  // Inserir artistas
  const artists = await Promise.all([
    prisma.artist.create({ data: { name: "Taylor Swift" } }),
    prisma.artist.create({ data: { name: "Ed Sheeran" } }),
    prisma.artist.create({ data: { name: "Adele" } }),
  ]);

  // Inserir álbuns
  const albums = await Promise.all([
    prisma.album.create({
      data: {
        title: "1989",
        releaseYear: 2014,
        coverImage: "/path/to/1989.jpg",
        genreId: genres[0].id, // Pop
        artistId: artists[0].id, // Taylor Swift
      },
    }),
    prisma.album.create({
      data: {
        title: "Divide",
        releaseYear: 2017,
        coverImage: "/path/to/divide.jpg",
        genreId: genres[0].id, // Pop
        artistId: artists[1].id, // Ed Sheeran
      },
    }),
    prisma.album.create({
      data: {
        title: "25",
        releaseYear: 2015,
        coverImage: "/path/to/25.jpg",
        genreId: genres[1].id, // Soul
        artistId: artists[2].id, // Adele
      },
    }),
  ]);

  // Inserir usuários
  const hashedPassword = await bcrypt.hash("password123", 10);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        nickname: "johndoe",
        password: hashedPassword,
        role: "user",
      },
    }),
    prisma.user.create({
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        nickname: "janesmith",
        password: hashedPassword,
        role: "admin",
      },
    }),
    prisma.user.create({
      data: {
        name: "Alice Cooper",
        email: "alice@example.com",
        nickname: "alicecooper",
        password: hashedPassword,
        role: "user",
      },
    }),
  ]);

  // Inserir favoritos
  await Promise.all([
    prisma.favorite.create({
      data: { userId: users[0].id, albumId: albums[0].id },
    }),
    prisma.favorite.create({
      data: { userId: users[1].id, albumId: albums[1].id },
    }),
  ]);

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
