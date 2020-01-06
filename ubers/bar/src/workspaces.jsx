import { element } from '../lib/style.js';

const render = ({ config, output, error, side, data }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }

  var spaceStyle = (position, space) => {
    var style = {
      height: "23px",
      display: 'inline-block',
      padding: '0 8px'
    }
    
      /* if (position == parseInt(space.focused)) {
          style.borderBottom = '2px solid #c678dd'
          style.background = 'black'
      } */
    return style
  }

  let workspaces = (
    <span style={style}>
      <span style={spaceStyle(1, data)}>
        <i className="fa fa-home"></i>
      </span>
      <span style={spaceStyle(2, data)}>
        <i className="fab fa-chrome"></i>
      </span>
      <span style={spaceStyle(3, data)}>
        <i className="fab fa-opera"></i>
      </span>
      <span style={spaceStyle(4, data)}>
        <i className="fa fa-question"></i>
      </span>
      <span style={spaceStyle(5, data)}>
        <i className="fa fa-question"></i>
      </span>
    </span>
  )

  return workspaces
}

export default render
