import React from "react";
import "./AutoSizeBackground.css";

class AutoSizeBackground extends React.Component {
  static defaultProps = {
    src: null,
    mode: "normal",
  };

  state = {
    innerWidth: 0,
    calcHeight: 0,
    calcWidth: 0,
    innerHeight: 0,
  };

  requestRef = undefined;

  componentDidMount() {
    this.handleResize();
    window.addEventListener(
      "resize",
      () => {
        this.requestRef = requestAnimationFrame(() => this.handleResize());
      },
      {
        passive: true,
      }
    );
  }

  componentWillUnmount() {
    if (this.requestRef) {
      window.cancelAnimationFrame(this.requestRef);
    }

    window.removeEventListener("resize", this.handleResize);

    if (this.resize) {
      this.resize.cancel();
    }
  }

  handleResize = () => {
    const { mode } = this.props;

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const widthRatio = innerWidth / screenWidth;
    const heightRatio = innerHeight / screenHeight;

    let calcWidth = 0;
    let calcHeight = 0;

    if (mode === "sticky") {
      calcWidth = widthRatio * screenWidth;
      calcHeight = heightRatio * screenHeight;
    } else {
      calcWidth = heightRatio * screenWidth;
      calcHeight = widthRatio * screenHeight;
    }

    this.setState({
      innerWidth,
      calcHeight,
      calcWidth,
      innerHeight,
    });
  };

  calculateImgStyle = (mode) => {
    const { innerWidth, calcHeight, calcWidth, innerHeight } = this.state;
    const styleInherit = {
      width: `${innerWidth}px`,
      height: `${calcHeight}px`,
      marginLeft: 0,
      top: `${innerHeight - calcHeight}px`,
      left: 0,
      position: "inherit",
    };
    const styleAbsolute = {
      width: `${calcWidth}px`,
      height: `${innerHeight}px`,
      left: "50%",
      top: 0,
      marginLeft: `${-calcWidth / 2}px`,
      position: "absolute",
    };
    switch (mode) {
      case "vertical":
        return styleInherit;
      default:
        if (calcHeight > innerHeight) {
          return styleInherit;
        }
        return styleAbsolute;
    }
  };

  render() {
    const { children, style, src, mode } = this.props;

    const imageStyle = this.calculateImgStyle(mode);

    return src ? (
      <>
        <div
          id="skin-bg"
          className="auto-size-background-style"
          style={style}
        >
          <img src={src} alt="" style={imageStyle} />
        </div>
        <div  className="auto-size-background-content-style">
          {children}
        </div>
      </>
    ) : (
      <>{children}</>
    );
  }
}

export default AutoSizeBackground;
