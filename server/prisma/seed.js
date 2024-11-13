import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.favorite.deleteMany();
  await prisma.album.deleteMany();
  await prisma.disk.deleteMany();
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

  // Inserir álbuns com relação N:N com gêneros
  const albums = await Promise.all([
    prisma.album.create({
      data: {
        title: "1989",
        releaseYear: 2014,
        coverImage: "/path/to/1989.jpg",
        description: "Álbum icônico de Taylor Swift",
        artistId: artists[0].id,
        genres: {
          connect: [{ id: genres[0].id }, { id: genres[2].id }], // Pop e Rock
        },
      },
    }),
    prisma.album.create({
      data: {
        title: "Divide",
        releaseYear: 2017,
        coverImage: "/path/to/divide.jpg",
        description: "Álbum de sucesso de Ed Sheeran",
        artistId: artists[1].id,
        genres: {
          connect: [{ id: genres[0].id }], // Pop
        },
      },
    }),
    prisma.album.create({
      data: {
        title: "25",
        releaseYear: 2015,
        coverImage: "/path/to/25.jpg",
        description: "Álbum poderoso de Adele",
        artistId: artists[2].id,
        genres: {
          connect: [{ id: genres[1].id }], // Soul
        },
      },
    }),
  ]);

  // Inserir discos relacionados aos álbuns
  await Promise.all([
    prisma.disk.create({
      data: {
        title: "Disk 1 - 1989",
        coverImage: "/path/to/disk1_1989.jpg",
        artistId: artists[0].id,
        albums: {
          connect: [{ id: albums[0].id }], // Relacionado ao álbum "1989"
        },
      },
    }),
    prisma.disk.create({
      data: {
        title: "Disk 1 - Divide",
        coverImage: "/path/to/disk1_divide.jpg",
        artistId: artists[1].id,
        albums: {
          connect: [{ id: albums[1].id }], // Relacionado ao álbum "Divide"
        },
      },
    }),
    prisma.disk.create({
      data: {
        title: "Disk 1 - 25",
        coverImage: "/path/to/disk1_25.jpg",
        artistId: artists[2].id,
        albums: {
          connect: [{ id: albums[2].id }], // Relacionado ao álbum "25"
        },
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
