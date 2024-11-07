import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; 
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GroupProvider } from "./context/GroupContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GroupProvider>
        <App />
      </GroupProvider>
    </BrowserRouter>
  </StrictMode>
);
