import { createRoot } from "react-dom/client";
import HelloWorld from "./helloworld";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render
(
    <StrictMode>
        <HelloWorld />
    </StrictMode>,
);