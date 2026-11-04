import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GRID_SIZE = 40;

export const GridBackground: React.FC = () => {
  const horizontalLines = [];
  const verticalLines = [];

  for (let y = 0; y < SCREEN_HEIGHT; y += GRID_SIZE) {
    horizontalLines.push(
      <Line
        key={`h-${y}`}
        x1="0"
        y1={y}
        x2={SCREEN_WIDTH}
        y2={y}
        stroke="#F0F4F8"
        strokeWidth="1"
      />
    );
  }

  for (let x = 0; x < SCREEN_WIDTH; x += GRID_SIZE) {
    verticalLines.push(
      <Line
        key={`v-${x}`}
        x1={x}
        y1="0"
        x2={x}
        y2={SCREEN_HEIGHT}
        stroke="#F0F4F8"
        strokeWidth="1"
      />
    );
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        {horizontalLines}
        {verticalLines}
      </Svg>
    </View>
  );
};
