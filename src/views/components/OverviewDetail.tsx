import styled from "@emotion/styled";

import { AnimeDetail } from "../../interfaces/Type";
import {
  convertCamel2Title,
  OverviewFormat,
  OverviewList,
} from "../../services/Overview";

const OverlayEl = styled.div({
  display: "flex",
  flexDirection: "column",
});

function OverviewDetail({ animeDetail }: { animeDetail: AnimeDetail }) {
  return (
    <div>
      {Object.entries(animeDetail).map(([keyValue, value], index) =>
        OverviewList.includes(keyValue) ? (
          <div key={`overview-${index}`}>
            <p>{convertCamel2Title(keyValue)}</p>
            <OverlayEl key={`overview-data-${index}`}>
              {value ? OverviewFormat(keyValue, value) : <span>-</span>}
            </OverlayEl>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default OverviewDetail;
