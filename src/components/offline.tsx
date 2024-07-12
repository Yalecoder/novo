import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle, Polygon } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// Função para converter latitude e longitude para coordenadas x e y usando uma projeção simplificada
const convertLatLonToXY = (latitude, longitude) => {
  const x = (longitude + 180) * (width / 360);
  const y = (latitude + 90) * (height / 180);
  return { x, y };
};

const PolygonExample = ({ coordinates, location }) => {

  // Converte o array de coordenadas em uma string no formato "x1,y1 x2,y2 ..."
  const points = coordinates
    .map((coord) => {
      const { x, y } = convertLatLonToXY(coord.latitude, coord.longitude);
      return `${x},${y}`;
    })
    .join(" ");

  console.log({points});

  const { x: currentX, y: currentY } = convertLatLonToXY(
    location?.latitude,
    location?.longitude
  );

  console.log({ currentX, currentY });

  console.log({ coordinates });

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      className="bg-[#F5F5F5] rounded-[20]"
    >
      <Svg
        height={height}
        width={width}
        className="border-black"
        style={{ transform: [{ translateY: 120 }, { translateX: -40 }] }}
      >
        <Polygon
          points={points}
          fill="#5CA439"
          stroke="#5CA439"
          strokeWidth="25"
        />
        {location ? (
          <Circle
            cx={currentX}
            cy={currentY}
            r={8} // Raio do círculo do marcador
            fill="blue" // Cor do círculo do marcador
            stroke="white" // Cor da borda do círculo do marcador
            strokeWidth="2" // Largura da borda do círculo do marcador
          />
        ) : (
          <></>
        )}
      </Svg>
    </View>
  );
};

export default PolygonExample;
