import React from "react";
import { render } from "react-dom";
import AutoSizeBackground from "../../src/";
import imgHorizontal from "../../src/img_horizontal.jpg";
import imgVertical from "../../src/img_vertical.png";

const App = () => <AutoSizeBackground src={imgVertical} dtl="vertical" />;

render(<App />, document.getElementById("root"));
