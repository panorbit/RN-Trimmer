import * as React from 'react';
import Svg, {Path, Circle, G, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function TrimmerHandler(props) {
  return (
    <Svg
      width={53}
      height={174}
      viewBox="0 0 53 174"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M26.5 168.695V52.677"
        stroke="green"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <Circle cx={26.5} cy={26.5} r={26.5} fill="#403F42" />
      <G filter="url(#prefix__filter0_d)">
        <Circle cx={26.823} cy={26.177} r={11.311} fill="#fff" />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default TrimmerHandler;
