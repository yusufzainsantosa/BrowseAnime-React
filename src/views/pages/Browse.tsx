import styled from "@emotion/styled";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Grid, Pagination, Stack } from "@mui/material";

import { GET_ANIME_LIST } from "../../services/Query";
import { AnimeInfo, PageInfo } from "../../interfaces/Type";
import CardAnime from "../components/CardAnime";

interface DataResponse {
  pageInfo: PageInfo;
  media: AnimeInfo[];
}
interface QueryResponse {
  loading: boolean;
  error?: any;
  refetch?: any;
  data:
    | {
        Page: DataResponse;
      }
    | undefined;
}

const Container = styled.div({
  minHeight: "calc(100% - 50px)",
  position: "relative",
  paddingBottom: "50px",
});
const MediaContainer = styled.div({
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "20px 30px",
});

const PaginationEl = styled.div({
  padding: "5px 0 10px 0",
  position: "absolute",
  bottom: 0,
  width: "100%",
  "& > *": {
    width: "fit-content",
    margin: "0 auto",
  },
  button: {
    color: "white",
  },
});
const GridStyle = {
  padding: "8px",
};

function Browse() {
  const updateLoadingState = useOutletContext<any>();
  const [pageDetail, updatePageDetail] = useState<PageInfo>({
    total: 1,
    perPage: 1,
    currentPage: 1,
    lastPage: 1,
    hasNextPage: false,
  });
  const [animeList, updateAnimeList] = useState<AnimeInfo[]>();
  const queryParams = {
    page: 1,
    perPage: 10,
    sort: ["END_DATE_DESC"],
  };

  const { loading, data, refetch }: QueryResponse = useQuery(GET_ANIME_LIST, {
    variables: queryParams,
    notifyOnNetworkStatusChange: true,
  });

  const updatePagination = (page: number): void => {
    if (page > pageDetail.currentPage && !pageDetail.hasNextPage) return;
    refetch({
      ...queryParams,
      page,
    });
  };

  useEffect(() => {
    updateLoadingState(loading)
    if (data) {
      const { media, pageInfo } = data.Page;
      if (media.length > 0) {
        updateAnimeList(media);
        updatePageDetail(pageInfo);
      } else
        refetch({
          ...queryParams,
          page: pageDetail.currentPage,
        });
    }
    // eslint-disable-next-line
  }, [loading, data]);

  return (
    <Container>
      <MediaContainer>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {animeList
              ? animeList.map((media, index) => (
                  <Grid
                    key={`grid_${index}`}
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    lg={3}
                    sx={GridStyle}
                  >
                    <CardAnime
                      key={`card_${index}`}
                      imgUrl={media.coverImage.large}
                      color={media.coverImage.color}
                      title={media.title.userPreferred}
                      genres={media.genres}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Box>
      </MediaContainer>
      <PaginationEl>
        <Stack spacing={2}>
          <Pagination
            count={pageDetail.total}
            page={pageDetail.currentPage}
            onChange={(event, page) => updatePagination(page)}
            showFirstButton
            showLastButton
          />
        </Stack>
      </PaginationEl>
    </Container>
  );
}

export default Browse;
