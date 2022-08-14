import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query Page($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: $sort) {
        id
        title {
          romaji
          userPreferred
        }
        genres
        coverImage {
          color
          large
        }
        status
        season
        seasonYear
      }
    }
  }
`;
