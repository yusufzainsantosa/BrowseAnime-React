import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import Error from "./views/pages/Error";
import Browse from "./views/pages/Browse";
import Collections from "./views/pages/Collections";
import DetailAnime from "./views/pages/DetailAnime";
import DetailCollection from "./views/pages/DetailCollection";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/anime-browse" element={<App />}>
            <Route path="" element={<Browse />} />
            <Route path="anime" element={<DetailAnime />}>
              <Route path=":mediaId" element={<DetailAnime />} />
            </Route>
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:collectionKey" element={<DetailCollection />} />
          </Route>
          <Route path="*" element={<Error code={404} />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
