export async function up(queryInterface) {
  await queryInterface.bulkInsert("Genres", [
    {
      name: "Pop",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Rock",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Hip-Hop",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Genres", null, {});
}
