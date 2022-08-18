import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
  query Page(
    $page: Int = 1
    $perPage: Int = 10
    $type: MediaType
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: $type, sort: $sort) {
        id
        title {
          romaji
          userPreferred
        }
        genres
        format
        episodes
        coverImage {
          color
          large
          medium
        }
      }
    }
  }
`;

export const GET_ANIME_OVERVIEW = gql`
  query Overview(
    $mediaId: Int
    $type: MediaType
    $pageChar: Int = 1
    $pageStaff: Int = 1
    $perPage: Int = 5
  ) {
    Media(id: $mediaId, type: $type) {
      id
      title {
        romaji
        userPreferred
      }
      coverImage {
        color
        large
        medium
      }
      bannerImage
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      description
      season
      seasonYear
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      synonyms
      source(version: 3)
      isAdult
      isLocked
      meanScore
      averageScore
      popularity
      favourites
      isFavouriteBlocked
      hashtag
      countryOfOrigin
      isLicensed
      isFavourite
      isRecommendationBlocked
      isFavouriteBlocked
      isReviewBlocked
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      characterPreview: characters(
        perPage: $perPage
        page: $pageChar
        sort: [ROLE, RELEVANCE, ID]
      ) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          id
          role
          name
          voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              medium
            }
          }
          node {
            id
            name {
              userPreferred
            }
            image {
              medium
            }
          }
        }
      }
      staffPreview: staff(
        perPage: $perPage
        page: $pageStaff
        sort: [RELEVANCE, ID]
      ) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          id
          role
          node {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              medium
            }
          }
        }
      }
    }
  }
`;
