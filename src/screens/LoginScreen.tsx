import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  GrayEclipseBg,
  UpplinkLogo,
  GoogleIcon,
  AppleIcon,
  EditIcon,
  Graphics2Icon,
  Graphics1,
} from '../assets/svgs';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onContinue: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onContinue }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Background Radial/Concentric Ring */}
        <View style={styles.backgroundEclipse}>
          <GrayEclipseBg width={375} height={375} />
        </View>

        {/* Top Graphic / Logo Area */}
        <View style={styles.heroSection}>
          {/* Graphics 1 - Left concentric accent */}
          <View style={styles.graphics1}>
            <Graphics1 width={64} height={64} />
          </View>

          {/* Central Upplink Emblem */}
          <View style={styles.logoWrapper}>
            <UpplinkLogo width={178} height={178} />
          </View>

          {/* Graphics 3 - Top Right Purple Gradient Badge */}
          <View style={styles.graphics3Container}>
            <View style={styles.graphics3Outer}>
              <View style={styles.graphics3Inner}>
                <EditIcon width={18} height={18} />
              </View>
            </View>
          </View>

          {/* Graphics 2 - Bottom Right Mint/Cyan Diamond Badge */}
          <View style={styles.graphics2Container}>
            <View style={styles.graphics2Outer}>
              <View style={styles.graphics2Inner}>
                <Graphics2Icon width={18} height={12} />
              </View>
            </View>
          </View>
        </View>

        {/* Title and Tagline */}
        <View style={styles.titleSection}>
          <Text style={styles.brandTitle}>UppLink</Text>
          <Text style={styles.description}>
            Take notes, reminders, set targets,{'\n'}collect resources, and secure privacy
          </Text>
        </View>

        {/* Login Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.googleButton}
            activeOpacity={0.85}
            onPress={onContinue}>
            <View style={styles.iconCircle}>
              <GoogleIcon width={20} height={20} />
            </View>
            <Text style={styles.buttonText}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.appleButton}
            activeOpacity={0.85}
            onPress={onContinue}>
            <View style={styles.iconCircle}>
              <AppleIcon width={20} height={20} />
            </View>
            <Text style={styles.buttonText}>Login with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer / Disclaimers */}
        <View style={styles.footerSection}>
          <Text style={styles.termsText}>
            By signing up you agree to our{' '}
            <Text style={styles.termsLink}>Terms of use</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
          <Text style={styles.ownerText}>OWNED BY KADVA KORP</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  backgroundEclipse: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    opacity: 0.9,
    zIndex: 0,
  },
  heroSection: {
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 1,
  },
  logoWrapper: {
    width: 178,
    height: 178,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics1: {
    position: 'absolute',
    left: 4,
    top: 90,
  },
  graphics3Container: {
    position: 'absolute',
    right: 20,
    top: 15,
    transform: [{ rotate: '20.9deg' }],
  },
  graphics3Outer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(115, 103, 240, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7367F0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  graphics3Inner: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#7367F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics2Container: {
    position: 'absolute',
    right: 28,
    bottom: 30,
    transform: [{ rotate: '45deg' }],
  },
  graphics2Outer: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: 'rgba(57, 225, 205, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#39E1CD',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  graphics2Inner: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#35C1B0',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  titleSection: {
    alignItems: 'center',
    marginVertical: 10,
    zIndex: 1,
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#121212',
    letterSpacing: -0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#484848',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonSection: {
    gap: 14,
    marginTop: 10,
    zIndex: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3AA0FF',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 12,
    shadowColor: '#3AA0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 32,
  },
  footerSection: {
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    zIndex: 1,
  },
  termsText: {
    fontSize: 13,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#111111',
    fontWeight: '600',
  },
  ownerText: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#888888',
    fontWeight: '600',
  },
});
