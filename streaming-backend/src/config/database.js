const { PrismaClient } = require('@prisma/client');
const env = require('./env');

// Configure Prisma Client with logging in development
const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
});

// Connection test
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Graceful shutdown
async function disconnect() {
  await prisma.$disconnect();
  console.log('👋 Database disconnected');
}

module.exports = {
  prisma,
  testConnection,
  disconnect,
};
