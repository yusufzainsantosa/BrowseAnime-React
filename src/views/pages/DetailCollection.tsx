import React from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Grid, Pagination, Stack } from "@mui/material";

import { PageInfo } from "../../interfaces/Type";
import { CollectionData, LocalStorageWorker } from "../../services/Storage";
import { AnimeInfo } from "../../interfaces/Type";
import RemoveAnimeColl from "../components/RemoveAnimeColl";
import CardAnime from "../components/CardAnime";

type UrlParams = {
  collectionKey: string;
};

const TitleEl = styled.div({
  fontSize: "35px",
  fontWeight: "600",
  margin: "10px 0 30px 0",
  "& > span:nth-of-type(1)": {
    color: "white",
  },
  "& > span:nth-of-type(2)": {
    color: "#b50e0e",
  },
  "& > span:nth-of-type(3)": {
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

function DefaultCollection() {
  const params = useParams<UrlParams>();
  const storage = new LocalStorageWorker();
  const [deleteOpen, updateDeleteOpen] = useState<boolean>(false);
  const [animeList, updateAnimeList] = useState<CollectionData[]>();
  const [animeByPage, updateAnimeByPage] = useState<CollectionData[]>();
  const [animeSelect, updateAnimeSelect] = useState<AnimeInfo>();
  const [pageDetail, updatePageDetail] = useState<PageInfo>({
    total: 1,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
    hasNextPage: false,
  });

  const getAllCollections = (): void => {
    if (params.collectionKey) {
      const dataCollection = storage.get(params.collectionKey);
      const totalPage = Math.ceil(dataCollection.length / 10);
      updateAnimeByPage(dataCollection.slice(0, 10));
      updateAnimeList(dataCollection);
      updatePageDetail((prevState) => ({
        ...prevState,
        total: totalPage,
        lastPage: totalPage,
        hasNextPage: totalPage > 1 ? true : false,
      }));
    }
  };  
  const animeRemovedStatus = (state: boolean): void => {
    if (state) {
      getAllCollections();
    }
    updateDeleteOpen(false);
  };  
  const whenModalOpen = (state: boolean, data: AnimeInfo): void => {
    if (!state) updateDeleteOpen(true);
    updateAnimeSelect(data);
  };
  const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (animeList)
      updateAnimeByPage(animeList.slice((page - 1) * 10, page * 10));
    updatePageDetail((prevState) => ({
      ...prevState,
      currentPage: page,
      hasNextPage: prevState.total > page ? true : false,
    }));
  };

  useEffect(() => {
    getAllCollections();
    // eslint-disable-next-line
  }, [params]);

  return (
    <Container>
      <MediaContainer>
        <TitleEl>
          <span>Collection</span>&nbsp;
          <span>|</span>&nbsp;
          <span>{params.collectionKey}</span>
        </TitleEl>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={30}>
            {animeByPage
              ? animeByPage.map((media: CollectionData, index) => (
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
                      isCollected={true}
                      collectionClick={whenModalOpen}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Box>
      </MediaContainer>
      {animeSelect ? (
        <React.Fragment>
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
            onChange={changePage}
          />
        </Stack>
      </PaginationEl>
    </Container>
  );
}

export default DefaultCollection;
