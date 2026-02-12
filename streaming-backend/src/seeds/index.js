const { prisma } = require('../config/database');
const { seedGenres } = require('./genresSeeder');
const { seedMovies } = require('./moviesSeeder');
const { seedSeries } = require('./seriesSeeder');

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed in order: genres first, then movies and series
    await seedGenres();
    await seedMovies();
    await seedSeries();

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
