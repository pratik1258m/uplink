import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GridBackground } from '../components/GridBackground';
import { GlowingSphere } from '../components/GlowingSphere';
import { BouncyButton } from '../components/BouncyButton';
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '../i18n/strings';

interface LanguageSelectionScreenProps {
  onBack: () => void;
  onNext: (selectedLanguage: SupportedLanguage) => void;
}

const AVAILABLE_LANGUAGES = SUPPORTED_LANGUAGES;

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>('English');
  const titleAnim = useRef(new Animated.Value(1)).current;

  // Safe area metrics accounting for Android camera notches & punch holes
  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 18;
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    if (lang === selectedLanguage) return;
    // Bouncy pop animation for the selected language text
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 0.88,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(titleAnim, {
        toValue: 1,
        tension: 90,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
    setSelectedLanguage(lang);
  };

  return (
    <View style={[styles.root, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <StatusBar barStyle="dark-content" />
      <GridBackground />

      {/* Top Header */}
      <View style={styles.header}>
        <BouncyButton
          style={styles.backButton}
          onPress={onBack}
          activeScale={0.9}>
          <Text style={styles.backArrow}>‹</Text>
        </BouncyButton>

        <Text style={styles.headerTitle}>UppLink AI</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Living, Glowing Holographic AI Sphere */}
        <View style={styles.sphereSection}>
          <GlowingSphere size={215} />
        </View>

        {/* Dynamic Location & Language Text */}
        <View style={styles.contentSection}>
          <Text style={styles.locationNotice}>
            As per your location, the language selected is
          </Text>

          <Animated.Text
            style={[
              styles.currentLanguage,
              { transform: [{ scale: titleAnim }] },
            ]}>
            {selectedLanguage}
          </Animated.Text>

          <Text style={styles.changeNotice}>
            Change it by speaking to the AI in your native language or by
            choosing one from the options below.
          </Text>

          {/* Interactive Language Pills */}
          <View style={styles.languageGrid}>
            {AVAILABLE_LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang;
              return (
                <BouncyButton
                  key={lang}
                  style={[
                    styles.languagePill,
                    isSelected && styles.languagePillSelected,
                  ]}
                  activeScale={0.93}
                  onPress={() => handleSelectLanguage(lang)}>
                  <Text
                    style={[
                      styles.languagePillText,
                      isSelected && styles.languagePillTextSelected,
                    ]}>
                    {lang}
                  </Text>
                </BouncyButton>
              );
            })}
          </View>
        </View>
      </View>

      {/* Floating Bottom Next Button */}
      <View style={styles.footer}>
        <BouncyButton
          style={styles.nextButton}
          activeScale={0.96}
          onPress={() => onNext(selectedLanguage)}>
          <Text style={styles.nextButtonText}>Next</Text>
        </BouncyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  backArrow: {
    fontSize: 26,
    color: '#111111',
    lineHeight: 28,
    marginTop: -2,
    fontWeight: '300',
  },
  headerTitle: {
    fontFamily: Platform.select({
      ios: 'Audiowide',
      android: 'Audiowide-Regular',
      default: 'sans-serif',
    }),
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.3,
  },
  headerPlaceholder: {
    width: 38,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sphereSection: {
    marginVertical: 4,
  },
  contentSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
  },
  locationNotice: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  currentLanguage: {
    fontSize: 38,
    fontWeight: '800',
    color: '#121212',
    letterSpacing: -0.5,
    marginVertical: 2,
  },
  changeNotice: {
    fontSize: 12,
    color: '#444444',
    textAlign: 'center',
    lineHeight: 17,
    maxWidth: 290,
    marginBottom: 16,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 270,
    gap: 10,
  },
  languagePill: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  languagePillSelected: {
    backgroundColor: 'rgba(2, 209, 254, 0.12)',
    borderColor: '#02D1FE',
    borderWidth: 1.5,
  },
  languagePillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    letterSpacing: -0.2,
  },
  languagePillTextSelected: {
    color: '#0288D1',
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  nextButton: {
    width: 214,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#02B8FE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02D1FE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
