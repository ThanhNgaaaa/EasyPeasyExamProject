import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Snowfall from "react-snowfall";
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalStyle>
      <BrowserRouter>
        {/* <div style={{ height: "100%", width: "100%", position: "relative" }}> */}
          {/* <Snowfall color="#F2AFEF" snowflakeCount={80} /> */}
          {/* images={imagessnow} */}
          <App />
        {/* </div> */}
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>,
);
reportWebVitals();
