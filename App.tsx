import React, { useState, useRef } from 'react';
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

type ScreenStep = 'login' | 'language' | 'know_you' | 'app_selection';

const STEP_ORDER: ScreenStep[] = ['login', 'language', 'know_you', 'app_selection'];

function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('login');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const transitionToStep = (newStep: ScreenStep, direction: 'forward' | 'backward' = 'forward') => {
    const initialSlide = direction === 'forward' ? SCREEN_WIDTH * 0.35 : -SCREEN_WIDTH * 0.35;
    
    // Animate out current
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'forward' ? -SCREEN_WIDTH * 0.15 : SCREEN_WIDTH * 0.15,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Set new screen
      setCurrentStep(newStep);
      slideAnim.setValue(initialSlide);

      // Animate in new screen
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleLoginContinue = () => {
    transitionToStep('language', 'forward');
  };

  const handleLanguageBack = () => {
    transitionToStep('login', 'backward');
  };

  const handleLanguageNext = () => {
    transitionToStep('know_you', 'forward');
  };

  const handleKnowYouBack = () => {
    transitionToStep('language', 'backward');
  };

  const handleKnowYouNext = () => {
    transitionToStep('app_selection', 'forward');
  };

  const handleAppSelectionBack = () => {
    transitionToStep('know_you', 'backward');
  };

  const handleFinish = () => {
    transitionToStep('login', 'forward');
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 'login':
        return <LoginScreen onContinue={handleLoginContinue} />;
      case 'language':
        return (
          <LanguageSelectionScreen
            onBack={handleLanguageBack}
            onNext={handleLanguageNext}
          />
        );
      case 'know_you':
        return (
          <KnowYouBetterScreen
            onBack={handleKnowYouBack}
            onNext={handleKnowYouNext}
          />
        );
      case 'app_selection':
        return (
          <AppSelectionScreen
            onBack={handleAppSelectionBack}
            onFinish={handleFinish}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}>
          {renderCurrentScreen()}
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  animatedContainer: {
    flex: 1,
  },
});

export default App;
