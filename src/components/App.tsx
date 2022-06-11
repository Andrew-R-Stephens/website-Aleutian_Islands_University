import React, {Fragment} from 'react';
import NavBanner from "./NavBanner";
import ImageBanner from "./ImageBanner";
import {Router} from "react-router-dom";

function App() {
  return (
      <Fragment>
          <div>
              <ImageBanner className={"Banner-logo"} />
              <NavBanner/>
          </div>
      </Fragment>
  );
}

export default App;
