import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { AppImages } from '../assets/images';
import { SphereCenterIcon, SphereAura } from '../assets/svgs';

interface KnowYouBetterScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const KnowYouBetterScreen: React.FC<KnowYouBetterScreenProps> = ({
  onBack,
  onNext,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
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

      <View style={styles.container}>
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

        {/* Heading */}
        <View style={styles.titleWrapper}>
          <Text style={styles.mainHeading}>
            Help me to get to{'\n'}know you better.
          </Text>
        </View>

        {/* Bottom Next Button & Home Indicator */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.85}
            onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.32,
  },
  headerPlaceholder: {
    width: 36,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
  },
  sphereContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  auraWrapper: {
    position: 'absolute',
    opacity: 0.7,
  },
  aiSphereImage: {
    width: 260,
    height: 260,
  },
  sphereIconOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#121212',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -0.3,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
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
    fontSize: 20,
    fontWeight: '700',
  },
});
