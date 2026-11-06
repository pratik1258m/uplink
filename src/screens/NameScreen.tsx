import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GridBackground } from '../components/GridBackground';
import { GlowingSphere } from '../components/GlowingSphere';
import { BouncyButton } from '../components/BouncyButton';
import { EditIcon } from '../assets/svgs';
import { getStrings, SupportedLanguage } from '../i18n/strings';

interface NameScreenProps {
  language: SupportedLanguage;
  initialName: string;
  onBack: () => void;
  onNext: (name: string) => void;
}

export const NameScreen: React.FC<NameScreenProps> = ({
  language,
  initialName,
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();
  const strings = getStrings(language);
  const [name, setName] = useState(initialName);
  const [focused, setFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: focused ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [focused, focusAnim]);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', event =>
      setKeyboardHeight(event.endCoordinates.height)
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardHeight(0)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const trimmedName = name.trim();
  const canContinue = trimmedName.length > 0;
  const initial = trimmedName.charAt(0).toUpperCase();

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 18;
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

  const handleNext = () => {
    if (!canContinue) {
      return;
    }
    Keyboard.dismiss();
    onNext(trimmedName);
  };

  return (
    <View style={styles.root}>
      <View
        style={{
          flex: 1,
          paddingTop: topPadding,
          paddingBottom:
            keyboardHeight > 0 ? keyboardHeight + 20 : bottomPadding,
        }}>
        <StatusBar barStyle="dark-content" />
        <GridBackground />

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

        <View style={styles.mainContent}>
          <Animated.View
            style={[
              styles.sphereSection,
              {
                height: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [248, 0],
                }),
                marginBottom: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 0],
                }),
                opacity: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.85],
                    }),
                  },
                ],
              },
            ]}>
            <GlowingSphere size={150} />
          </Animated.View>

          <Text style={styles.heading}>{strings.nameStep.heading}</Text>
          <Text style={styles.subtitle}>{strings.nameStep.subtitle}</Text>

          <View style={[styles.nameCard, focused && styles.nameCardFocused]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>{initial || '?'}</Text>
            </View>

            <TextInput
              ref={inputRef}
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder={strings.nameStep.placeholder}
              placeholderTextColor="#9AA3AB"
              autoCorrect={false}
              maxLength={40}
              returnKeyType="done"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSubmitEditing={handleNext}
            />

            <BouncyButton
              style={styles.editButton}
              activeScale={0.9}
              onPress={() => inputRef.current?.focus()}>
              <EditIcon width={16} height={16} />
            </BouncyButton>
          </View>
        </View>

        <View style={styles.footer}>
          <BouncyButton
            style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
            activeScale={0.96}
            disabled={!canContinue}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>{strings.next}</Text>
          </BouncyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.2,
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
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -0.9,
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7680',
    textAlign: 'center',
  },
  nameCard: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    paddingLeft: 10,
    paddingRight: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E8EDF1',
    backgroundColor: '#F6F8FA',
  },
  nameCardFocused: {
    borderColor: '#BDEBFA',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(2, 209, 254, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0099C4',
  },
  nameInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#111111',
    paddingVertical: 0,
    letterSpacing: -0.3,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#02B8FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
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
  nextButtonDisabled: {
    opacity: 0.35,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
