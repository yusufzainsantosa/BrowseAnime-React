type optionalNumber = number | null;
type optionalString = string | null;

export interface AnimeDetail {
  id: number;
  title: {
    userPreferred: string;
    romaji: string;
  };
  coverImage: {
    color: string;
    large: string;
    medium: string;
  };
  bannerImage: optionalString;
  startDate: {
    year: optionalNumber;
    month: optionalNumber;
    day: optionalNumber;
  };
  endDate: {
    year: optionalNumber;
    month: optionalNumber;
    day: optionalNumber;
  };
  description: string;
  season: optionalString;
  seasonYear: optionalNumber;
  type: string;
  format: optionalString;
  status: optionalString;
  episodes: optionalString;
  duration: optionalNumber;
  chapters: optionalNumber;
  volumes: optionalNumber;
  genres: string[];
  synonyms: string[];
  source: string;
  isAdult: boolean;
  isLocked: boolean;
  meanScore: number;
  averageScore: number;
  popularity: number;
  favourites: number;
  isFavouriteBlocked: boolean;
  hashtag: optionalString;
  countryOfOrigin: string;
  isLicensed: boolean;
  isFavourite: boolean;
  isRecommendationBlocked: boolean;
  isReviewBlocked: boolean;
  nextAiringEpisode: {
    airingAt: optionalNumber;
    timeUntilAiring: optionalNumber;
    episode: optionalNumber;
  } | null;
}

export interface Character {
  id: number;
  name: {
    userPreferred: string;
  };
  image: {
    medium: string;
  };
}

export interface Staff extends Character {
  language: string;
}

export interface AnimeCharacters {
  id: number;
  role: optionalString;
  name: optionalString;
  voiceActors: Staff[];
  node: Character;
}

export interface AnimeStaff {
  id: number;
  role: string;
  node: Staff;
}

export interface CharacterPreview {
  pageInfo: PageInfo;
  edges: AnimeCharacters[];
}
export interface StaffPreview {
  pageInfo: PageInfo;
  edges: AnimeStaff[];
}

export interface AnimeInfo {
  id: number;
  title: {
    romaji: string;
    userPreferred: string;
  };
  genres: string[];
  format: optionalString;
  episodes: optionalString;
  coverImage: {
    color: string;
    large: string;
    medium: string;
  };
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface QueryResponse {
  loading: boolean;
  error?: any;
  refetch?: any;
}
