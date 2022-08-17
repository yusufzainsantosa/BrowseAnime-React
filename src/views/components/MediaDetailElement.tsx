import styled from "@emotion/styled";

export const MediaDetailSection = styled.div({
  display: "flex",
  width: "100%",
  maxWidth: "800px",
  margin: "10px auto",
  height: "150px",
  borderRadius: "10px",
  border: "2px solid black",
  ".media-detail-img": {
    width: "130px",
    objectFit: "cover",
    objectPosition: "center",
    height: "100%",
    borderRadius: "10px",
  },
});
export const MediaDetailContent = styled.div({
  flexGrow: 1,
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