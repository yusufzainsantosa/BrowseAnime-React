import styled from "@emotion/styled";
import useBreakpoint from "use-breakpoint";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import { AnimeInfo } from "../../interfaces/Type";

const Container = styled.div({
  color: "white",
  height: "100%",
  fontSize: "14px",
  "& .anime-card": {
    cursor: "pointer",
  },
  "& .anime-card:hover": {
    ".img-card": {
      maxHeight: "320px",
      filter: "brightness(55%)",
    },
    ".description": {
      visibility: "visible",
    },
  },
});
const CardAnimeGenres = styled.div({
  marginTop: "5px",
  display: "flex",
  flexWrap: "wrap",
  "& > div": {
    height: "20px",
    fontSize: "11px",
    color: "white",
    margin: "4px 2px",
  },
});
const CardTag = styled.div({
  fontWeight: 600,
  letterSpacing: "1px",
  backgroundColor: "#ca141b",
  padding: "2px 10px",
  color: "white",
  position: "absolute",
  left: "5px",
  top: "5px",
  width: "fit-content",
  borderRadius: "6px",
});
const TitleEl = styled.p({
  whiteSpace: "nowrap",
  width: "inherit",
  maxWidth: "250px",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
const CardAnimeEl = {
  width: "100%",
  maxWidth: "250px",
  height: "100%",
  maxHeight: "300px",
  filter: "brightness(90%)",
};
const CardCollection = {
  position: "absolute",
  top: "3px",
  right: "3px",
  color: "#ececec",
  transition: "all 0.2s",
  "&:hover": {
    fontSize: "30px",
    color: "red",
  },
};
const CardCollectionSelected = {
  position: "absolute",
  top: "3px",
  right: "3px",
  color: "red",
  transition: "all 0.2s",
  "&:hover": {
    fontSize: "30px",
  },
};
const CardAnimeDesc = {
  position: "absolute",
  bottom: 0,
  left: 0,
  color: "white",
  backgroundColor: "#00000057",
  width: "100%",
  visibility: "hidden",
  padding: "5px 0",
  "& p": {
    margin: 0,
  },
  "& > .format-eps": {
    fontSize: "12px",
    margin: "5px 2px",
  },
  "& > *": {
    padding: "2px 10px",
  },
};
const CardContainer = {
  width: "100%",
  height: "100%",
  filter: "brightness(90%)",
  position: "relative",
  borderRadius: "10px",
  background:
    "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)",
};

const breakpoints = { mobile: 0, nonMobile: 600 };

function CardAnime({
  animeData,
  isCollected,
  collectionClick,
}: {
  animeData: AnimeInfo;
  isCollected: boolean;
  collectionClick: (state: boolean, data: AnimeInfo) => void;
}) {
  const { breakpoint } = useBreakpoint(breakpoints, "mobile", false);
  const { id, coverImage, title, genres, episodes, format } = animeData;
  const [collectionHover, updateCollectionHover] = useState<boolean>(false);
  const [mediaTitle, updateMediaTitle] = useState<string>();
  const [mediaGenres, updateMediaGenres] = useState<string[]>();

  useEffect(() => {
    const convertTitle = title.userPreferred.replace(/\s/g, "-");
    const sliceGenres = genres.slice(0, 3);
    updateMediaTitle(convertTitle);
    updateMediaGenres(sliceGenres);
  }, [title, genres]);

  return (
    <Container>
      <Card
        className="anime-card"
        sx={{
          ...CardContainer,
          maxWidth: breakpoint === "mobile" ? "150px" : "250px",
          maxHeight: breakpoint === "mobile" ? "200px" : "300px",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
          }}
          to={collectionHover ? "#" : `/anime/${id}`}
        >
          <CardMedia
            className="img-card"
            component="img"
            image={
              breakpoint === "mobile" && coverImage.medium
                ? coverImage.medium
                : coverImage.large
            }
            alt={`${mediaTitle}`}
            sx={CardAnimeEl}
          />
          {format ? <CardTag>{format}</CardTag> : ""}
          {isCollected ? (
            <TurnedInIcon
              sx={CardCollectionSelected}
              onClick={() => collectionClick(false, animeData)}
              onMouseOver={() => updateCollectionHover(true)}
              onMouseOut={() => updateCollectionHover(false)}
            />
          ) : (
            <TurnedInNotIcon
              sx={CardCollection}
              onClick={() => collectionClick(true, animeData)}
              onMouseOver={() => updateCollectionHover(true)}
              onMouseOut={() => updateCollectionHover(false)}
            />
          )}
          <CardContent className="description" sx={CardAnimeDesc}>
            <p>{title.userPreferred}</p>
            <div className="format-eps">
              {episodes ? <span>{episodes} episodes</span> : ""}
            </div>
            <CardAnimeGenres>
              {mediaGenres
                ? mediaGenres.map((genre, index) => (
                    <Chip
                      key={`genre_${index}`}
                      label={genre}
                      sx={{
                        backgroundColor: coverImage.color
                          ? coverImage.color
                          : "black",
                      }}
                    />
                  ))
                : ""}
            </CardAnimeGenres>
          </CardContent>
        </Link>
      </Card>
      <TitleEl className="title-element">{title.userPreferred}</TitleEl>
    </Container>
  );
}

export default CardAnime;
