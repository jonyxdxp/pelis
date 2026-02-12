const { prisma } = require('../config/database');

const seriesData = [
  {
    title: 'Breaking Bad',
    slug: 'breaking-bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    shortDescription: 'A chemistry teacher turns to cooking meth to secure his family\'s future.',
    genres: ['Crime', 'Drama', 'Thriller'],
    creator: 'Vince Gilligan',
    cast: [
      { name: 'Bryan Cranston', role: 'Walter White', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { name: 'Aaron Paul', role: 'Jesse Pinkman', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
      { name: 'Anna Gunn', role: 'Skyler White', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
      { name: 'Dean Norris', role: 'Hank Schrader', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    ],
    country: 'USA',
    language: 'English',
    rating: 9.5,
    ratingCount: 1892345,
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop',
    posterBlurhash: 'L9C?%D~qIT?b-;RjRjt757oJodS$',
    backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    backdropBlurhash: 'LDC%@D9tIVM{~qRjRjt757oJodS$',
    featured: true,
    featuredOrder: 1,
    totalSeasons: 5,
    totalEpisodes: 62,
    plotKeywords: ['meth', 'cancer', 'crime', 'transformation'],
    ageRating: 'TV-MA',
    productionCompany: 'Sony Pictures Television',
    firstAirDate: new Date('2008-01-20'),
    lastAirDate: new Date('2013-09-29'),
    status: 'ended',
    imdbId: 'tt0903747',
    tmdbId: 1396,
  },
  {
    title: 'Stranger Things',
    slug: 'stranger-things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    shortDescription: 'Kids face supernatural forces when their friend disappears.',
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    creator: 'Matt Duffer, Ross Duffer',
    cast: [
      { name: 'Millie Bobby Brown', role: 'Eleven', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
      { name: 'Finn Wolfhard', role: 'Mike Wheeler', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { name: 'Winona Ryder', role: 'Joyce Byers', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
      { name: 'David Harbour', role: 'Jim Hopper', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    ],
    country: 'USA',
    language: 'English',
    rating: 8.7,
    ratingCount: 1234567,
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop',
    posterBlurhash: 'L9C?%D~qIT?b-;RjRjt757oJodS$',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop',
    backdropBlurhash: 'LDC%@D9tIVM{~qRjRjt757oJodS$',
    featured: true,
    featuredOrder: 2,
    totalSeasons: 4,
    totalEpisodes: 42,
    plotKeywords: ['80s', 'demogorgon', 'upside down', 'superpowers'],
    ageRating: 'TV-14',
    productionCompany: 'Netflix',
    firstAirDate: new Date('2016-07-15'),
    status: 'returning',
    imdbId: 'tt4574334',
    tmdbId: 66732,
  },
  {
    title: 'Game of Thrones',
    slug: 'game-of-thrones',
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    shortDescription: 'Noble families battle for control of Westeros.',
    genres: ['Action', 'Adventure', 'Drama'],
    creator: 'David Benioff, D.B. Weiss',
    cast: [
      { name: 'Emilia Clarke', role: 'Daenerys Targaryen', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
      { name: 'Kit Harington', role: 'Jon Snow', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { name: 'Peter Dinklage', role: 'Tyrion Lannister', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
      { name: 'Lena Headey', role: 'Cersei Lannister', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
    ],
    country: 'USA',
    language: 'English',
    rating: 9.2,
    ratingCount: 2123456,
    posterUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=750&fit=crop',
    posterBlurhash: 'L9C?%D~qIT?b-;RjRjt757oJodS$',
    backdropUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    backdropBlurhash: 'LDC%@D9tIVM{~qRjRjt757oJodS$',
    featured: true,
    featuredOrder: 3,
    totalSeasons: 8,
    totalEpisodes: 73,
    plotKeywords: ['dragons', 'throne', 'winter', 'war'],
    ageRating: 'TV-MA',
    productionCompany: 'HBO',
    firstAirDate: new Date('2011-04-17'),
    lastAirDate: new Date('2019-05-19'),
    status: 'ended',
    imdbId: 'tt0944947',
    tmdbId: 1399,
  },
  {
    title: 'The Mandalorian',
    slug: 'the-mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    shortDescription: 'A bounty hunter protects a mysterious child in the Star Wars universe.',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    creator: 'Jon Favreau',
    cast: [
      { name: 'Pedro Pascal', role: 'The Mandalorian', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { name: 'Carl Weathers', role: 'Greef Karga', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
      { name: 'Giancarlo Esposito', role: 'Moff Gideon', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    ],
    country: 'USA',
    language: 'English',
    rating: 8.7,
    ratingCount: 567890,
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop',
    posterBlurhash: 'L9C?%D~qIT?b-;RjRjt757oJodS$',
    backdropUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
    backdropBlurhash: 'LDC%@D9tIVM{~qRjRjt757oJodS$',
    featured: true,
    featuredOrder: 4,
    totalSeasons: 3,
    totalEpisodes: 24,
    plotKeywords: ['star wars', 'bounty hunter', 'baby yoda', 'space'],
    ageRating: 'TV-14',
    productionCompany: 'Lucasfilm',
    firstAirDate: new Date('2019-11-12'),
    status: 'returning',
    imdbId: 'tt8111088',
    tmdbId: 82856,
  },
  {
    title: 'Black Mirror',
    slug: 'black-mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    shortDescription: 'Dystopian tales about technology\'s dark side.',
    genres: ['Sci-Fi', 'Drama', 'Thriller'],
    creator: 'Charlie Brooker',
    cast: [
      { name: 'Jesse Plemons', role: 'Various', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { name: 'Cristin Milioti', role: 'Various', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    ],
    country: 'UK',
    language: 'English',
    rating: 8.7,
    ratingCount: 456789,
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=750&fit=crop',
    posterBlurhash: 'L9C?%D~qIT?b-;RjRjt757oJodS$',
    backdropUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    backdropBlurhash: 'LDC%@D9tIVM{~qRjRjt757oJodS$',
    featured: false,
    totalSeasons: 6,
    totalEpisodes: 27,
    plotKeywords: ['technology', 'dystopia', 'future', 'society'],
    ageRating: 'TV-MA',
    productionCompany: 'Netflix',
    firstAirDate: new Date('2011-12-04'),
    status: 'returning',
    imdbId: 'tt2085059',
    tmdbId: 42009,
  },
];

// Episodes for Breaking Bad Season 1
const breakingBadEpisodes = [
  {
    seasonNumber: 1,
    episodeNumber: 1,
    title: 'Pilot',
    slug: 'breaking-bad-s01e01-pilot',
    description: 'Walter White, a 50-year-old high school chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of two years to live.',
    duration: 58,
    airDate: new Date('2008-01-20'),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoType: 'mp4',
  },
  {
    seasonNumber: 1,
    episodeNumber: 2,
    title: "Cat's in the Bag...",
    slug: 'breaking-bad-s01e02-cats-in-the-bag',
    description: 'Walt and Jesse attempt to dispose of the bodies of two rivals.',
    duration: 48,
    airDate: new Date('2008-01-27'),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoType: 'mp4',
  },
  {
    seasonNumber: 1,
    episodeNumber: 3,
    title: "...And the Bag's in the River",
    slug: 'breaking-bad-s01e03-and-the-bags-in-the-river',
    description: 'Walt must decide whether to kill the survivor of the drug deal gone bad.',
    duration: 48,
    airDate: new Date('2008-02-10'),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoType: 'mp4',
  },
];

async function seedSeries() {
  console.log('📺 Seeding series...');

  for (const series of seriesData) {
    const createdSeries = await prisma.series.upsert({
      where: { slug: series.slug },
      update: series,
      create: series,
    });

    // Create seasons and episodes for Breaking Bad
    if (series.slug === 'breaking-bad') {
      for (let seasonNum = 1; seasonNum <= 5; seasonNum++) {
        const season = await prisma.season.upsert({
          where: {
            seriesId_seasonNumber: {
              seriesId: createdSeries.id,
              seasonNumber: seasonNum,
            },
          },
          update: {
            title: `Season ${seasonNum}`,
            episodeCount: seasonNum === 1 ? 7 : seasonNum === 5 ? 16 : 13,
            airDate: new Date(2008 + seasonNum - 1, 0, 20),
          },
          create: {
            seriesId: createdSeries.id,
            seasonNumber: seasonNum,
            title: `Season ${seasonNum}`,
            episodeCount: seasonNum === 1 ? 7 : seasonNum === 5 ? 16 : 13,
            airDate: new Date(2008 + seasonNum - 1, 0, 20),
          },
        });

        // Create episodes for season 1
        if (seasonNum === 1) {
          for (const episodeData of breakingBadEpisodes) {
            await prisma.episode.upsert({
              where: { slug: episodeData.slug },
              update: {
                ...episodeData,
                seriesId: createdSeries.id,
                seasonId: season.id,
              },
              create: {
                ...episodeData,
                seriesId: createdSeries.id,
                seasonId: season.id,
              },
            });
          }
        }
      }
    }
  }

  console.log(`✅ Seeded ${seriesData.length} series`);
}

module.exports = { seedSeries };
