import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

async function main() {
  const user = await prisma.data.create({
    data: {
      email: 'testemegal@teste.com',
      username: 'testuser2',
      password: '123456',
    },
  });

  console.log('Criado:', user);

  const users = await prisma.data.findMany();
  console.log('Todos:', users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
