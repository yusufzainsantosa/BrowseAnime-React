import React from "react";
import styled from "@emotion/styled";

import ReadMore from "./ReadMore";
import { AnimeCharacters, PageInfo } from "../../interfaces/Type";
import {
  BtnMore,
  MediaDetailContent,
  MediaDetailSection,
  MediaDetailsOuter,
} from "./MediaDetailElement";

const CharacterContainer = styled.div({
  display: "flex",
  flexGrow: 1,
});

function Characters({
  characters,
  page,
  seeMore,
}: {
  characters: AnimeCharacters[];
  page: PageInfo;
  seeMore: (page: number) => any;
}) {
  const capitalizeFirstLetter = (string: string): string =>
    string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();

  return (
    <MediaDetailsOuter>
      {characters
        ? characters.map((character, index) => (
            <MediaDetailSection key={`char_${index}`}>
              <CharacterContainer>
                <div className="img-container">
                  <img
                    className="media-detail-img"
                    src={character.node.image.medium}
                    alt={character.node.name.userPreferred}
                  />
                </div>
                <MediaDetailContent>
                  <span>{character.node.name.userPreferred}</span>
                  <span>
                    {character.role
                      ? capitalizeFirstLetter(character.role)
                      : ""}
                  </span>
                </MediaDetailContent>
              </CharacterContainer>
              <CharacterContainer>
                <MediaDetailContent style={{ alignItems: "end" }}>
                  <React.Fragment>
                    {character.voiceActors.length > 0 ? (
                      <span>{character.voiceActors[0].name.userPreferred}</span>
                    ) : (
                      <span>-</span>
                    )}
                    {character.voiceActors.length > 0 ? (
                      <span>{character.voiceActors[0].language}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </React.Fragment>
                </MediaDetailContent>
                <div className="img-container">
                  {character.voiceActors ? (
                    <img
                      className="media-detail-img"
                      src={
                        character.voiceActors.length > 0
                          ? character.voiceActors[0].image.medium
                          : "https://lpm.ulm.ac.id/image/desain/empty.jpg"
                      }
                      alt={
                        character.voiceActors.length > 0
                          ? character.voiceActors[0].name.userPreferred
                          : ""
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </CharacterContainer>
            </MediaDetailSection>
          ))
        : ""}
      {page.hasNextPage ? (
        <BtnMore>
          <ReadMore onClick={() => seeMore(page.currentPage + 1)} />
        </BtnMore>
      ) : (
        ""
      )}
    </MediaDetailsOuter>
  );
}

export default Characters;
