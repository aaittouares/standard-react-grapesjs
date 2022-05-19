import { initWebEditor } from "../helpers/editor";
import React, { useEffect } from "react";

const WebEditor = () => {
  
  useEffect(() => {
    global.editor = initWebEditor();
  });
  return (
    <React.Fragment>
      <div id="gjs"></div>
    </React.Fragment>
  );
};

export default WebEditor;
