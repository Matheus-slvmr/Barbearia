import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// ⚠️ COLE A SUA URL REAL DO SUPABASE AQUI DENTRO DAS ASPAS
const connectionString = "postgresql://postgres:Postgres040407@db.rqnohxvxgdsqaekdqkmp.supabase.co:5432/postgres";

// Configuramos a conexão direta com o banco
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Agora sim, criamos o Prisma ensinando a ele o caminho!
export const prisma = new PrismaClient({ adapter });