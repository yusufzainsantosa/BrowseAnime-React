import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

import {
  CollectionByAnimeId,
  LocalStorageWorker,
} from "../../services/Storage";
import { AnimeDetail, AnimeInfo } from "../../interfaces/Type";

function RemoveAnimeColl({
  data,
  state = false,
  deleteState,
}: {
  data: AnimeDetail | AnimeInfo;
  state: boolean;
  deleteState: (value: boolean) => void;
}) {
  const storage = new LocalStorageWorker();
  const [collByAnimeId, UpdateCollByAnimeId] = useState<CollectionByAnimeId>();

  const getCollectionsById = (): void => {
    const collectionsById: CollectionByAnimeId[] = storage.getCollectionsById();
    const findIndex = collectionsById.findIndex((item) => item.id === data.id);
    if (findIndex > -1) {
      UpdateCollByAnimeId(collectionsById[findIndex]);
    }
  };
  const RemoveAnimeColl = () => {
    const stringifyData = JSON.stringify(data);
    if (collByAnimeId) {
      storage.removeItem(collByAnimeId.keys, stringifyData);
      deleteState(true);
    } else {
      deleteState(false);
    }
  };

  useEffect(() => {
    getCollectionsById();
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog
      open={state}
      onClose={() => deleteState(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root.MuiPaper-elevation": {
          backgroundColor: "#fffffff2",
        },
      }}
    >
      <DialogContent>
        <p>
          Are you sure you want to delete &nbsp;
          <span style={{ color: "#d43535", fontWeight: 600 }}>
            {data.title.userPreferred}
          </span>&nbsp;
          from collection
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => deleteState(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => RemoveAnimeColl()}
          autoFocus
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveAnimeColl;
