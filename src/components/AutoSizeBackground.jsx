import React from 'react'
// import classNames from 'classnames'
// import styles from './AutoSizeBackground.css'
import './AutoSizeBackground.css'

class AutoSizeBackground extends React.Component {

  static defaultProps = {
    src: null,
    wrapClassName: '',
    className: '',
  }

  state = {
    innerWidth: 0,
    calcHeight: 0,
    calcWidth: 0,
    innerHeight: 0,
  }

  requestRef = undefined

  componentDidMount() {
    this.handleResize()
    window.addEventListener(
      'resize',
      () => {
        this.requestRef = requestAnimationFrame(() => this.handleResize())
      },
      {
        passive: true,
      }
    )
  }

  componentWillUnmount() {
    if (this.requestRef) {
      window.cancelAnimationFrame(this.requestRef)
    }

    window.removeEventListener('resize', this.handleResize)

    if (this.resize) {
      this.resize.cancel()
    }
  }

  handleResize = () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

    const widthRatio = innerWidth / screenWidth
    const heightRatio = innerHeight / screenHeight

    const calcWidth = heightRatio * screenWidth
    const calcHeight = widthRatio * screenHeight

    this.setState({
      innerWidth,
      calcHeight,
      calcWidth,
      innerHeight,
    })
  }

  render() {

    const {
      innerWidth,
      calcHeight,
      calcWidth,
      innerHeight,
    } = this.state

    const {
      children,
      wrapClassName,
      className,
      style,
      src,
    } = this.props

    const imageStyle =
      calcHeight > innerHeight ? {
        width: `${innerWidth}px`,
        height: `${calcHeight}px`,
        marginLeft: 0,
        top: `${innerHeight - calcHeight}px`,
        left: 0,
        position: 'inherit',
      } : {
        width: `${calcWidth}px`,
        height: `${innerHeight}px`,
        left: '50%',
        top: 0,
        marginLeft: `${-calcWidth / 2}px`,
        position: 'absolute',
      }

    // const wrapCls = classNames(styles.bg, wrapClassName)

    // const cls = classNames(styles.content, className)

    return src ? (
      <>
        <div
          id="skin-bg"
          // className={wrapCls}
          className="auto-size-background-style"
          style={style}
        >
          <img
            src={src}
            alt=""
            style={imageStyle}
          />
        </div>
        {/* <div className={cls}> */}
        <div className="auto-size-background-content-style">
          {children}
        </div>
      </>
    ) : (
      <>{children}</>
    )
  }
}

export default AutoSizeBackground