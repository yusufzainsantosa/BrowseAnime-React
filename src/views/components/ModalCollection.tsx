import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { AnimeInfo } from "../../interfaces/Type";
import { LocalStorageWorker, IStorageItem } from "../../services/Storage";

const CssTextField = styled(TextField)({
  margin: "0 0 20px 0",
  width: "100%",
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
});
const ErrorNotif = styled.span({
  color: "red",
  fontSize: "12px",
});
const ModalContainer = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  outline: "none",
  padding: "20px",
  "& h3": {
    color: "#3d3d3d",
    margin: "5px 0 20px 0",
  },
};

function ModalCollection({
  state,
  collectionData,
  closedModal,
}: {
  state: boolean;
  collectionData?: AnimeInfo;
  closedModal: (state: boolean) => void;
}) {
  const storage = new LocalStorageWorker();
  const [error, updateError] = useState("");
  const [addClick, updateAddClick] = useState<boolean>(false);
  const [modalOpen, updateModalOpen] = useState<boolean>(false);
  const [collectionName, updateCollectionName] = useState<string>("");
  const [collectionSelect, updateCollectionSelect] = useState<string[]>([]);
  const [collectionList, updateCollectionList] = useState<IStorageItem[]>();

  const getAllCollections = (): void =>
    updateCollectionList(storage.getAllItems());
  const addToStorage = (): void => {
    updateAddClick(true);
    if (error === "" && !setErrorCollection(collectionName, true)) {
      const collections = collectionSelect;
      if (collectionName && !collections.includes(collectionName))
        collections.push(collectionName);
      if (collectionData) {
        const stringifyData = JSON.stringify(collectionData);
        storage.add(collections, stringifyData);
      } else storage.add(collections);
      getAllCollections();
      setModalState(false);
    }
  };
  const handleChange = (event: SelectChangeEvent<typeof collectionSelect>) => {
    const {
      target: { value },
    } = event;
    updateCollectionSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const setErrorCollection = (titleCollection: string, isClicked: boolean) => {
    // eslint-disable-next-line
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChar.test(titleCollection)) {
      updateError("Special characters not allowed");
      return true;
    } else if (
      isClicked &&
      collectionSelect.length === 0 &&
      titleCollection === ""
    ) {
      updateError("Please select or input your collection");
      return true;
    }
    updateError("");
    return false;
  };
  const setCollectionName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setErrorCollection(event.target.value, addClick);
    updateCollectionName(event.target.value);
  };
  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" && error === "") addToStorage();
  };
  const setModalState = (state: boolean) => {
    updateModalOpen(state);
    closedModal(state);
  };

  useEffect(() => {
    getAllCollections();
    updateModalOpen(state);
    updateCollectionName("");
    updateCollectionSelect([]);
    updateError("");
    updateAddClick(false);
    // eslint-disable-next-line
  }, [state]);
  useEffect(() => {
    setErrorCollection(collectionName, addClick);
    // eslint-disable-next-line
  }, [collectionSelect]);

  return (
    <Modal open={modalOpen} onClose={() => setModalState(false)}>
      <Box sx={ModalContainer}>
        <h3>Add Collections</h3>
        <CssTextField
          label="Collection Name"
          id="custom-css-outlined-input"
          error={!!error}
          onChange={setCollectionName}
          onKeyPress={onEnter}
        />
        {collectionData && collectionList && collectionList.length > 0 ? (
          <FormControl sx={{ mb: 2, width: 300 }}>
            <InputLabel>Collection List</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={collectionSelect}
              onChange={handleChange}
              input={<OutlinedInput label="Collection List" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {collectionList.map((collection, index) => (
                <MenuItem key={`select_${index}`} value={collection.key}>
                  <Checkbox
                    checked={collectionSelect.indexOf(collection.key) > -1}
                  />
                  <ListItemText primary={collection.key} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
        {error !== "" ? <ErrorNotif>{error}</ErrorNotif> : ""}
        <Button
          sx={{ float: "right" }}
          color="primary"
          variant="outlined"
          onClick={addToStorage}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalCollection;
