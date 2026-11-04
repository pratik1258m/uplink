import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { LanguageSelectionScreen } from './src/screens/LanguageSelectionScreen';
import { KnowYouBetterScreen } from './src/screens/KnowYouBetterScreen';
import { AppSelectionScreen } from './src/screens/AppSelectionScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const navigateTo = (index: number) => {
    setCurrentStepIndex(index);
    Animated.spring(translateX, {
      toValue: -index * SCREEN_WIDTH,
      tension: 65,
      friction: 11,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        {/* Continuous Horizontal Sliding Pager */}
        <Animated.View
          style={[
            styles.sliderTrack,
            {
              transform: [{ translateX }],
            },
          ]}>
          {/* Screen 0: Login */}
          <View style={styles.screenSlide}>
            <LoginScreen onContinue={() => navigateTo(1)} />
          </View>

          {/* Screen 1: Language Selection */}
          <View style={styles.screenSlide}>
            <LanguageSelectionScreen
              onBack={() => navigateTo(0)}
              onNext={() => navigateTo(2)}
            />
          </View>

          {/* Screen 2: Know You Better */}
          <View style={styles.screenSlide}>
            <KnowYouBetterScreen
              onBack={() => navigateTo(1)}
              onNext={() => navigateTo(3)}
            />
          </View>

          {/* Screen 3: App Selection */}
          <View style={styles.screenSlide}>
            <AppSelectionScreen
              onBack={() => navigateTo(2)}
              onFinish={() => navigateTo(0)}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  sliderTrack: {
    flex: 1,
    flexDirection: 'row',
    width: SCREEN_WIDTH * 4,
  },
  screenSlide: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
});

export default App;
