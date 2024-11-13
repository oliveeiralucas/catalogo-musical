export async function up(queryInterface) {
  await queryInterface.bulkInsert("Artists", [
    {
      name: "Taylor Swift",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ed Sheeran",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Artists", null, {});
}
