import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polygon , Circle } from 'react-native-svg';

const LineChart = ({ coordinates }) => {
  const points = coordinates.map(point => `${point.longitude},${point.latitude}`).join(' ');

  console.log(coordinates)

  return (
    <View style={{height: "50%", width: "100%"}}>
      <Svg height={500} width={500}>
        <Polygon
          points={points}
          stroke="#FF0000"
          strokeWidth="2"
        />
        {coordinates.map((point, index) => (
          <Circle
            key={index}
            cx={point.longitude}
            cy={point.latitude}
            r="3"
            fill="blue"
          />
        ))}
      </Svg>
    </View>
  );
};

export default LineChart;
