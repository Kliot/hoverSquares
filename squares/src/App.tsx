import React from "react";
import "./App.css";
import SquaresWrapper from "./components/SquaresWrapper";
import Theme from "./Theme";

function App() {
  return (
    <Theme>
      <div className="App">
        <SquaresWrapper></SquaresWrapper>
      </div>
    </Theme>
  );
}

export default App;
