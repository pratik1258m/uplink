import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GridBackground } from '../components/GridBackground';
import { GlowingSphere } from '../components/GlowingSphere';
import { BouncyButton } from '../components/BouncyButton';

interface KnowYouBetterScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const KnowYouBetterScreen: React.FC<KnowYouBetterScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 18;
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

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

      {/* Main Hero Content */}
      <View style={styles.mainContent}>
        {/* Living Holographic AI Sphere */}
        <View style={styles.sphereSection}>
          <GlowingSphere size={240} />
        </View>

        {/* Clean, Majestic Figma Headline */}
        <View style={styles.titleWrapper}>
          <Text style={styles.mainHeading}>
            Help me to get to{'\n'}know you better.
          </Text>
        </View>
      </View>

      {/* Bottom Action Button */}
      <View style={styles.footer}>
        <BouncyButton
          style={styles.nextButton}
          activeScale={0.96}
          onPress={onNext}>
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
    paddingHorizontal: 24,
  },
  sphereSection: {
    marginBottom: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
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
