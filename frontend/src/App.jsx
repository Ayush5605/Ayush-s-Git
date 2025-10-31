import React from "react";
import projectRoutes from "./Routes";

function App() {
  // useRoutes() is already called inside projectRoutes(), so just render it here
  return <>{projectRoutes()}</>;
}

export default App;
