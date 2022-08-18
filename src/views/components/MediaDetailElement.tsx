import styled from "@emotion/styled";

export const MediaDetailSection = styled.div({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "800px",
  margin: "10px auto",
  borderRadius: "10px",
  border: "2px solid black",
  ".img-container": {
    height: "180px",
  },
  ".media-detail-img": {
    width: "130px",
    backgroundColor: "gray",
    objectFit: "cover",
    objectPosition: "center",
    height: "180px",
    borderRadius: "10px",
  },
});
export const MediaDetailContent = styled.div({
  flexGrow: 1,
  height: "160px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: "10px",
});
export const BtnMore = styled.div({
  display: "flex",
  justifyContent: "center",
});
export const MediaDetailsOuter = styled.div({
  padding: "20px",
});
