type optionalNumber = number | null;

export interface AnimeInfo {
  id: number;
  title: {
    romaji: string;
    userPreferred: string;
  };
  genres: string[];
  coverImage: {
    color: string;
    large: string;
  };
  status: string;
  season: string | null;
  seasonYear: optionalNumber;
  endDate: {
    year: optionalNumber;
    month: optionalNumber;
    day: optionalNumber;
  };
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}
