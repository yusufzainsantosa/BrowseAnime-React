import styled from "@emotion/styled";
import { useOutletContext, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Tabs, Tab } from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import { CollectionData, LocalStorageWorker } from "../../services/Storage";
import { GET_ANIME_OVERVIEW } from "../../services/Query";
import {
  AnimeCharacters,
  AnimeDetail,
  AnimeStaff,
  PageInfo,
  QueryResponse,
} from "../../interfaces/Type";
import Staff from "../components/Staff";
import TabPanel from "../components/TabPanel";
import Characters from "../components/Characters";
import ModalCollection from "../components/ModalCollection";
import RemoveAnimeColl from "../components/RemoveAnimeColl";
import {
  convertCamel2Title,
  OverviewFormat,
  OverviewList,
} from "../../services/Overview";

interface CharacterPreview {
  pageInfo: PageInfo;
  edges: AnimeCharacters[];
}
interface StaffPreview {
  pageInfo: PageInfo;
  edges: AnimeStaff[];
}
interface AnimeOverview extends AnimeDetail {
  characterPreview: CharacterPreview;
  staffPreview: StaffPreview;
}
interface Response extends QueryResponse {
  data:
    | {
        Media: AnimeOverview;
      }
    | undefined;
}
type UrlParams = {
  mediaId: string;
};

const BannerContainer = styled.div({
  backgroundPosition: "center",
  height: "300px",
  "& > img": {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
});
const MediaDetail = styled.div({
  display: "flex",
  padding: "0 0 40px 0",
});
const OverlayEl = styled.div({
  display: "flex",
  flexDirection: "column",
});
const MediaOverview = styled.div({
  display: "flex",
  "& .overview": {
    height: "fit-content",
    color: "white",
    width: "300px",
    padding: "10px",
    "& > div": {
      marginBottom: "15px",
    },
    "& p": {
      margin: "3px 0",
      fontWeight: "600",
    },
    "& span": {
      fontSize: "13px",
    },
  },
});
const MediaContent = styled.div({
  flexGrow: 1,
  padding: "0 50px 0 0",
  color: "white",
  "& > .anime-title": {
    display: "flex",
    alignItems: "center",
    "& > p": {
      fontSize: "20px",
    },
  },
  "& > span": {
    fontSize: "14px",
  },
});
const ImgContainer = styled.div({
  padding: "0 50px",
  "& > img": {
    position: "relative",
    borderRadius: "10px",
    top: "-100px",
    filter: "drop-shadow(2px 4px 6px black) brightness(90%)",
  },
});
const CardCollectionSelected = {
  cursor: "pointer",
  color: "red",
  transition: "all 0.2s",
  "&:hover": {
    fontSize: "30px",
  },
};
const CardCollection = {
  color: "#ececec",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    fontSize: "30px",
    color: "red",
  },
};

function DetailAnime() {
  const storage = new LocalStorageWorker();
  const params = useParams<UrlParams>();
  const paramsQuery = {
    mediaId: Number(params.mediaId),
    type: "ANIME",
    pageChar: 1,
    pageStaff: 1,
  };
  const [updateLoadingState, updateErrorState] = useOutletContext<any[]>();
  const [modalOpen, updateModalOpen] = useState<boolean>(false);
  const [deleteOpen, updateDeleteOpen] = useState<boolean>(false);
  const [animeDetail, updateAnimeDetail] = useState<AnimeDetail>();
  const [animeCollected, updateAnimeCollected] = useState<CollectionData[]>();
  const [animeCharacters, updateAnimeCharacters] = useState<CharacterPreview>();
  const [animeStaff, updateAnimeStaff] = useState<StaffPreview>();
  const [tabValue, updateTabValue] = useState<number>(0);

  const { loading, data, error, refetch }: Response = useQuery(
    GET_ANIME_OVERVIEW,
    {
      variables: paramsQuery,
      notifyOnNetworkStatusChange: true,
    }
  );

  const getAllCollectionsValues = (): void =>
    updateAnimeCollected(storage.getAllValues());
  const whenModalClosed = (state: boolean): void => {
    getAllCollectionsValues();
    updateModalOpen(state);
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
  const backgroundGradientColor = (urlMedia: string | null): string => {
    if (urlMedia != null)
      return `linear-gradient(transparent, rgb(42 51 78) 100.2%), url(${urlMedia})`;
    return "linear-gradient(45deg, rgb(45 101 138) 0%, rgb(0 0 0 / 33%) 80%)";
  };
  const changeTab = (event: React.SyntheticEvent, tab: number): void =>
    updateTabValue(tab);
  const tabDetailInfo = ({
    characters,
    staff,
  }: {
    characters: CharacterPreview;
    staff: StaffPreview;
  }): JSX.Element => {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "10px",
        }}
      >
        <Tabs value={tabValue} onChange={changeTab} centered>
          <Tab label="Characters" />
          <Tab label="Staff" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Characters
            characters={characters.edges}
            page={characters.pageInfo}
            seeMore={(pageChar: number): any =>
              onSeeMore({ pageChar, pageStaff: 1 })
            }
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Staff
            staff={staff.edges}
            page={staff.pageInfo}
            seeMore={(pageStaff: number): any =>
              onSeeMore({ pageStaff, pageChar: 1 })
            }
          />
        </TabPanel>
      </Box>
    );
  };
  const convert2Html = (html: string): { __html: string } => ({ __html: html });
  const onSeeMore = ({
    pageChar,
    pageStaff,
  }: {
    pageChar: number;
    pageStaff: number;
  }): void => {
    refetch({
      ...paramsQuery,
      pageChar,
      pageStaff,
    });
  };

  useEffect(() => {
    getAllCollectionsValues();
    updateLoadingState(loading);
    if (!loading && data) {
      const { characterPreview, staffPreview, ...mediaDetail } = data.Media;
      updateAnimeDetail(mediaDetail);
      updateAnimeCharacters((prevState: undefined | CharacterPreview) => ({
        pageInfo: characterPreview.pageInfo,
        edges:
          prevState && characterPreview.pageInfo.currentPage > 1
            ? [...prevState.edges, ...characterPreview.edges]
            : characterPreview.edges,
      }));
      updateAnimeStaff((prevState: undefined | StaffPreview) => ({
        pageInfo: staffPreview.pageInfo,
        edges:
          prevState && staffPreview.pageInfo.currentPage > 1
            ? [...prevState.edges, ...staffPreview.edges]
            : staffPreview.edges,
      }));
    }
    if (!loading && error) updateErrorState(true);
    // eslint-disable-next-line
  }, [loading, data, error]);

  return (
    <div>
      {animeDetail ? (
        <React.Fragment>
          <BannerContainer
            className="test"
            style={{
              background: backgroundGradientColor(animeDetail.bannerImage),
              backgroundPosition: "center",
            }}
          />
          <MediaDetail>
            <ImgContainer>
              <img
                src={animeDetail.coverImage.large}
                alt={animeDetail.title.userPreferred.replace(/\s/g, "-")}
              />
            </ImgContainer>
            <MediaContent>
              <div className="anime-title">
                {isAnimeCollected(animeDetail.id) ? (
                  <TurnedInIcon
                    sx={CardCollectionSelected}
                    onClick={() => updateDeleteOpen(true)}
                  />
                ) : (
                  <TurnedInNotIcon
                    sx={CardCollection}
                    onClick={() => updateModalOpen(true)}
                  />
                )}
                <h2>&nbsp;|&nbsp;</h2>
                <p>{animeDetail.title.userPreferred}</p>
              </div>
              <div
                dangerouslySetInnerHTML={convert2Html(animeDetail.description)}
              />
            </MediaContent>
            <ModalCollection
              state={modalOpen}
              closedModal={whenModalClosed}
              collectionData={animeDetail}
            />
            <RemoveAnimeColl
              data={animeDetail}
              state={deleteOpen}
              deleteState={(state) => animeRemovedStatus(state)}
            />
          </MediaDetail>
          <MediaOverview>
            <div className="overview">
              {animeDetail
                ? Object.entries(animeDetail).map(([keyValue, value], index) =>
                    OverviewList.includes(keyValue) ? (
                      <div key={`overview-${index}`}>
                        <p>{convertCamel2Title(keyValue)}</p>
                        <OverlayEl key={`overview-data-${index}`}>
                          {OverviewFormat(keyValue, value)}
                        </OverlayEl>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
            {animeCharacters && animeStaff
              ? tabDetailInfo({
                  characters: animeCharacters,
                  staff: animeStaff,
                })
              : ""}
          </MediaOverview>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
}

export default DetailAnime;
