export async function up(queryInterface) {
  await queryInterface.bulkInsert('Users', [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36jTT1c/iZJv1LfRJ87C7Fq', // 'password' criptografada com bcrypt
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36jTT1c/iZJv1LfRJ87C7Fq', // 'password' criptografada
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}
