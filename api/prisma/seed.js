const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Limpiar datos previos
  await prisma.movie.deleteMany();
  await prisma.series.deleteMany();

  // Crear película de prueba
  const movie = await prisma.movie.create({
    data: {
      title: 'Interstellar',
      slug: 'interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      shortDescription: 'Sci-Fi masterpiece',
      genres: ['science-fiction', 'drama'],
      releaseYear: 2014,
      director: 'Christopher Nolan',
      writers: ['Jonathan Nolan', 'Christopher Nolan'],
      cast: JSON.stringify(['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']),
      country: 'USA',
      language: 'English',
      duration: 169,
      rating: 8.6,
      ratingCount: 1500000,
      posterUrl: 'https://via.placeholder.com/300x450?text=Interstellar',
      backdropUrl: 'https://via.placeholder.com/1280x720?text=Interstellar',
      videoUrl: 'https://example.com/interstellar.mp4',
      featured: true,
      tmdbId: 24,
      ageRating: 'PG-13',
    },
  });

  // Crear serie de prueba
  const series = await prisma.series.create({
    data: {
      title: 'Breaking Bad',
      slug: 'breaking-bad',
      description: 'A high school chemistry teacher turned meth cook partners with a former student to produce crystal meth.',
      shortDescription: 'Crime drama masterpiece',
      genres: ['drama', 'crime'],
      creator: 'Vince Gilligan',
      cast: JSON.stringify(['Bryan Cranston', 'Aaron Paul']),
      country: 'USA',
      language: 'English',
      rating: 9.5,
      ratingCount: 2000000,
      posterUrl: 'https://via.placeholder.com/300x450?text=BreakingBad',
      backdropUrl: 'https://via.placeholder.com/1280x720?text=BreakingBad',
      featured: true,
      tmdbId: 1396,
      totalSeasons: 5,
      totalEpisodes: 62,
      firstAirDate: new Date('2008-01-20'),
      lastAirDate: new Date('2013-09-29'),
      status: 'ended',
      ageRating: 'TV-MA',
    },
  });

  console.log('✅ Seed completed!');
  console.log('Created movie:', movie.title);
  console.log('Created series:', series.title);
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });