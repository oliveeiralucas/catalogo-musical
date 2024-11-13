export async function up(queryInterface) {
  await queryInterface.bulkInsert("Favorites", [
    {
      userId: 1, // ID de 'John Doe'
      albumId: 1, // ID do álbum '1989'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2, // ID de 'Jane Smith'
      albumId: 2, // ID do álbum 'Divide'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Favorites", null, {});
}
