import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "./redux/store";
import { ModalProvider } from "./Common/AlertModal/ModalContext.jsx";
import GlobalModal from "./Common/AlertModal/AlertModal.jsx";
import "./utils/i18.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <BrowserRouter basename="/react">
    <ModalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <App />
          <GlobalModal />
        </PersistGate>
      </Provider>
    </ModalProvider>
  </BrowserRouter>
  // </StrictMode>
);
