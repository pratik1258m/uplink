import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { LanguageSelectionScreen } from './src/screens/LanguageSelectionScreen';
import { KnowYouBetterScreen } from './src/screens/KnowYouBetterScreen';
import { AppSelectionScreen } from './src/screens/AppSelectionScreen';

type ScreenStep = 'login' | 'language' | 'know_you' | 'app_selection' | 'success';

function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('login');
  const [onboardingData, setOnboardingData] = useState({
    language: 'English',
    goals: '',
    selectedApps: [] as string[],
  });

  const handleLoginContinue = () => {
    setCurrentStep('language');
  };

  const handleLanguageNext = (selectedLanguage: string) => {
    setOnboardingData((prev) => ({ ...prev, language: selectedLanguage }));
    setCurrentStep('know_you');
  };

  const handleKnowYouNext = (goals: string) => {
    setOnboardingData((prev) => ({ ...prev, goals }));
    setCurrentStep('app_selection');
  };

  const handleAppSelectionFinish = (selectedApps: string[]) => {
    setOnboardingData((prev) => ({ ...prev, selectedApps }));
    setCurrentStep('success');
  };

  const handleRestart = () => {
    setCurrentStep('login');
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 'login':
        return <LoginScreen onContinue={handleLoginContinue} />;
      case 'language':
        return (
          <LanguageSelectionScreen
            onBack={() => setCurrentStep('login')}
            onNext={handleLanguageNext}
          />
        );
      case 'know_you':
        return (
          <KnowYouBetterScreen
            onBack={() => setCurrentStep('language')}
            onNext={handleKnowYouNext}
          />
        );
      case 'app_selection':
        return (
          <AppSelectionScreen
            onBack={() => setCurrentStep('know_you')}
            onFinish={handleAppSelectionFinish}
          />
        );
      case 'success':
        return (
          <SafeAreaView style={styles.successContainer}>
            <View style={styles.successCard}>
              <Text style={styles.successEmoji}>🎉</Text>
              <Text style={styles.successTitle}>Setup Complete!</Text>
              <Text style={styles.successSubtitle}>
                Your UppLink workspace is ready with your personalized settings:
              </Text>

              <View style={styles.summaryList}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Selected Language:</Text>
                  <Text style={styles.summaryValue}>
                    {onboardingData.language}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Goals / Focus:</Text>
                  <Text style={styles.summaryValue}>
                    {onboardingData.goals || 'General productivity & notes'}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Connected Apps:</Text>
                  <Text style={styles.summaryValue}>
                    {onboardingData.selectedApps.length > 0
                      ? onboardingData.selectedApps.join(', ')
                      : 'None selected'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.restartButton}
                activeOpacity={0.85}
                onPress={handleRestart}>
                <Text style={styles.restartButtonText}>Restart Onboarding</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        {/* Step indicator bar */}
        {currentStep !== 'success' && (
          <View style={styles.stepBar}>
            {(['login', 'language', 'know_you', 'app_selection'] as ScreenStep[]).map(
              (step, idx) => {
                const steps: ScreenStep[] = [
                  'login',
                  'language',
                  'know_you',
                  'app_selection',
                ];
                const currentIndex = steps.indexOf(currentStep);
                const isPassed = idx <= currentIndex;
                return (
                  <TouchableOpacity
                    key={step}
                    style={[
                      styles.stepSegment,
                      isPassed && styles.stepSegmentActive,
                    ]}
                    onPress={() => setCurrentStep(step)}
                  />
                );
              }
            )}
          </View>
        )}

        {renderCurrentScreen()}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  stepBar: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  stepSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EBEBEF',
  },
  stepSegmentActive: {
    backgroundColor: '#02A9F4',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCard: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  summaryList: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  summaryValue: {
    flex: 1,
    fontSize: 13,
    color: '#0288D1',
    fontWeight: '600',
    textAlign: 'right',
  },
  restartButton: {
    backgroundColor: '#02A9F4',
    height: 50,
    borderRadius: 14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default App;
