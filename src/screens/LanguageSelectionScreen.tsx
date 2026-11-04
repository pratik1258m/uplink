import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { AppImages } from '../assets/images';
import { SphereCenterIcon, SphereAura } from '../assets/svgs';

interface LanguageSelectionScreenProps {
  onBack: () => void;
  onNext: (selectedLanguage: string) => void;
}

const AVAILABLE_LANGUAGES = [
  'English',
  'Spanish',
  'Italian',
  'French',
  'Arabic',
  'Chinese',
  'Hindi',
];

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  onBack,
  onNext,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UppLink AI</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Glowing AI Sphere Hero */}
        <View style={styles.sphereContainer}>
          <View style={styles.auraWrapper}>
            <SphereAura width={340} height={340} />
          </View>
          <Image
            source={AppImages.aiSphere}
            style={styles.aiSphereImage}
            resizeMode="contain"
          />
          <View style={styles.sphereIconOverlay}>
            <SphereCenterIcon width={72} height={72} />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.locationNotice}>
            As per your location, the language selected is
          </Text>
          <Text style={styles.currentLanguage}>{selectedLanguage}</Text>
          <Text style={styles.changeNotice}>
            Change it by speaking to the AI in your native language or by
            choosing one from the options below.
          </Text>

          {/* Language Pills Grid */}
          <View style={styles.languageGrid}>
            {AVAILABLE_LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang;
              return (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languagePill,
                    isSelected && styles.languagePillSelected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setSelectedLanguage(lang)}>
                  <Text
                    style={[
                      styles.languagePillText,
                      isSelected && styles.languagePillTextSelected,
                    ]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.85}
          onPress={() => onNext(selectedLanguage)}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 26,
    color: '#111111',
    lineHeight: 28,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  headerPlaceholder: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  sphereContainer: {
    width: 270,
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  auraWrapper: {
    position: 'absolute',
    opacity: 0.65,
  },
  aiSphereImage: {
    width: 240,
    height: 240,
  },
  sphereIconOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  locationNotice: {
    fontSize: 14,
    color: '#444444',
    textAlign: 'center',
    marginBottom: 6,
  },
  currentLanguage: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 10,
  },
  changeNotice: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    maxWidth: 290,
  },
  languagePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FAFAFA',
  },
  languagePillSelected: {
    borderColor: '#0288D1',
    backgroundColor: '#E1F5FE',
  },
  languagePillText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  languagePillTextSelected: {
    color: '#0288D1',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#03A9F4',
    width: 214,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#03A9F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
