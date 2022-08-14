import { Outlet } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";

import Loading from "./views/components/Loading";
import Navbar from "./views/Navbar";
import "./App.css";

const MainContainer = styled.div({
  position: "relative",
  height: "calc(100vh - 62px)",
  paddingTop: "62px",
  overflowY: "auto",
});

function App() {
  const [loadingState, updateLoadingState] = useState<boolean>(true);

  return (
    <div className="App">
      <Navbar />
      <MainContainer>
        {loadingState ? <Loading /> : ""}
        <Outlet context={updateLoadingState} />
      </MainContainer>
    </div>
  );
}

export default App;
