import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { LanguageSelectionScreen } from './src/screens/LanguageSelectionScreen';
import { KnowYouBetterScreen } from './src/screens/KnowYouBetterScreen';
import { KnowYouBetterQuestionsScreen } from './src/screens/KnowYouBetterQuestionsScreen';
import { AppSelectionScreen } from './src/screens/AppSelectionScreen';
import { AiHomeScreen } from './src/screens/AiHomeScreen';
import { SupportedLanguage } from './src/i18n/strings';

function App() {
  const { width: screenWidth } = useWindowDimensions();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [language, setLanguage] = useState<SupportedLanguage>('English');
  const translateX = useRef(new Animated.Value(0)).current;

  const navigateTo = (index: number) => {
    setCurrentStepIndex(index);
    Animated.spring(translateX, {
      toValue: -index * screenWidth,
      damping: 18,
      stiffness: 110,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        {/* Continuous Horizontal Sliding Pager with Precision Springs */}
        <Animated.View
          style={[
            styles.sliderTrack,
            {
              width: screenWidth * 6,
              transform: [{ translateX }],
            },
          ]}>
          {/* Screen 0: Login */}
          <View style={[styles.screenSlide, { width: screenWidth }]}>
            <LoginScreen onContinue={() => navigateTo(1)} />
          </View>

          {/* Screen 1: Language Selection */}
          <View style={[styles.screenSlide, { width: screenWidth }]}>
            <LanguageSelectionScreen
              onBack={() => navigateTo(0)}
              onNext={(selectedLanguage) => {
                setLanguage(selectedLanguage);
                navigateTo(2);
              }}
            />
          </View>

          {/* Screen 2: Know You Better */}
          <View style={[styles.screenSlide, { width: screenWidth }]}>
            <KnowYouBetterScreen
              language={language}
              onBack={() => navigateTo(1)}
              onNext={() => navigateTo(3)}
            />
          </View>

          {/* Screen 3: Know You Better Questions */}
          <View style={[styles.screenSlide, { width: screenWidth }]}>
            <KnowYouBetterQuestionsScreen
              language={language}
              onBack={() => navigateTo(2)}
              onNext={() => navigateTo(4)}
            />
          </View>

          {/* Screen 4: App Selection */}
          <View style={[styles.screenSlide, { width: screenWidth }]}>
            <AppSelectionScreen
              language={language}
              onBack={() => navigateTo(3)}
              onFinish={() => navigateTo(5)}
            />
          </View>

          {/* Screen 5: AI Home */}
          <View style={[styles.screenSlide, { width: screenWidth }]}>
            <AiHomeScreen language={language} />
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
  },
  screenSlide: {
    flex: 1,
  },
});

export default App;
