export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  genre_ids: number[];
  release_year: number;
  director: string;
  cast: string[];
  rating: number;
  poster_url: string;
  backdrop_url: string;
  duration: number;
  video_url: string;
  country: string;
  language: string;
  featured: boolean;
  type: 'movie';
  genres?: string[];
}

export interface Series {
  id: number;
  title: string;
  description: string;
  genre_ids: number[];
  release_year: number;
  creator: string;
  cast: string[];
  rating: number;
  poster_url: string;
  backdrop_url: string;
  total_seasons: number;
  country: string;
  language: string;
  featured: boolean;
  type: 'series';
  genres?: string[];
}

export interface Episode {
  id: number;
  series_id: number;
  season_number: number;
  episode_number: number;
  title: string;
  description: string;
  duration: number;
  video_url: string;
}

export const genres: Genre[] = [
  { id: 1, name: "Acción", description: "Películas llenas de adrenalina, persecuciones y explosiones" },
  { id: 2, name: "Drama", description: "Historias emotivas y profundas sobre la condición humana" },
  { id: 3, name: "Comedia", description: "Risas garantizadas con las mejores comedias" },
  { id: 4, name: "Ciencia Ficción", description: "Viajes espaciales, futuros distópicos y tecnología avanzada" },
  { id: 5, name: "Thriller", description: "Suspense y tensión que te mantendrá al borde del asiento" },
  { id: 6, name: "Romance", description: "Historias de amor que conmueven el corazón" },
  { id: 7, name: "Terror", description: "Películas para los amantes del miedo y lo sobrenatural" },
  { id: 8, name: "Documental", description: "Historias reales que educan e inspiran" },
  { id: 9, name: "Aventura", description: "Viajes épicos y descubrimientos extraordinarios" },
  { id: 10, name: "Animación", description: "Películas animadas para todas las edades" }
];

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    description: "Un hacker descubre la aterradora verdad sobre su realidad y su papel en la guerra contra sus controladores.",
    genre_ids: [4, 1],
    release_year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    rating: 8.7,
    poster_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
    duration: 136,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "movie"
  },
  {
    id: 2,
    title: "Inception",
    description: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de sueños compartidos recibe la tarea inversa: plantar una idea en la mente de un director ejecutivo.",
    genre_ids: [4, 1, 5],
    release_year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    rating: 8.8,
    poster_url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
    duration: 148,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "movie"
  },
  {
    id: 3,
    title: "La La Land",
    description: "Un músico de jazz y una aspirante a actriz se enamoran mientras persiguen sus sueños en Los Ángeles.",
    genre_ids: [6, 2, 3],
    release_year: 2016,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt", "J.K. Simmons"],
    rating: 8.0,
    poster_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 128,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 4,
    title: "Parásite",
    description: "La familia Kim, todos desempleados, se interesa por el estilo de vida de la adinerada familia Park hasta que se ven envueltos en un incidente inesperado.",
    genre_ids: [5, 2, 3],
    release_year: 2019,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    rating: 8.5,
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=1080&fit=crop",
    duration: 132,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    country: "Corea del Sur",
    language: "Coreano",
    featured: true,
    type: "movie"
  },
  {
    id: 5,
    title: "Dune",
    description: "Paul Atreides debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.",
    genre_ids: [4, 9, 1],
    release_year: 2021,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac", "Zendaya"],
    rating: 8.0,
    poster_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
    duration: 155,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "movie"
  },
  {
    id: 6,
    title: "El Padrino",
    description: "El patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio.",
    genre_ids: [2, 5],
    release_year: 1972,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    rating: 9.2,
    poster_url: "https://images.unsplash.com/photo-1594909122849-11daa4e4d2f2?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 175,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 7,
    title: "Pulp Fiction",
    description: "Las vidas de dos sicarios, un boxeador, la esposa de un gánster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.",
    genre_ids: [5, 3],
    release_year: 1994,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    rating: 8.9,
    poster_url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
    duration: 154,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 8,
    title: "El Caballero Oscuro",
    description: "Batman debe enfrentarse al Joker, un criminal caótico que quiere sumir a Gotham City en el caos.",
    genre_ids: [1, 5, 4],
    release_year: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    rating: 9.0,
    poster_url: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop",
    duration: 152,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "movie"
  },
  {
    id: 9,
    title: "Interestelar",
    description: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.",
    genre_ids: [4, 2, 9],
    release_year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    rating: 8.6,
    poster_url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
    duration: 169,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 10,
    title: "Spider-Man: Into the Spider-Verse",
    description: "Miles Morales se convierte en el Spider-Man de su realidad y cruza caminos con sus homólogos de otras dimensiones.",
    genre_ids: [10, 4, 1],
    release_year: 2018,
    director: "Bob Persichetti, Peter Ramsey",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali"],
    rating: 8.4,
    poster_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 117,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 11,
    title: "Titanic",
    description: "Una aristócrata de diecisiete años se enamora de un artista amable pero pobre a bordo del lujoso y desafortunado R.M.S. Titanic.",
    genre_ids: [6, 2],
    release_year: 1997,
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates"],
    rating: 7.9,
    poster_url: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 194,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 12,
    title: "El Señor de los Anillos: El Retorno del Rey",
    description: "Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para distraerlo de Frodo y Sam mientras se acercan al Monte del Destino con el Anillo Único.",
    genre_ids: [9, 4, 1],
    release_year: 2003,
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen", "Orlando Bloom"],
    rating: 9.0,
    poster_url: "https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 201,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    country: "Nueva Zelanda",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 13,
    title: "Forrest Gump",
    description: "Las presidencias de Kennedy y Johnson, los eventos de Vietnam, Watergate y otros eventos históricos se desarrollan desde la perspectiva de un hombre de Alabama.",
    genre_ids: [2, 6],
    release_year: 1994,
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"],
    rating: 8.8,
    poster_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 142,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 14,
    title: "Mad Max: Fury Road",
    description: "En un futuro post-apocalíptico, Max se une a Furiosa para escapar de un señor de la guerra y su ejército.",
    genre_ids: [1, 9, 4],
    release_year: 2015,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
    rating: 8.1,
    poster_url: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 120,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    country: "Australia",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 15,
    title: "Get Out",
    description: "Un joven afroamericano visita la finca de los padres de su novia blanca, donde descubre un oscuro secreto.",
    genre_ids: [5, 7],
    release_year: 2017,
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
    rating: 7.7,
    poster_url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 104,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 16,
    title: "Coco",
    description: "El aspirante a músico Miguel, junto con el tramposo Héctor, se embarcan en un extraordinario viaje a la Tierra de los Muertos.",
    genre_ids: [10, 9, 3],
    release_year: 2017,
    director: "Lee Unkrich, Adrian Molina",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt", "Alanna Ubach"],
    rating: 8.4,
    poster_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 105,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    country: "USA",
    language: "Español/Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 17,
    title: "Blade Runner 2049",
    description: "Un joven blade runner descubre un secreto largamente enterrado que tiene el potencial de sumir lo que queda de la sociedad en el caos.",
    genre_ids: [4, 5, 1],
    release_year: 2017,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
    rating: 8.0,
    poster_url: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 164,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 18,
    title: "Whiplash",
    description: "Un joven baterista de jazz comienza a perder la cordura bajo la tutela de un instructor abusivo.",
    genre_ids: [2, 6],
    release_year: 2014,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
    rating: 8.5,
    poster_url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 107,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 19,
    title: "The Social Network",
    description: "La historia de la creación de Facebook y las disputas legales que siguieron.",
    genre_ids: [2],
    release_year: 2010,
    director: "David Fincher",
    cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake", "Armie Hammer"],
    rating: 7.8,
    poster_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 120,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  },
  {
    id: 20,
    title: "Joker",
    description: "En Gotham City, el comediante fallido Arthur Fleck se sumerge en la locura y se convierte en el criminal conocido como Joker.",
    genre_ids: [2, 5, 1],
    release_year: 2019,
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy"],
    rating: 8.4,
    poster_url: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    duration: 122,
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "movie"
  }
];

export const seriesData: Series[] = [
  {
    id: 101,
    title: "Breaking Bad",
    description: "Un profesor de química de secundaria diagnosticado con cáncer de pulmón se convierte en fabricante de metanfetamina para asegurar el futuro de su familia.",
    genre_ids: [5, 2],
    release_year: 2008,
    creator: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris"],
    rating: 9.5,
    poster_url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop",
    total_seasons: 5,
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "series"
  },
  {
    id: 102,
    title: "Stranger Things",
    description: "Cuando un niño desaparece, un pequeño pueblo descubre un misterio que involucra experimentos secretos, fuerzas sobrenaturales aterradoras y una niña extraña.",
    genre_ids: [4, 5, 7],
    release_year: 2016,
    creator: "Matt Duffer, Ross Duffer",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour"],
    rating: 8.7,
    poster_url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
    total_seasons: 4,
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "series"
  },
  {
    id: 103,
    title: "The Crown",
    description: "Sigue la vida de la Reina Isabel II desde sus años de novia hasta el presente, revelando la historia personal detrás del monarca.",
    genre_ids: [2, 8],
    release_year: 2016,
    creator: "Peter Morgan",
    cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton", "Matt Smith"],
    rating: 8.6,
    poster_url: "https://images.unsplash.com/photo-1594909122849-11daa4e4d2f2?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 5,
    country: "Reino Unido",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 104,
    title: "Game of Thrones",
    description: "Nueve familias nobles luchan por el control de las tierras de Westeros mientras un antiguo enemigo regresa.",
    genre_ids: [9, 2, 1],
    release_year: 2011,
    creator: "David Benioff, D.B. Weiss",
    cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage", "Lena Headey"],
    rating: 9.2,
    poster_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 8,
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "series"
  },
  {
    id: 105,
    title: "The Mandalorian",
    description: "Los viajes de un cazarrecompensas solitario en los confines de la galaxia, lejos de la autoridad de la Nueva República.",
    genre_ids: [4, 9, 1],
    release_year: 2019,
    creator: "Jon Favreau",
    cast: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito", "Katee Sackhoff"],
    rating: 8.7,
    poster_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
    total_seasons: 3,
    country: "USA",
    language: "Inglés",
    featured: true,
    type: "series"
  },
  {
    id: 106,
    title: "Black Mirror",
    description: "Una antología que explora la naturaleza oscura de la tecnología moderna y sus efectos en la sociedad.",
    genre_ids: [4, 5, 2],
    release_year: 2011,
    creator: "Charlie Brooker",
    cast: ["Jesse Plemons", "Cristin Milioti", "Jimmi Simpson", "Michaela Coel"],
    rating: 8.7,
    poster_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 6,
    country: "Reino Unido",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 107,
    title: "The Witcher",
    description: "Geralt de Rivia, un cazador de monstruos mutante, lucha por encontrar su lugar en un mundo donde los humanos son a menudo más perversos que las bestias.",
    genre_ids: [9, 4, 1],
    release_year: 2019,
    creator: "Lauren Schmidt Hissrich",
    cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan", "Joey Batey"],
    rating: 8.0,
    poster_url: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 3,
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 108,
    title: "Money Heist",
    description: "Un grupo de ladrones, liderados por El Profesor, planea el mayor atraco de la historia: imprimir mil millones de euros en la Fábrica Nacional de Moneda y Timbre.",
    genre_ids: [5, 1, 2],
    release_year: 2017,
    creator: "Álex Pina",
    cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño", "Pedro Alonso"],
    rating: 8.2,
    poster_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 5,
    country: "España",
    language: "Español",
    featured: false,
    type: "series"
  },
  {
    id: 109,
    title: "The Boys",
    description: "Un grupo de vigilantes se propone derribar a los superhéroes corruptos que abusan de sus superpoderes.",
    genre_ids: [4, 1, 3],
    release_year: 2019,
    creator: "Eric Kripke",
    cast: ["Karl Urban", "Jack Quaid", "Antony Starr", "Erin Moriarty"],
    rating: 8.7,
    poster_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 4,
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 110,
    title: "Squid Game",
    description: "Cientos de jugadores con problemas de dinero aceptan una invitación extraña para competir en juegos infantiles con altas apuestas.",
    genre_ids: [5, 2, 1],
    release_year: 2021,
    creator: "Hwang Dong-hyuk",
    cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon", "Jung Ho-yeon"],
    rating: 8.0,
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 1,
    country: "Corea del Sur",
    language: "Coreano",
    featured: true,
    type: "series"
  },
  {
    id: 111,
    title: "Chernobyl",
    description: "Dramatización de la catástrofe nuclear de Chernobyl de abril de 1986 y los esfuerzos desesperados por contenerla.",
    genre_ids: [2, 8, 5],
    release_year: 2019,
    creator: "Craig Mazin",
    cast: ["Jared Harris", "Stellan Skarsgård", "Emily Watson", "Jessie Buckley"],
    rating: 9.3,
    poster_url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 1,
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 112,
    title: "The Office",
    description: "Un mockumentary sobre un grupo de trabajadores de oficina comunes donde el día laboral consiste en choques de ego.",
    genre_ids: [3],
    release_year: 2005,
    creator: "Greg Daniels",
    cast: ["Steve Carell", "Rainn Wilson", "John Krasinski", "Jenna Fischer"],
    rating: 9.0,
    poster_url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 9,
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 113,
    title: "Friends",
    description: "Sigue las vidas personales y profesionales de seis amigos de veinte a treinta años que viven en Manhattan.",
    genre_ids: [3, 6],
    release_year: 1994,
    creator: "David Crane, Marta Kauffman",
    cast: ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow", "Matt LeBlanc"],
    rating: 8.9,
    poster_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 10,
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 114,
    title: "Better Call Saul",
    description: "Los eventos que transforman al abogado de poca monta Jimmy McGill en el buscador de problemas Saul Goodman.",
    genre_ids: [5, 2],
    release_year: 2015,
    creator: "Vince Gilligan, Peter Gould",
    cast: ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks", "Patrick Fabian"],
    rating: 8.9,
    poster_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 6,
    country: "USA",
    language: "Inglés",
    featured: false,
    type: "series"
  },
  {
    id: 115,
    title: "Dark",
    description: "La desaparición de dos niños expone las relaciones fracturadas, vidas dobles y el pasado oscuro de cuatro familias.",
    genre_ids: [4, 5, 2],
    release_year: 2017,
    creator: "Baran bo Odar, Jantje Friese",
    cast: ["Louis Hofmann", "Lisa Vicari", "Andreas Pietschmann", "Maja Schöne"],
    rating: 8.7,
    poster_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&h=750&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    total_seasons: 3,
    country: "Alemania",
    language: "Alemán",
    featured: false,
    type: "series"
  }
];

export const episodes: Episode[] = [
  { id: 1001, series_id: 101, season_number: 1, episode_number: 1, title: "Pilot", description: "Walter White, un profesor de química de secundaria, descubre que tiene cáncer terminal.", duration: 58, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 1002, series_id: 101, season_number: 1, episode_number: 2, title: "Cat's in the Bag...", description: "Walt y Jesse intentan limpiar el desastre después del incidente con Emilio y Krazy-8.", duration: 48, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 1003, series_id: 101, season_number: 1, episode_number: 3, title: "...And the Bag's in the River", description: "Walt debe decidir si mata a Krazy-8 o lo libera.", duration: 47, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  { id: 1004, series_id: 101, season_number: 1, episode_number: 4, title: "Cancer Man", description: "Walt finalmente le cuenta a su familia sobre su cáncer.", duration: 47, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: 1005, series_id: 101, season_number: 1, episode_number: 5, title: "Gray Matter", description: "Walt rechaza una oferta de ayuda financiera de sus antiguos socios.", duration: 48, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
  { id: 1006, series_id: 101, season_number: 1, episode_number: 6, title: "Crazy Handful of Nothin'", description: "Walt y Jesse hacen su primer gran trato con Tuco.", duration: 48, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 1007, series_id: 101, season_number: 1, episode_number: 7, title: "A No-Rough-Stuff-Type Deal", description: "Walt y Jesse intentan obtener más pseudoefedrina para su operación.", duration: 47, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
  
  { id: 2001, series_id: 102, season_number: 1, episode_number: 1, title: "The Vanishing of Will Byers", description: "Will Byers desaparece misteriosamente después de una partida de Dungeons & Dragons.", duration: 49, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 2002, series_id: 102, season_number: 1, episode_number: 2, title: "The Weirdo on Maple Street", description: "Lucas, Mike y Dustin intentan hablar con la niña que encontraron.", duration: 56, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 2003, series_id: 102, season_number: 1, episode_number: 3, title: "Holly, Jolly", description: "Nancy se preocupa por Barbara mientras Once tiene flashbacks.", duration: 52, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  { id: 2004, series_id: 102, season_number: 1, episode_number: 4, title: "The Body", description: "Los chicos hacen un plan para encontrar a Will.", duration: 51, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: 2005, series_id: 102, season_number: 1, episode_number: 5, title: "The Flea and the Acrobat", description: "Once intenta contactar a Will mientras Joyce destruye su casa.", duration: 53, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
  { id: 2006, series_id: 102, season_number: 1, episode_number: 6, title: "The Monster", description: "Jonathan y Nancy buscan al monstruo mientras Once roba comida.", duration: 47, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 2007, series_id: 102, season_number: 1, episode_number: 7, title: "The Bathtub", description: "Once es capturada mientras los chicos intentan rescatarla.", duration: 42, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
  { id: 2008, series_id: 102, season_number: 1, episode_number: 8, title: "The Upside Down", description: "Hopper y Joyce intentan comunicarse con Will.", duration: 55, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
  
  { id: 3001, series_id: 104, season_number: 1, episode_number: 1, title: "Winter Is Coming", description: "El Rey Robert Baratheon visita Invernalia para pedirle a Ned Stark que sea su Mano.", duration: 62, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 3002, series_id: 104, season_number: 1, episode_number: 2, title: "The Kingsroad", description: "Ned deja Invernalia con sus hijas mientras Jon Snow se dirige al Muro.", duration: 56, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 3003, series_id: 104, season_number: 1, episode_number: 3, title: "Lord Snow", description: "Ned llega a Desembarco del Rey mientras Daenerys aprende sobre su nuevo esposo.", duration: 58, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  { id: 3004, series_id: 104, season_number: 1, episode_number: 4, title: "Cripples, Bastards, and Broken Things", description: "Ned investiga la muerte de Jon Arryn mientras Tyrion es capturado.", duration: 56, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: 3005, series_id: 104, season_number: 1, episode_number: 5, title: "The Wolf and the Lion", description: "Ned confronta a Cersei mientras Catelyn captura a Tyrion.", duration: 55, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
  { id: 3006, series_id: 104, season_number: 1, episode_number: 6, title: "A Golden Crown", description: "Viserys exige su corona de oro mientras Ned descubre el secreto de los bastardos de Robert.", duration: 53, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 3007, series_id: 104, season_number: 1, episode_number: 7, title: "You Win or You Die", description: "Ned confronta a Cersei sobre sus hijos mientras Drogo promete conquistar Westeros.", duration: 58, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
  { id: 3008, series_id: 104, season_number: 1, episode_number: 8, title: "The Pointy End", description: "Los Lannister atacan mientras los salvajes atacan el campamento de Mormont.", duration: 59, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
  { id: 3009, series_id: 104, season_number: 1, episode_number: 9, title: "Baelor", description: "Ned hace una confesión pública mientras Robb lucha contra los Lannister.", duration: 57, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" },
  { id: 3010, series_id: 104, season_number: 1, episode_number: 10, title: "Fire and Blood", description: "Los Siete Reinos reaccionan a la muerte de Ned Stark.", duration: 53, video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" }
];
