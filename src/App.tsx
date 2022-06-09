import React, {Fragment} from 'react';
import './App.css';
import AppNavBanner from "./AppNavBanner";
import AppImageBanner from "./AppImageBanner";

function App() {
  return (
      <Fragment>
          <div className={"App"} >
              <AppImageBanner/>
              <AppNavBanner/>
          </div>
      </Fragment>
  );
}

export default App;
