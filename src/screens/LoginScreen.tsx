import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GrayEclipseBg,
  UpplinkLogo,
  GoogleIcon,
  AppleIcon,
  EditIcon,
  Graphics2Icon,
  Graphics1,
} from '../assets/svgs';
import { BouncyButton } from '../components/BouncyButton';
import {
  AccountPickerSheet,
  AuthAccount,
  AuthProvider,
} from '../components/AccountPickerSheet';

interface LoginScreenProps {
  onContinue: (accountName: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onContinue }) => {
  const insets = useSafeAreaInsets();
  const [sheetProvider, setSheetProvider] = useState<AuthProvider | null>(null);
  const continueTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (continueTimeout.current) {
        clearTimeout(continueTimeout.current);
      }
    },
    []
  );

  // Decoupled floating animations for organic, alive physics
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Badge 1 levitation
    const float1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -8,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    );

    // Badge 2 levitation (decoupled speed for natural organic feel)
    const float2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 7,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ])
    );

    // Central emblem breathing
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.98,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    );

    float1.start();
    float2.start();
    pulse.start();

    return () => {
      float1.stop();
      float2.stop();
      pulse.stop();
    };
  }, [floatAnim1, floatAnim2, pulseAnim]);

  const handleSelectAccount = (account: AuthAccount) => {
    setSheetProvider(null);
    continueTimeout.current = setTimeout(() => onContinue(account.name), 240);
  };

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 12;
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

  return (
    <View style={[styles.root, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Background Concentric Ring Geometry */}
        <View style={styles.backgroundEclipse}>
          <GrayEclipseBg width={375} height={375} />
        </View>

        {/* Dynamic Holographic Hero Stage */}
        <View style={styles.heroSection}>
          {/* Graphics 1 - Left concentric accent */}
          <View style={styles.graphics1}>
            <Graphics1 width={64} height={64} />
          </View>

          {/* Central UppLink Emblem with Gentle Pulse */}
          <Animated.View
            style={[
              styles.logoWrapper,
              { transform: [{ scale: pulseAnim }] },
            ]}>
            <UpplinkLogo width={178} height={178} />
          </Animated.View>

          {/* Floating Top Right Purple Gradient Badge */}
          <Animated.View
            style={[
              styles.graphics3Container,
              {
                transform: [{ translateY: floatAnim1 }, { rotate: '20.9deg' }],
              },
            ]}>
            <View style={styles.graphics3Outer}>
              <View style={styles.graphics3Inner}>
                <EditIcon width={18} height={18} />
              </View>
            </View>
          </Animated.View>

          {/* Floating Bottom Right Mint/Cyan Diamond Badge */}
          <Animated.View
            style={[
              styles.graphics2Container,
              {
                transform: [{ translateY: floatAnim2 }, { rotate: '45deg' }],
              },
            ]}>
            <View style={styles.graphics2Outer}>
              <View style={styles.graphics2Inner}>
                <Graphics2Icon width={18} height={12} />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Title and Tagline */}
        <View style={styles.titleSection}>
          <Text style={styles.brandTitle}>UppLink</Text>
          <Text style={styles.description}>
            Take notes, reminders, set targets,{'\n'}collect resources, and secure privacy
          </Text>
        </View>

        {/* Tactile Login Action Buttons */}
        <View style={styles.buttonSection}>
          <BouncyButton
            style={styles.googleButton}
            activeScale={0.96}
            onPress={() => setSheetProvider('google')}>
            <View style={styles.iconCircle}>
              <GoogleIcon width={20} height={20} />
            </View>
            <Text style={styles.buttonText}>Login with Google</Text>
          </BouncyButton>

          <BouncyButton
            style={styles.appleButton}
            activeScale={0.96}
            onPress={() => setSheetProvider('apple')}>
            <View style={styles.iconCircle}>
              <AppleIcon width={20} height={20} />
            </View>
            <Text style={styles.buttonText}>Login with Apple</Text>
          </BouncyButton>
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

      <AccountPickerSheet
        visible={sheetProvider !== null}
        provider={sheetProvider ?? 'google'}
        onClose={() => setSheetProvider(null)}
        onSelectAccount={handleSelectAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  backgroundEclipse: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    opacity: 0.9,
    zIndex: 0,
  },
  heroSection: {
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  logoWrapper: {
    width: 178,
    height: 178,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02D1FE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
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
  },
  graphics3Outer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(115, 103, 240, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics3Inner: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#9B51E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics2Container: {
    position: 'absolute',
    right: 32,
    bottom: 25,
  },
  graphics2Outer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(2, 209, 254, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphics2Inner: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#02D1FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonSection: {
    gap: 12,
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.2,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  termsText: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    fontWeight: '600',
    color: '#000000',
  },
  ownerText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#BBBBBB',
    letterSpacing: 1.2,
  },
});
