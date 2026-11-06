import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BouncyButton } from '../components/BouncyButton';
import { UpplinkLogo } from '../assets/svgs';
import { getStrings, SupportedLanguage } from '../i18n/strings';

type IconName =
  | 'menu'
  | 'mic'
  | 'send'
  | 'link'
  | 'bell'
  | 'target'
  | 'note'
  | 'apps'
  | 'sliders'
  | 'help';

const AiIcon: React.FC<{ name: IconName; size?: number; color?: string }> = ({
  name,
  size = 22,
  color = '#111111',
}) => {
  const strokeProps = {
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'menu' && (
        <>
          <Line x1={4} y1={7} x2={20} y2={7} {...strokeProps} />
          <Line x1={4} y1={12} x2={20} y2={12} {...strokeProps} />
          <Line x1={4} y1={17} x2={14} y2={17} {...strokeProps} />
        </>
      )}
      {name === 'mic' && (
        <>
          <Rect x={9} y={3} width={6} height={11} rx={3} {...strokeProps} />
          <Path d="M5.5 11a6.5 6.5 0 0 0 13 0" {...strokeProps} />
          <Line x1={12} y1={17.5} x2={12} y2={21} {...strokeProps} />
        </>
      )}
      {name === 'send' && (
        <>
          <Path d="M5 12h13" {...strokeProps} />
          <Path d="M12.5 5.5 19 12l-6.5 6.5" {...strokeProps} />
        </>
      )}
      {name === 'link' && (
        <>
          <Path
            d="M10.2 13.8a4.2 4.2 0 0 0 5.9 0l2.4-2.4a4.2 4.2 0 0 0-5.9-5.9l-1.4 1.4"
            {...strokeProps}
          />
          <Path
            d="M13.8 10.2a4.2 4.2 0 0 0-5.9 0l-2.4 2.4a4.2 4.2 0 0 0 5.9 5.9l1.4-1.4"
            {...strokeProps}
          />
        </>
      )}
      {name === 'bell' && (
        <>
          <Path
            d="M18 8.5a6 6 0 1 0-12 0c0 6-2.5 6.5-2.5 8.5h17c0-2-2.5-2.5-2.5-8.5Z"
            {...strokeProps}
          />
          <Path d="M10.2 20.5a2 2 0 0 0 3.6 0" {...strokeProps} />
        </>
      )}
      {name === 'target' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...strokeProps} />
          <Circle cx={12} cy={12} r={4} {...strokeProps} />
          <Circle cx={12} cy={12} r={1.1} fill={color} />
        </>
      )}
      {name === 'note' && (
        <>
          <Rect x={4} y={4} width={16} height={16} rx={4} {...strokeProps} />
          <Line x1={8} y1={9.5} x2={16} y2={9.5} {...strokeProps} />
          <Line x1={8} y1={14} x2={13} y2={14} {...strokeProps} />
        </>
      )}
      {name === 'apps' && (
        <>
          <Rect x={4} y={4} width={6.5} height={6.5} rx={1.8} {...strokeProps} />
          <Rect x={13.5} y={4} width={6.5} height={6.5} rx={1.8} {...strokeProps} />
          <Rect x={4} y={13.5} width={6.5} height={6.5} rx={1.8} {...strokeProps} />
          <Rect x={13.5} y={13.5} width={6.5} height={6.5} rx={1.8} {...strokeProps} />
        </>
      )}
      {name === 'sliders' && (
        <>
          <Line x1={4} y1={7.5} x2={20} y2={7.5} {...strokeProps} />
          <Line x1={4} y1={16.5} x2={20} y2={16.5} {...strokeProps} />
          <Circle cx={9} cy={7.5} r={2.4} {...strokeProps} fill="#FFFFFF" />
          <Circle cx={15} cy={16.5} r={2.4} {...strokeProps} fill="#FFFFFF" />
        </>
      )}
      {name === 'help' && (
        <>
          <Circle cx={12} cy={12} r={8.6} {...strokeProps} />
          <Path d="M9.6 9.4a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.3 1-1.3 2v.3" {...strokeProps} />
          <Circle cx={12} cy={17} r={0.9} fill={color} />
        </>
      )}
    </Svg>
  );
};

interface AiHomeScreenProps {
  language: SupportedLanguage;
}

export const AiHomeScreen: React.FC<AiHomeScreenProps> = ({ language }) => {
  const insets = useSafeAreaInsets();
  const strings = getStrings(language);
  const ai = strings.aiHome;

  const [message, setMessage] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 14;
  const bottomPadding = Math.max(insets.bottom, 16) + 10;
  const hasText = message.trim().length > 0;

  const handleSend = () => {
    if (!hasText) {
      return;
    }
    Keyboard.dismiss();
    setMessage('');
  };

  const menuItems: {
    key: string;
    icon: IconName;
    label: string;
    badge?: string;
  }[] = [
    { key: 'savedLinks', icon: 'link', label: ai.menuItems.savedLinks, badge: '12' },
    { key: 'reminders', icon: 'bell', label: ai.menuItems.reminders },
    { key: 'goals', icon: 'target', label: ai.menuItems.goals },
    { key: 'notes', icon: 'note', label: ai.menuItems.notes },
    { key: 'apps', icon: 'apps', label: ai.menuItems.apps },
    { key: 'settings', icon: 'sliders', label: ai.menuItems.settings },
    { key: 'help', icon: 'help', label: ai.menuItems.help },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" />

      <View style={{ paddingTop: topPadding, flex: 1 }}>
        <View style={styles.header}>
          <BouncyButton
            style={styles.headerButton}
            activeScale={0.9}
            onPress={() => setMenuVisible(true)}>
            <AiIcon name="menu" size={20} />
          </BouncyButton>

          <Text style={styles.brand}>UppLink AI</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>{ai.heading}</Text>

          <View style={styles.savedCard}>
            <View style={styles.savedIcon}>
              <AiIcon name="link" size={20} color="#02D1FE" />
            </View>
            <View style={styles.savedText}>
              <View style={styles.savedCountRow}>
                <Text style={styles.savedCount}>12</Text>
                <Text style={styles.savedLabel}>{ai.savedLinks}</Text>
              </View>
              <Text style={styles.savedSubtitle} numberOfLines={1}>
                {ai.savedLinksSubtitle}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.dock,
            inputFocused && styles.dockFocused,
            { marginBottom: bottomPadding },
          ]}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={ai.askPlaceholder}
            placeholderTextColor="#8A8A8A"
            value={message}
            onChangeText={setMessage}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            autoCorrect={false}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />

          <BouncyButton
            style={styles.micButton}
            activeScale={0.9}
            onPress={() => inputRef.current?.focus()}>
            <AiIcon name="mic" size={20} color="#5C6670" />
          </BouncyButton>

          <BouncyButton
            style={[styles.sendButton, !hasText && styles.sendButtonIdle]}
            activeScale={0.88}
            onPress={handleSend}>
            <AiIcon name="send" size={19} color="#FFFFFF" />
          </BouncyButton>
        </View>
      </View>

      <AiMenuSheet
        visible={menuVisible}
        language={language}
        items={menuItems}
        onClose={() => setMenuVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const AiMenuSheet: React.FC<{
  visible: boolean;
  language: SupportedLanguage;
  items: { key: string; icon: IconName; label: string; badge?: string }[];
  onClose: () => void;
}> = ({ visible, language, items, onClose }) => {
  const insets = useSafeAreaInsets();
  const ai = getStrings(language).aiHome;
  const [mounted, setMounted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      progress.setValue(0);
      Animated.spring(progress, {
        toValue: 1,
        damping: 24,
        stiffness: 190,
        mass: 0.9,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 190,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setMounted(false);
        }
      });
    }
  }, [visible, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [620, 0],
  });
  const backdropOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45],
  });

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.sheetRoot}>
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
          pointerEvents="auto">
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, 16) + 12,
              transform: [{ translateY }],
            },
          ]}>
          <View style={styles.sheetHandle} />

          <View style={styles.sheetHeader}>
            <UpplinkLogo width={30} height={30} />
            <View style={styles.sheetHeaderText}>
              <Text style={styles.sheetTitle}>UppLink AI</Text>
              <Text style={styles.sheetSubtitle}>{ai.menuTitle}</Text>
            </View>
          </View>

          {items.map((item, index) => (
            <View key={item.key}>
              <Pressable
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.menuRowPressed,
                ]}
                onPress={onClose}>
                <View style={styles.menuIcon}>
                  <AiIcon name={item.icon} size={19} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.badge ? (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>{item.badge}</Text>
                  </View>
                ) : null}
                <Text style={styles.menuChevron}>›</Text>
              </Pressable>
              {index < items.length - 1 && <View style={styles.menuDivider} />}
            </View>
          ))}
        </Animated.View>
      </View>
    </Modal>
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
  },
  headerButton: {
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
  brand: {
    fontFamily: Platform.select({
      ios: 'Audiowide',
      android: 'Audiowide-Regular',
      default: 'sans-serif',
    }),
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.3,
  },
  headerPlaceholder: {
    width: 38,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -1.1,
    lineHeight: 40,
  },
  savedCard: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E3F3FA',
    backgroundColor: '#F4FBFE',
  },
  savedIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(2, 209, 254, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  savedText: {
    flex: 1,
  },
  savedCountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  savedCount: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -0.6,
    marginRight: 8,
  },
  savedLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A0A0A',
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  savedSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7680',
  },
  dock: {
    marginHorizontal: 16,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 7,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#E8EDF1',
    backgroundColor: '#F6F8FA',
  },
  dockFocused: {
    borderColor: '#BDEBFA',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111111',
    paddingVertical: 0,
    paddingRight: 10,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#02D1FE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02D1FE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  sendButtonIdle: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  sheetRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000000',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 38,
    height: 4.5,
    borderRadius: 3,
    backgroundColor: '#E3E3E3',
    marginBottom: 18,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginBottom: 6,
  },
  sheetHeaderText: {
    marginLeft: 12,
  },
  sheetTitle: {
    fontFamily: Platform.select({
      ios: 'Audiowide',
      android: 'Audiowide-Regular',
      default: 'sans-serif',
    }),
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0.3,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 2,
  },
  menuRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 14,
  },
  menuRowPressed: {
    backgroundColor: '#F6F6F6',
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F5F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.2,
  },
  menuBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(2, 209, 254, 0.12)',
    marginRight: 8,
  },
  menuBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0099C4',
  },
  menuChevron: {
    fontSize: 22,
    fontWeight: '300',
    color: '#B9B9B9',
    marginRight: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginLeft: 58,
  },
});
