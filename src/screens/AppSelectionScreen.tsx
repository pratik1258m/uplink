import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImages } from '../assets/images';
import { RadioSelected, RadioUnselected, SearchIcon } from '../assets/svgs';
import { BouncyButton } from '../components/BouncyButton';
import {
  formatCount,
  getStrings,
  SupportedLanguage,
} from '../i18n/strings';

interface AppSelectionScreenProps {
  language: SupportedLanguage;
  onBack: () => void;
  onFinish?: (selectedApps: string[]) => void;
}

interface FigmaAppItem {
  id: string;
  name: string;
  icon: any;
}

const FIGMA_APPS: FigmaAppItem[] = [
  { id: 'youtube', name: 'YouTube', icon: AppImages.youtube },
  { id: 'chrome', name: 'Chrome', icon: AppImages.chrome },
  { id: 'reddit', name: 'Reddit', icon: AppImages.reddit },
  { id: 'instagram', name: 'Instagram', icon: AppImages.instagram },
  { id: 'snapchat', name: 'Snapchat', icon: AppImages.snapchat },
  { id: 'edge', name: 'Edge', icon: AppImages.edge },
  { id: 'facebook', name: 'facebook', icon: AppImages.facebook },
  { id: 'tiktok', name: 'Tiktok', icon: AppImages.tiktok },
];

const AppRowItem: React.FC<{
  item: FigmaAppItem;
  isSelected: boolean;
  onToggle: () => void;
}> = ({ item, isSelected, onToggle }) => {
  const radioScale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Pop animation on radio toggle
    Animated.sequence([
      Animated.timing(radioScale, {
        toValue: 0.78,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(radioScale, {
        toValue: 1,
        tension: 100,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
    onToggle();
  };

  return (
    <BouncyButton
      style={[styles.appCard, isSelected && styles.appCardSelected]}
      activeScale={0.97}
      onPress={handlePress}>
      <View
        style={[
          styles.iconContainer,
          isSelected && styles.iconContainerSelected,
        ]}>
        <Image
          source={item.icon}
          style={styles.appIcon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.appName}>{item.name}</Text>

      <Animated.View
        style={[styles.radioWrapper, { transform: [{ scale: radioScale }] }]}>
        {isSelected ? (
          <RadioSelected width={22} height={22} />
        ) : (
          <RadioUnselected width={22} height={22} />
        )}
      </Animated.View>
    </BouncyButton>
  );
};

export const AppSelectionScreen: React.FC<AppSelectionScreenProps> = ({
  language,
  onBack,
  onFinish,
}) => {
  const insets = useSafeAreaInsets();
  const strings = getStrings(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 18;
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

  const toggleApp = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredApps = FIGMA_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.root, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.header}>
        <BouncyButton
          style={styles.backButton}
          onPress={onBack}
          activeScale={0.9}>
          <Text style={styles.backArrow}>‹</Text>
        </BouncyButton>

        <Text style={styles.headerTitle}>{strings.appSelectionTitle}</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* Intro */}
      <View style={styles.intro}>
        <Text style={styles.introHeading}>{strings.appSelectionHeading}</Text>
        <Text style={styles.introSubtitle}>{strings.appSelectionSubtitle}</Text>
      </View>

      {/* Modern Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon width={18} height={18} />
          <TextInput
            style={styles.searchInput}
            placeholder={strings.searchPlaceholder}
            placeholderTextColor="#7C7C7C"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Dynamic Selection Indicator */}
        <View style={styles.counterPill}>
          <View style={styles.counterDot} />
          <Text style={styles.counterText}>
            {formatCount(
              strings.connectedCount,
              selectedAppIds.length,
              FIGMA_APPS.length
            )}
          </Text>
        </View>
      </View>

      {/* App List */}
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filteredApps.map(item => (
          <AppRowItem
            key={item.id}
            item={item}
            isSelected={selectedAppIds.includes(item.id)}
            onToggle={() => toggleApp(item.id)}
          />
        ))}
      </ScrollView>

      {/* Continue to AI Home */}
      <View style={styles.footer}>
        <BouncyButton
          style={styles.nextButton}
          activeScale={0.96}
          onPress={() => onFinish?.(selectedAppIds)}>
          <Text style={styles.nextButtonText}>{strings.next}</Text>
        </BouncyButton>
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
  intro: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  introHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: -0.9,
    lineHeight: 34,
  },
  introSubtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7680',
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 4,
  },
  searchBar: {
    height: 52,
    backgroundColor: '#F6F8FA',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: '#E8EDF1',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111111',
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  counterPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(2, 209, 254, 0.1)',
  },
  counterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#02D1FE',
    marginRight: 8,
  },
  counterText: {
    fontSize: 12,
    color: '#0288D1',
    fontWeight: '700',
  },
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  appCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 16,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDF0F2',
    backgroundColor: '#FFFFFF',
  },
  appCardSelected: {
    borderColor: '#CDEEF9',
    backgroundColor: '#F4FBFE',
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F5F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(2, 209, 254, 0.12)',
  },
  appIcon: {
    width: 34,
    height: 34,
  },
  appName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.3,
  },
  radioWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  nextButton: {
    height: 52,
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
