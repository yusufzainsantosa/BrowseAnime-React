import React from "react";

import ReadMore from "./ReadMore";
import { AnimeCharacters, PageInfo } from "../../interfaces/Type";
import {
  BtnMore,
  MediaDetailContent,
  MediaDetailSection,
  MediaDetailsOuter,
} from "./MediaDetailElement";

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
              <div>
                <img
                  className="media-detail-img"
                  src={character.node.image.medium}
                  alt={character.node.name.userPreferred}
                />
              </div>
              <MediaDetailContent>
                <span>{character.node.name.userPreferred}</span>
                <span>
                  {character.role ? capitalizeFirstLetter(character.role) : ""}
                </span>
              </MediaDetailContent>
              <MediaDetailContent style={{ alignItems: "end" }}>
                {character.voiceActors ? (
                  <React.Fragment>
                    <span>{character.voiceActors[0].name.userPreferred}</span>
                    <span>{character.voiceActors[0].language}</span>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </MediaDetailContent>
              <div>
                {character.voiceActors ? (
                  <img
                    className="media-detail-img"
                    src={character.voiceActors[0].image.medium}
                    alt={character.voiceActors[0].name.userPreferred}
                  />
                ) : (
                  ""
                )}
              </div>
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
