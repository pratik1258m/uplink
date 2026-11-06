import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BouncyButton } from '../components/BouncyButton';
import { GlowingSphere } from '../components/GlowingSphere';
import { UpplinkLogo, SphereCenterIcon } from '../assets/svgs';
import { getStrings, SupportedLanguage } from '../i18n/strings';

const FAB_SIZE = 58;
const FAB_EDGE = 12;

type IconName =
  | 'menu'
  | 'mic'
  | 'send'
  | 'link'
  | 'bell'
  | 'target'
  | 'note'
  | 'apps'
  | 'person'
  | 'sliders'
  | 'help'
  | 'plus'
  | 'bookmark'
  | 'video'
  | 'share'
  | 'clip'
  | 'image'
  | 'camera'
  | 'file';

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
      {name === 'person' && (
        <>
          <Circle cx={12} cy={8.5} r={3.6} {...strokeProps} />
          <Path
            d="M4.8 20c0-3.6 3.2-6.2 7.2-6.2s7.2 2.6 7.2 6.2"
            {...strokeProps}
          />
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
      {name === 'clip' && (
        <Path
          d="M20.2 11.4l-7.8 7.8a5 5 0 01-7.1-7.1l8-8a3.4 3.4 0 014.8 4.8l-7.9 7.9a1.8 1.8 0 01-2.5-2.5l7.2-7.2"
          {...strokeProps}
        />
      )}
      {name === 'image' && (
        <>
          <Rect x={3.5} y={4.5} width={17} height={15} rx={3} {...strokeProps} />
          <Circle cx={8.8} cy={9.8} r={1.6} {...strokeProps} />
          <Path
            d="M5.5 17l4.2-4a1.9 1.9 0 012.6 0l2 1.9 1.5-1.4a1.9 1.9 0 012.6 0l1.6 1.5"
            {...strokeProps}
          />
        </>
      )}
      {name === 'camera' && (
        <>
          <Path
            d="M4.6 8.4h2.5l1.3-2.1h7.2l1.3 2.1h2.5a2 2 0 012 2v7.1a2 2 0 01-2 2H4.6a2 2 0 01-2-2v-7.1a2 2 0 012-2z"
            {...strokeProps}
          />
          <Circle cx={12} cy={13.7} r={3.3} {...strokeProps} />
        </>
      )}
      {name === 'file' && (
        <>
          <Path
            d="M13.4 3.5H7.6A1.6 1.6 0 006 5.1v13.8a1.6 1.6 0 001.6 1.6h8.8a1.6 1.6 0 001.6-1.6V8.1l-4.6-4.6z"
            {...strokeProps}
          />
          <Path d="M13.4 3.5V8h4.6" {...strokeProps} />
        </>
      )}
      {name === 'plus' && (
        <>
          <Line x1={12} y1={5} x2={12} y2={19} {...strokeProps} />
          <Line x1={5} y1={12} x2={19} y2={12} {...strokeProps} />
        </>
      )}
      {name === 'bookmark' && (
        <Path
          d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-4.2L6 20V5.5a1 1 0 0 1 1-1Z"
          {...strokeProps}
        />
      )}
      {name === 'video' && (
        <>
          <Rect x={3} y={6} width={12} height={12} rx={3} {...strokeProps} />
          <Path d="m15 10.5 5-3v9l-5-3" {...strokeProps} />
        </>
      )}
      {name === 'share' && (
        <>
          <Circle cx={6} cy={12} r={2.4} {...strokeProps} />
          <Circle cx={18} cy={6} r={2.4} {...strokeProps} />
          <Circle cx={18} cy={18} r={2.4} {...strokeProps} />
          <Line x1={8.2} y1={10.9} x2={15.8} y2={7.1} {...strokeProps} />
          <Line x1={8.2} y1={13.1} x2={15.8} y2={16.9} {...strokeProps} />
        </>
      )}
    </Svg>
  );
};

interface AiHomeScreenProps {
  language: SupportedLanguage;
  userName: string;
}

export const AiHomeScreen: React.FC<AiHomeScreenProps> = ({
  language,
  userName,
}) => {
  const insets = useSafeAreaInsets();
  const strings = getStrings(language);
  const ai = strings.aiHome;

  const [message, setMessage] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [attachVisible, setAttachVisible] = useState(false);
  const [fabEnabled, setFabEnabled] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const fabProgress = useRef(new Animated.Value(0)).current;
  const wave = useRef(new Animated.Value(0)).current;
  const listenProgress = useRef(new Animated.Value(0)).current;
  const orbScale = useRef(new Animated.Value(1)).current;
  const orbCollapse = useRef(new Animated.Value(0)).current;
  const thinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    Animated.timing(orbCollapse, {
      toValue: keyboardHeight > 0 ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [keyboardHeight, orbCollapse]);

  useEffect(() => {
    Animated.spring(fabProgress, {
      toValue: fabOpen ? 1 : 0,
      damping: 18,
      stiffness: 220,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [fabOpen, fabProgress]);

  useEffect(() => {
    Animated.spring(listenProgress, {
      toValue: listening ? 1 : 0,
      damping: 16,
      stiffness: 180,
      useNativeDriver: true,
    }).start();
    Animated.spring(orbScale, {
      toValue: listening ? 1.06 : 1,
      damping: 14,
      stiffness: 160,
      useNativeDriver: true,
    }).start();

    if (!listening) {
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(wave, {
          toValue: 1,
          duration: 520,
          useNativeDriver: true,
        }),
        Animated.timing(wave, {
          toValue: 0,
          duration: 520,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [listening, listenProgress, orbScale, wave]);

  useEffect(
    () => () => {
      if (thinkTimer.current) {
        clearTimeout(thinkTimer.current);
      }
    },
    []
  );

  const toggleListening = () => {
    if (thinkTimer.current) {
      clearTimeout(thinkTimer.current);
      thinkTimer.current = null;
    }
    if (listening) {
      setListening(false);
      setThinking(true);
      thinkTimer.current = setTimeout(() => {
        setThinking(false);
        thinkTimer.current = null;
      }, 1400);
      return;
    }
    setThinking(false);
    setListening(true);
  };

  const barScales = [0.35, 0.6, 0.95, 0.55, 0.8].map(min =>
    wave.interpolate({ inputRange: [0, 1], outputRange: [min, 1] })
  );

  const fabRotation = fabProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  const fabLogoOpacity = fabProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const fabItemsTranslateY = fabProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 14;
  const bottomPadding = Math.max(insets.bottom, 16) + 10;
  const hasText = message.trim().length > 0;

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef(stageSize);
  stageRef.current = stageSize;
  const canvasWidth = stageSize.width || screenWidth;
  const canvasHeight = stageSize.height || screenHeight;
  const fabUserMoved = useRef(false);

  const [fabAnchor, setFabAnchor] = useState({ x: 0, y: 0 });
  const [fabReady, setFabReady] = useState(false);
  const fabPos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const fabPosRef = useRef({ x: 0, y: 0 });
  const fabDragStart = useRef({ x: 0, y: 0 });
  const fabDidDrag = useRef(false);
  const fabScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (canvasWidth <= 0 || canvasHeight <= 0) {
      return;
    }
    const maxX = Math.max(FAB_EDGE, canvasWidth - FAB_SIZE - FAB_EDGE);
    const maxY = Math.max(FAB_EDGE, canvasHeight - FAB_SIZE - FAB_EDGE);
    const clampX = (value: number) => Math.min(Math.max(value, FAB_EDGE), maxX);
    const clampY = (value: number) => Math.min(Math.max(value, FAB_EDGE), maxY);

    const next = fabUserMoved.current
      ? {
          x: clampX(fabPosRef.current.x),
          y: clampY(fabPosRef.current.y),
        }
      : {
          x: clampX(canvasWidth - 20 - FAB_SIZE),
          y: clampY(canvasHeight - bottomPadding - 72 - FAB_SIZE),
        };

    if (next.x !== fabPosRef.current.x || next.y !== fabPosRef.current.y) {
      fabPosRef.current = next;
      fabPos.setValue(next);
      setFabAnchor(next);
    }
    if (!fabReady) {
      setFabReady(true);
    }
  }, [
    canvasWidth,
    canvasHeight,
    bottomPadding,
    fabPos,
    fabReady,
    fabUserMoved,
  ]);

  const fabPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_event, gesture) =>
        Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,
      onPanResponderGrant: () => {
        fabDragStart.current = { ...fabPosRef.current };
        fabDidDrag.current = false;
        Animated.spring(fabScale, {
          toValue: 0.94,
          speed: 45,
          bounciness: 4,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (_event, gesture) => {
        if (Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4) {
          if (!fabDidDrag.current) {
            setFabOpen(false);
          }
          fabDidDrag.current = true;
          fabUserMoved.current = true;
        }
        const { width, height } = stageRef.current;
        const maxX = Math.max(FAB_EDGE, width - FAB_SIZE - FAB_EDGE);
        const maxY = Math.max(FAB_EDGE, height - FAB_SIZE - FAB_EDGE);
        const x = Math.min(
          Math.max(fabDragStart.current.x + gesture.dx, FAB_EDGE),
          maxX
        );
        const y = Math.min(
          Math.max(fabDragStart.current.y + gesture.dy, FAB_EDGE),
          maxY
        );
        fabPosRef.current = { x, y };
        fabPos.setValue({ x, y });
      },
      onPanResponderRelease: () => {
        Animated.spring(fabScale, {
          toValue: 1,
          speed: 40,
          bounciness: 9,
          useNativeDriver: true,
        }).start();
        setFabAnchor({ ...fabPosRef.current });
        if (!fabDidDrag.current) {
          setFabOpen(prev => !prev);
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(fabScale, {
          toValue: 1,
          speed: 40,
          bounciness: 9,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const fabMenuOnRight = fabAnchor.x + FAB_SIZE / 2 > canvasWidth / 2;
  const fabMenuBelow = fabAnchor.y < 360;

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
    { key: 'account', icon: 'person', label: ai.menuItems.account },
    { key: 'settings', icon: 'sliders', label: ai.menuItems.settings },
    { key: 'help', icon: 'help', label: ai.menuItems.help },
  ];

  const attachItems: { key: string; icon: IconName; label: string }[] = [
    { key: 'photos', icon: 'image', label: ai.attach.photos },
    { key: 'camera', icon: 'camera', label: ai.attach.camera },
    { key: 'files', icon: 'file', label: ai.attach.files },
  ];

  const fabActions: { key: string; icon: IconName; label: string }[] = [
    { key: 'quickSave', icon: 'bookmark', label: ai.fab.quickSave },
    { key: 'notes', icon: 'note', label: ai.fab.notes },
    { key: 'audioNote', icon: 'mic', label: ai.fab.audioNote },
    { key: 'videoNote', icon: 'video', label: ai.fab.videoNote },
    { key: 'tools', icon: 'sliders', label: ai.fab.tools },
    { key: 'share', icon: 'share', label: ai.fab.share },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      onLayout={event => {
        const { width, height } = event.nativeEvent.layout;
        setStageSize(prev =>
          prev.width === width && prev.height === height
            ? prev
            : { width, height }
        );
      }}>
      <StatusBar barStyle="dark-content" />

      <View style={{ paddingTop: topPadding, flex: 1 }}>
        <View style={styles.header}>
          <BouncyButton
            style={styles.headerButton}
            activeScale={0.9}
            onPress={() => {
              setFabOpen(false);
              setListening(false);
              setMenuVisible(true);
            }}>
            <AiIcon name="menu" size={20} />
          </BouncyButton>

          <Text style={styles.brand}>UppLink AI</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <View style={styles.content}>
          {userName ? (
            <Text style={styles.greeting} numberOfLines={1}>
              {ai.greeting.replace('{name}', userName)}
            </Text>
          ) : null}

          <Text style={styles.heading}>{ai.heading}</Text>

          <View style={styles.voiceStage}>
            <Animated.View
              style={[
                styles.orbWrap,
                {
                  height: orbCollapse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [248, 0],
                  }),
                  opacity: orbCollapse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ]}>
              <Animated.View style={{ transform: [{ scale: orbScale }] }}>
                <BouncyButton activeScale={0.96} onPress={toggleListening}>
                  <GlowingSphere size={150} />
                </BouncyButton>
              </Animated.View>
            </Animated.View>

            <View style={styles.waveRow}>
              {barScales.map((scale, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.waveBar,
                    {
                      opacity: listenProgress,
                      transform: [{ scaleY: scale }],
                    },
                  ]}
                />
              ))}
            </View>

            <Text style={styles.voiceStatus}>
              {listening
                ? ai.voice.listening
                : thinking
                  ? ai.voice.thinking
                  : ai.voice.tapToSpeak}
            </Text>
            <Text style={styles.voiceHint}>{ai.voice.hint}</Text>
          </View>

          <View style={styles.fabToggleCard}>
            <View style={styles.fabToggleIcon}>
              <UpplinkLogo width={24} height={24} />
            </View>
            <Text style={styles.fabToggleLabel}>{ai.fab.toggleLabel}</Text>
            <Switch
              value={fabEnabled}
              onValueChange={value => {
                setFabEnabled(value);
                if (!value) {
                  setFabOpen(false);
                }
              }}
              trackColor={{ false: '#E5E7EB', true: 'rgba(2, 209, 254, 0.45)' }}
              thumbColor={fabEnabled ? '#02D1FE' : '#FFFFFF'}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        <View
          style={[
            styles.dock,
            inputFocused && styles.dockFocused,
            {
              marginBottom:
                Platform.OS === 'android' && keyboardHeight > 0
                  ? keyboardHeight + 20
                  : bottomPadding,
            },
          ]}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={ai.askPlaceholder}
            placeholderTextColor="#8A8A8A"
            value={message}
            onChangeText={setMessage}
            onFocus={() => {
              setInputFocused(true);
              setListening(false);
              setFabOpen(false);
            }}
            onBlur={() => setInputFocused(false)}
            autoCorrect={false}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />

          <BouncyButton
            style={styles.clipButton}
            activeScale={0.9}
            onPress={() => {
              Keyboard.dismiss();
              setAttachVisible(true);
            }}>
            <AiIcon name="clip" size={20} color="#5C6670" />
          </BouncyButton>

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

      {fabEnabled && fabReady && keyboardHeight === 0 && (
        <>
          {fabOpen && (
            <Pressable
              style={styles.fabBackdrop}
              onPress={() => setFabOpen(false)}
            />
          )}

          {fabOpen && (
            <Animated.View
              style={[
                styles.fabMenu,
                fabMenuBelow
                  ? { top: fabAnchor.y + FAB_SIZE + 2 }
                  : { bottom: canvasHeight - fabAnchor.y + 2 },
                fabMenuOnRight
                  ? {
                      right: canvasWidth - (fabAnchor.x + FAB_SIZE),
                      alignItems: 'flex-end',
                    }
                  : { left: fabAnchor.x, alignItems: 'flex-start' },
                {
                  opacity: fabProgress,
                  transform: [{ translateY: fabItemsTranslateY }],
                },
              ]}>
              {fabActions.map(action => (
                <Pressable
                  key={action.key}
                  style={({ pressed }) => [
                    styles.fabItem,
                    pressed && styles.fabItemPressed,
                  ]}
                  onPress={() => setFabOpen(false)}>
                  <AiIcon name={action.icon} size={18} color="#FFFFFF" />
                  <Text style={styles.fabItemText}>{action.label}</Text>
                </Pressable>
              ))}
            </Animated.View>
          )}

          <Animated.View
            {...fabPanResponder.panHandlers}
            style={[
              styles.fabWrap,
              {
                transform: [
                  { translateX: fabPos.x },
                  { translateY: fabPos.y },
                  { scale: fabScale },
                ],
              },
            ]}>
            <View style={styles.fab}>
              <Animated.View
                style={[styles.fabGlyph, { opacity: fabLogoOpacity }]}>
                <SphereCenterIcon width={24} height={24} />
              </Animated.View>
              <Animated.View
                style={[
                  styles.fabGlyph,
                  {
                    opacity: fabProgress,
                    transform: [{ rotate: fabRotation }],
                  },
                ]}>
                <AiIcon name="plus" size={26} color="#FFFFFF" />
              </Animated.View>
            </View>
          </Animated.View>
        </>
      )}

      <AiMenuSheet
        visible={menuVisible}
        language={language}
        items={menuItems}
        onClose={() => setMenuVisible(false)}
      />

      <AiMenuSheet
        visible={attachVisible}
        language={language}
        subtitle={ai.attach.title}
        items={attachItems}
        onClose={() => setAttachVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const AiMenuSheet: React.FC<{
  visible: boolean;
  language: SupportedLanguage;
  subtitle?: string;
  items: { key: string; icon: IconName; label: string; badge?: string }[];
  onClose: () => void;
}> = ({ visible, language, subtitle, items, onClose }) => {
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
              <Text style={styles.sheetSubtitle}>
                {subtitle ?? ai.menuTitle}
              </Text>
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
    paddingBottom: FAB_SIZE + 14,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0099C4',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -1.1,
    lineHeight: 40,
  },
  voiceStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  orbWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  waveRow: {
    height: 22,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveBar: {
    width: 3.5,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#02D1FE',
    marginHorizontal: 2.5,
  },
  voiceStatus: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.2,
  },
  voiceHint: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A8A8A',
  },
  fabToggleCard: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EDF0F2',
    backgroundColor: '#FFFFFF',
  },
  fabToggleIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F4F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fabToggleLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.2,
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
  clipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  fabBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 15,
  },
  fabWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 58,
    height: 58,
    zIndex: 20,
    elevation: 20,
  },
  fabMenu: {
    position: 'absolute',
    zIndex: 19,
    elevation: 19,
  },
  fabItem: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 23,
    backgroundColor: 'rgba(28, 28, 30, 0.94)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  fabItemPressed: {
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
  },
  fabItemText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#02D1FE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02D1FE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  fabGlyph: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
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
