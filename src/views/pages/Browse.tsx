import React from "react";
import styled from "@emotion/styled";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Grid, Pagination, Stack } from "@mui/material";

import { GET_ANIME_LIST } from "../../services/Query";
import { CollectionData, LocalStorageWorker } from "../../services/Storage";
import { AnimeInfo, PageInfo, QueryResponse } from "../../interfaces/Type";
import ModalCollection from "../components/ModalCollection";
import RemoveAnimeColl from "../components/RemoveAnimeColl";
import CardAnime from "../components/CardAnime";

interface DataResponse {
  pageInfo: PageInfo;
  media: AnimeInfo[];
}
interface Response extends QueryResponse {
  data:
    | {
        Page: DataResponse;
      }
    | undefined;
}

const TitleEl = styled.div({
  fontSize: "35px",
  fontWeight: "600",
  margin: "10px 0 30px 0",
  "& > span:nth-of-type(1)": {
    color: "#b50e0e",
  },
  "& > span:nth-of-type(2)": {
    color: "white",
  },
});
const Container = styled.div({
  minHeight: "calc(100% - 50px)",
  position: "relative",
  paddingBottom: "50px",
});
const MediaContainer = styled.div({
  maxWidth: "1200px",
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
  paddingRight: "20px",
};

function Browse() {
  const storage = new LocalStorageWorker();
  const [updateLoadingState, updateErrorState] = useOutletContext<any[]>();
  const [deleteOpen, updateDeleteOpen] = useState<boolean>(false);
  const [modalOpen, updateModalOpen] = useState<boolean>(false);
  const [pageDetail, updatePageDetail] = useState<PageInfo>({
    total: 1,
    perPage: 1,
    currentPage: 1,
    lastPage: 1,
    hasNextPage: false,
  });
  const [animeCollected, updateAnimeCollected] = useState<CollectionData[]>();
  const [animeList, updateAnimeList] = useState<AnimeInfo[]>();
  const [animeSelect, updateAnimeSelect] = useState<AnimeInfo>();
  const queryParams = {
    page: 1,
    perPage: 10,
    type: "ANIME",
    sort: ["TRENDING_DESC", "POPULARITY_DESC"],
  };

  const { loading, data, error, refetch }: Response = useQuery(GET_ANIME_LIST, {
    variables: queryParams,
    notifyOnNetworkStatusChange: true,
  });

  const getAllCollectionsValues = (): void =>
    updateAnimeCollected(storage.getAllValues());
  const updatePagination = (page: number): void => {
    if (page > pageDetail.currentPage && !pageDetail.hasNextPage) return;
    refetch({
      ...queryParams,
      page,
    });
  };
  const animeRemovedStatus = (state: boolean): void => {
    if (state) {
      getAllCollectionsValues();
    }
    updateDeleteOpen(false);
  };
  const isAnimeCollected = (id: number) => {
    if (animeCollected)
      return Boolean(animeCollected.find((data) => data.id === id));
    return false;
  };
  const whenModalOpen = (state: boolean, data: AnimeInfo): void => {
    if (state) updateModalOpen(true);
    else updateDeleteOpen(true);
    updateAnimeSelect(data);
  };
  const whenModalClosed = (state: boolean): void => {
    getAllCollectionsValues();
    updateModalOpen(state);
  };

  useEffect(() => {
    getAllCollectionsValues();
    updateLoadingState(loading);
    if (!loading && data) {
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
    if (!loading && error) updateErrorState(true);
    // eslint-disable-next-line
  }, [loading, data, error]);

  return (
    <Container>
      <MediaContainer>
        <TitleEl>
          <span>|</span>&nbsp;
          <span>Trending</span>
        </TitleEl>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={30}>
            {animeList
              ? animeList.map((media: AnimeInfo, index) => (
                  <Grid
                    key={`grid_${index}`}
                    item
                    xs={30}
                    sm={15}
                    md={10}
                    lg={6}
                    sx={GridStyle}
                  >
                    <CardAnime
                      animeData={media}
                      collectionClick={whenModalOpen}
                      isCollected={isAnimeCollected(media.id)}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Box>
      </MediaContainer>
      {animeSelect ? (
        <React.Fragment>
          <ModalCollection
            state={modalOpen}
            closedModal={whenModalClosed}
            collectionData={animeSelect}
          />
          <RemoveAnimeColl
            data={animeSelect}
            state={deleteOpen}
            deleteState={(state) => animeRemovedStatus(state)}
          />
        </React.Fragment>
      ) : (
        ""
      )}
      <PaginationEl>
        <Stack spacing={2}>
          <Pagination
            count={pageDetail.lastPage}
            page={pageDetail.currentPage}
            onChange={(event, page) => updatePagination(page)}
          />
        </Stack>
      </PaginationEl>
    </Container>
  );
}

export default Browse;
