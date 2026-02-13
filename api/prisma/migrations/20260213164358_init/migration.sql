-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" VARCHAR(500),
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "releaseYear" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "writers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cast" JSONB NOT NULL DEFAULT '[]',
    "country" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "posterUrl" VARCHAR(500) NOT NULL,
    "posterBlurhash" VARCHAR(100),
    "backdropUrl" VARCHAR(500) NOT NULL,
    "backdropBlurhash" VARCHAR(100),
    "videoUrl" VARCHAR(500) NOT NULL,
    "videoType" TEXT NOT NULL DEFAULT 'hls',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredOrder" INTEGER,
    "plotKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ageRating" TEXT NOT NULL DEFAULT 'PG-13',
    "productionCompany" TEXT,
    "budget" BIGINT,
    "revenue" BIGINT,
    "imdbId" TEXT,
    "tmdbId" INTEGER,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" VARCHAR(500),
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "creator" TEXT NOT NULL,
    "cast" JSONB NOT NULL DEFAULT '[]',
    "country" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "posterUrl" VARCHAR(500) NOT NULL,
    "posterBlurhash" VARCHAR(100),
    "backdropUrl" VARCHAR(500) NOT NULL,
    "backdropBlurhash" VARCHAR(100),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredOrder" INTEGER,
    "totalSeasons" INTEGER NOT NULL,
    "totalEpisodes" INTEGER NOT NULL,
    "plotKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ageRating" TEXT NOT NULL DEFAULT 'PG-13',
    "productionCompany" TEXT,
    "firstAirDate" TIMESTAMP(3) NOT NULL,
    "lastAirDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'returning',
    "tmdbId" INTEGER,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "posterUrl" VARCHAR(500),
    "posterBlurhash" VARCHAR(100),
    "airDate" TIMESTAMP(3),
    "episodeCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" VARCHAR(500),
    "thumbnailBlurhash" VARCHAR(100),
    "duration" INTEGER NOT NULL,
    "airDate" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "videoUrl" VARCHAR(500) NOT NULL,
    "videoType" TEXT NOT NULL DEFAULT 'hls',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "iconUrl" VARCHAR(500),
    "color" VARCHAR(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_carousels" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'custom',
    "genreId" TEXT,
    "sortBy" TEXT NOT NULL DEFAULT 'relevance',
    "sortOrder" TEXT NOT NULL DEFAULT 'desc',
    "limit" INTEGER NOT NULL DEFAULT 20,
    "position" INTEGER NOT NULL,
    "visibleMobile" BOOLEAN NOT NULL DEFAULT true,
    "visibleTv" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_carousels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_content" (
    "id" TEXT NOT NULL,
    "carouselId" TEXT,
    "contentId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(1000),
    "imageUrl" VARCHAR(500) NOT NULL,
    "imageBlurhash" VARCHAR(100),
    "position" INTEGER NOT NULL,
    "ctaText" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_keywords" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "view_analytics" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL DEFAULT 'web',
    "deviceName" TEXT,
    "ipAddress" TEXT,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "view_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" TEXT NOT NULL,
    "fromContentId" TEXT NOT NULL,
    "fromContentType" TEXT NOT NULL,
    "toContentId" TEXT NOT NULL,
    "toContentType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdbId_key" ON "movies"("tmdbId");

-- CreateIndex
CREATE INDEX "movies_featured_idx" ON "movies"("featured");

-- CreateIndex
CREATE INDEX "movies_genres_idx" ON "movies"("genres");

-- CreateIndex
CREATE INDEX "movies_releaseYear_idx" ON "movies"("releaseYear");

-- CreateIndex
CREATE INDEX "movies_rating_idx" ON "movies"("rating");

-- CreateIndex
CREATE INDEX "movies_slug_idx" ON "movies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "series_slug_key" ON "series"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "series_tmdbId_key" ON "series"("tmdbId");

-- CreateIndex
CREATE INDEX "series_featured_idx" ON "series"("featured");

-- CreateIndex
CREATE INDEX "series_genres_idx" ON "series"("genres");

-- CreateIndex
CREATE INDEX "series_rating_idx" ON "series"("rating");

-- CreateIndex
CREATE INDEX "series_slug_idx" ON "series"("slug");

-- CreateIndex
CREATE INDEX "seasons_seriesId_idx" ON "seasons"("seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_seriesId_seasonNumber_key" ON "seasons"("seriesId", "seasonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_slug_key" ON "episodes"("slug");

-- CreateIndex
CREATE INDEX "episodes_seriesId_seasonNumber_episodeNumber_idx" ON "episodes"("seriesId", "seasonNumber", "episodeNumber");

-- CreateIndex
CREATE INDEX "episodes_seasonId_idx" ON "episodes"("seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_seriesId_seasonNumber_episodeNumber_key" ON "episodes"("seriesId", "seasonNumber", "episodeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_slug_key" ON "genres"("slug");

-- CreateIndex
CREATE INDEX "genres_slug_idx" ON "genres"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "featured_carousels_slug_key" ON "featured_carousels"("slug");

-- CreateIndex
CREATE INDEX "featured_carousels_slug_idx" ON "featured_carousels"("slug");

-- CreateIndex
CREATE INDEX "featured_carousels_position_idx" ON "featured_carousels"("position");

-- CreateIndex
CREATE INDEX "featured_content_carouselId_position_idx" ON "featured_content"("carouselId", "position");

-- CreateIndex
CREATE INDEX "featured_content_contentType_contentId_idx" ON "featured_content"("contentType", "contentId");

-- CreateIndex
CREATE INDEX "search_keywords_keyword_idx" ON "search_keywords"("keyword");

-- CreateIndex
CREATE INDEX "search_keywords_contentType_contentId_idx" ON "search_keywords"("contentType", "contentId");

-- CreateIndex
CREATE INDEX "view_analytics_contentId_viewedAt_idx" ON "view_analytics"("contentId", "viewedAt");

-- CreateIndex
CREATE INDEX "view_analytics_deviceType_idx" ON "view_analytics"("deviceType");

-- CreateIndex
CREATE INDEX "recommendations_fromContentId_idx" ON "recommendations"("fromContentId");

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_content" ADD CONSTRAINT "featured_content_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "featured_carousels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
