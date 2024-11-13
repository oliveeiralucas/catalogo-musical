export async function up(queryInterface) {
  await queryInterface.bulkInsert("Albums", [
    {
      title: "1989",
      releaseYear: 2014,
      coverImage: "/path/to/1989.jpg",
      artistId: 1, // ID de 'Taylor Swift'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Divide",
      releaseYear: 2017,
      coverImage: "/path/to/divide.jpg",
      artistId: 2, // ID de 'Ed Sheeran'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Albums", null, {});
}
