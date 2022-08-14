import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia } from "@mui/material";

interface MediaCardProps {
  imgUrl: string;
  title: string;
  genres: string[];
  color: string;
}

const CardAnimeEl = {
  width: "100%",
  maxWidth: "250px",
  height: "100%",
  maxHeight: "300px",
  margin: "0 auto",
  transition: "filter 0.5s ease-out",
  filter: "brightness(90%)",
};
const CardAnimeDesc = {
  position: "absolute",
  bottom: 0,
  left: 0,
  backgroundColor: "#00000057",
  color: "white",
  width: "inherit",
  visibility: "hidden",
  padding: 0,
  "& p": {
    margin: 0,
  },
  "& > *": {
    padding: "5px 10px",
  },
};
const CardAnimeGenres = styled.div({
  marginTop: "5px",
  display: "flex",
  flexWrap: "wrap",
  "& span": {
    fontSize: "11px",
    padding: "3px 5px 5px 5px",
    color: "white",
    margin: "4px 2px",
    borderRadius: "10px",
    justifyContent: "center",
  },
});
const CardContainer = {
  borderRadius: "10px",
  cursor: "pointer",
  background:
    "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)",
};
const CardHover = {
  "&:hover": {
    ".img-card": {
      maxHeight: "320px",
      filter: "brightness(55%)",
    },
    ".description": {
      visibility: "visible",
    },
  },
};
const CardOuter = styled.div(CardAnimeEl);

function CardAnime({ imgUrl, color, title, genres }: MediaCardProps) {
  const [mediaTitle, updateMediaTitle] = useState<string>();
  const [mediaGenres, updateMediaGenres] = useState<string[]>();

  useEffect(() => {
    const convertTitle = title.replace(/\s/g, "-");
    const sliceGenres = genres.slice(0, 3);
    updateMediaTitle(convertTitle);
    updateMediaGenres(sliceGenres);
  }, [title, genres]);

  return (
    <CardOuter>
      <Card sx={[CardAnimeEl, CardContainer, CardHover]}>
        <CardMedia
          className="img-card"
          component="img"
          image={imgUrl}
          alt={`${mediaTitle}`}
          sx={CardAnimeEl}
        />
        <CardContent className="description" sx={CardAnimeDesc}>
          <p>{title}</p>
          <CardAnimeGenres>
            {mediaGenres
              ? mediaGenres.map((genre, index) => (
                  <span
                    key={`genre_${index}`}
                    style={{ backgroundColor: color ? color : "grey" }}
                  >
                    {genre}
                  </span>
                ))
              : ""}
          </CardAnimeGenres>
        </CardContent>
      </Card>
    </CardOuter>
  );
}

export default CardAnime;
