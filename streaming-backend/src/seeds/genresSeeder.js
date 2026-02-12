const { prisma } = require('../config/database');

const genres = [
  {
    name: 'Action',
    slug: 'action',
    description: 'High-energy films with intense sequences, fights, and stunts.',
    color: '#FF4444',
  },
  {
    name: 'Adventure',
    slug: 'adventure',
    description: 'Exciting journeys and explorations in exotic locations.',
    color: '#FFAA00',
  },
  {
    name: 'Animation',
    slug: 'animation',
    description: 'Films created using animation techniques.',
    color: '#FF66CC',
  },
  {
    name: 'Comedy',
    slug: 'comedy',
    description: 'Films designed to amuse and make audiences laugh.',
    color: '#FFFF44',
  },
  {
    name: 'Crime',
    slug: 'crime',
    description: 'Stories about criminals, detectives, and the justice system.',
    color: '#444444',
  },
  {
    name: 'Documentary',
    slug: 'documentary',
    description: 'Non-fiction films documenting real events and people.',
    color: '#44AA44',
  },
  {
    name: 'Drama',
    slug: 'drama',
    description: 'Serious stories focusing on emotional themes and character development.',
    color: '#4444FF',
  },
  {
    name: 'Family',
    slug: 'family',
    description: 'Films suitable for all ages, focusing on family themes.',
    color: '#44FF44',
  },
  {
    name: 'Fantasy',
    slug: 'fantasy',
    description: 'Stories with magical elements and imaginary worlds.',
    color: '#AA44FF',
  },
  {
    name: 'History',
    slug: 'history',
    description: 'Films based on historical events and figures.',
    color: '#AA8844',
  },
  {
    name: 'Horror',
    slug: 'horror',
    description: 'Films designed to frighten and thrill audiences.',
    color: '#880000',
  },
  {
    name: 'Music',
    slug: 'music',
    description: 'Films centered around music and musical performances.',
    color: '#FF00FF',
  },
  {
    name: 'Mystery',
    slug: 'mystery',
    description: 'Stories with puzzles, secrets, and investigations.',
    color: '#444488',
  },
  {
    name: 'Romance',
    slug: 'romance',
    description: 'Stories focused on love and romantic relationships.',
    color: '#FF4488',
  },
  {
    name: 'Sci-Fi',
    slug: 'sci-fi',
    description: 'Stories featuring advanced science and technology.',
    color: '#00FFFF',
  },
  {
    name: 'Thriller',
    slug: 'thriller',
    description: 'Suspenseful stories that keep audiences on edge.',
    color: '#884444',
  },
  {
    name: 'War',
    slug: 'war',
    description: 'Stories about military conflicts and their effects.',
    color: '#666666',
  },
  {
    name: 'Western',
    slug: 'western',
    description: 'Stories set in the American Old West.',
    color: '#AA6633',
  },
];

async function seedGenres() {
  console.log('🏷️ Seeding genres...');

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: genre,
      create: genre,
    });
  }

  console.log(`✅ Seeded ${genres.length} genres`);
}

module.exports = { seedGenres };
