import ReadMore from "./ReadMore";
import { AnimeStaff, PageInfo } from "../../interfaces/Type";
import {
  BtnMore,
  MediaDetailContent,
  MediaDetailSection,
  MediaDetailsOuter,
} from "./MediaDetailElement";

function Staff({
  staff,
  page,
  seeMore,
}: {
  staff: AnimeStaff[];
  page: PageInfo;
  seeMore: (page: number) => any;
}) {
  const capitalizeFirstLetter = (string: string): string =>
    string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();

  return (
    <MediaDetailsOuter>
      {staff
        ? staff.map((data, index) => (
            <MediaDetailSection key={`staf_${index}`}>
              <div>
                <img
                  className="media-detail-img"
                  src={data.node.image.medium}
                  alt={data.node.name.userPreferred}
                />
              </div>
              <MediaDetailContent>
                <span>{data.node.name.userPreferred}</span>
                <span>
                  {data.role ? capitalizeFirstLetter(data.role) : ""}
                </span>
              </MediaDetailContent>
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

export default Staff;
