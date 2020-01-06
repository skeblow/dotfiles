import { element } from '../lib/style.js';

const render = ({ config, output, error, side, data }) => {
  var style = {
    ...element,
    ...config.style,
    float: side,
  }


  return error ? (
      <span style={style}>!</span>
  ) : (
      <span style={style}>
      <span>{data.usage}</span>
      &nbsp;
      <i className="fa fa-microchip"></i>
      &nbsp;
      {data.temp}
      </span>
  )
}

export default render
