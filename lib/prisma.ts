import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient | null = null;

function getPrismaClient(): PrismaClient {
  if (prismaInstance) return prismaInstance;
  if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
    return prismaInstance;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not defined.");
  }

  const cleanDatabaseUrl = databaseUrl.replace(/^["']|["']$/g, "");

  // Parse connection URL: mysql://user:password@host:port/database
  const matches = cleanDatabaseUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (!matches) {
    throw new Error("Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database");
  }

  const dbConfig = {
    user: matches[1],
    password: matches[2],
    host: matches[3],
    port: parseInt(matches[4], 10),
    database: matches[5],
  };

  const adapter = new PrismaMariaDb(dbConfig);
  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  prismaInstance = client;
  return client;
}

// Export a proxy to defer initialization until the database client is accessed.
// This prevents build-time environment variable issues when database URL is not required.
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
  set(target, prop, value) {
    const client = getPrismaClient();
    return Reflect.set(client, prop, value);
  },
});

export default prisma;
