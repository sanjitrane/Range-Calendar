import { createRoot } from "react-dom/client";
import App from "./src/App";

const domNode = document.getElementById('root');
const root = createRoot(domNode)

root.render(
  <App/>
)