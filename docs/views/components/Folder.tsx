import React from "react";
import { Link } from "react-router-dom";

import { CollectionData } from "../../services/Storage";

import "../../assets/css/Folder.css";

function Folder({
  collection,
  files,
}: {
  collection: string;
  files: CollectionData[] | null;
}) {
  const styleName = ["one", "two", "three", "four"];
  return (
    <Link
      style={{
        textDecoration: "none",
      }}
      to={`/collections/${collection}`}
      key={`keys_${collection}`}
    >
      <div className="folder">
        {files && files.length > 0 ? (
          <React.Fragment>
            {files.slice(0, 4).map((file, index) => (
              <div
                key={`files_${collection}_${file.createdAt}`}
                className={`paper ${styleName[Number(index)]}`}
                style={{
                  backgroundImage: `url(${file.coverImage.large})`,
                  backgroundColor: file.coverImage.color,
                }}
              ></div>
            ))}
            <img
              className="cover-img"
              src={files[0].coverImage.large ? files[0].coverImage.large : ""}
              alt={files[0].title.userPreferred}
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default Folder;
