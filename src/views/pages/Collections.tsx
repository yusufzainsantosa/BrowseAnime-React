import styled from "@emotion/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

import { LocalStorageWorker, IStorageItem } from "../../services/Storage";
import ModalCollection from "../components/ModalCollection";
import Folder from "../components/Folder";

const TitleEl = styled.div({
  fontSize: "35px",
  fontWeight: "600",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0 30px 0",
  "& .collection-header": {
    marginBottom: "10px",

    "& span:nth-of-type(1)": {
      color: "#b50e0e",
    },
    "& span:nth-of-type(2)": {
      color: "white",
    },
  },
});
const OuterCollections = styled.div({
  height: "fit-content",
  padding: "20px 30px",
});
const Container = styled.div({
  padding: "15px 0",
  display: "flex",
  flexWrap: "wrap",
  "& .collection-title": {
    color: "white",
    textAlign: "center",
    margin: "5px",
    padding: "0 40px 0 0",
  },
});
const Collection = styled.div({
  position: "relative",
  height: "125px",
  width: "150px",
  margin: "0 40px 0 0",
});
const FolderContainer = styled.div({
  position: "relative",
  marginBottom: "10px",
  "&:hover": {
    ".trash-icon": {
      display: "block",
    },
  },
});
const AddCollection = {
  color: "#bed4f1",
  fontSize: "55px",
  transition:
    "color 0.2s ease, background-color 0.2s ease, transform 0.3s ease",
  "&:hover": {
    stroke: "#bed4f1",
    color: "transparent",
    transform: "rotate(90deg)",
    cursor: "pointer",
    boxShadow: "none",
  },
};
const TrashIcon = {
  color: "#b50e0e",
  position: "absolute",
  right: "10px",
  cursor: "pointer",
  display: "none",
  "&:hover": {
    color: "transparent",
    stroke: "#d10c0c",
  },
};

function Collections() {
  const storage = new LocalStorageWorker();
  const [deleteNotif, updateDeleteNotif] = useState<{
    active: boolean;
    collection: string;
  }>({ active: false, collection: "" });
  const [modalOpen, updateModalOpen] = useState<boolean>(false);
  const [collectionList, updateCollectionList] = useState<IStorageItem[]>();

  const getAllCollections = (): void =>
    updateCollectionList(storage.getAllItems());
  const cancelDelete = (): void =>
    updateDeleteNotif({
      active: false,
      collection: "",
    });
  const confirmDeleteCollection = (collection: string): void =>
    updateDeleteNotif({
      active: true,
      collection,
    });
  const deleteCollection = (): void => {
    storage.remove(deleteNotif.collection);
    getAllCollections();
    updateDeleteNotif({
      active: false,
      collection: "",
    });
  };
  const whenModalClosed = (state: boolean): void => {
    getAllCollections();
    updateModalOpen(state);
  };

  useEffect(() => {
    getAllCollections();
    // eslint-disable-next-line
  }, []);

  return (
    <OuterCollections>
      <TitleEl>
        <div className="collection-header">
          <span>|</span>&nbsp;
          <span>My Collections</span>
        </div>
        <AddCircleIcon
          onClick={() => updateModalOpen(true)}
          sx={AddCollection}
        />
      </TitleEl>
      <Container>
        {collectionList
          ? collectionList.map((item: IStorageItem, index) => {
              return (
                <FolderContainer key={`folder_container_${index}`}>
                  <DeleteIcon
                    className="trash-icon"
                    key={`delete_${index}`}
                    onClick={() => confirmDeleteCollection(item.key)}
                    sx={TrashIcon}
                  />
                  <Collection key={`collection_${index}`}>
                    <Folder
                      key={`folder_${index}`}
                      collection={item.key}
                      files={item.value}
                    ></Folder>
                  </Collection>
                  <p className="collection-title">{item.key}</p>
                </FolderContainer>
              );
            })
          : ""}
      </Container>
      <Dialog
        open={deleteNotif.active}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation": {
            backgroundColor: "#ffffffe6",
          },
        }}
      >
        <DialogContent>
          <p>
            Are you sure you want to delete this collection &nbsp;
            <span style={{ color: "#d43535", fontWeight: 600 }}>
              {deleteNotif.collection}
            </span>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={deleteCollection}
            autoFocus
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ModalCollection state={modalOpen} closedModal={whenModalClosed} />
    </OuterCollections>
  );
}

export default Collections;
