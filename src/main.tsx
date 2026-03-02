import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import "./global/index.css";

const clerkPubKey =
  "pk_test_bGFyZ2UtZ29sZGZpc2gtNzkuY2xlcmsuYWNjb3VudHMuZGV2JA";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ClerkProvider>,
);
