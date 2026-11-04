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

interface AppSelectionScreenProps {
  onBack: () => void;
  onFinish?: (selectedApps: string[]) => void;
}

interface FigmaAppItem {
  id: string;
  name: string;
  icon: any;
  defaultSelected: boolean;
}

const FIGMA_APPS: FigmaAppItem[] = [
  { id: 'youtube', name: 'YouTube', icon: AppImages.youtube, defaultSelected: true },
  { id: 'chrome', name: 'Chrome', icon: AppImages.chrome, defaultSelected: true },
  { id: 'reddit', name: 'Reddit', icon: AppImages.reddit, defaultSelected: true },
  { id: 'instagram', name: 'Instagram', icon: AppImages.instagram, defaultSelected: true },
  { id: 'snapchat', name: 'Snapchat', icon: AppImages.snapchat, defaultSelected: true },
  { id: 'edge', name: 'Edge', icon: AppImages.edge, defaultSelected: false },
  { id: 'facebook', name: 'facebook', icon: AppImages.facebook, defaultSelected: true },
  { id: 'tiktok', name: 'Tiktok', icon: AppImages.tiktok, defaultSelected: true },
];

const AppRowItem: React.FC<{
  item: FigmaAppItem;
  isSelected: boolean;
  onToggle: () => void;
  showSeparator: boolean;
}> = ({ item, isSelected, onToggle, showSeparator }) => {
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
    <View>
      <BouncyButton
        style={styles.appRow}
        activeScale={0.98}
        onPress={handlePress}>
        <View style={styles.appLeft}>
          <View style={styles.iconContainer}>
            <Image
              source={item.icon}
              style={styles.appIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>{item.name}</Text>
        </View>

        <Animated.View
          style={[styles.radioWrapper, { transform: [{ scale: radioScale }] }]}>
          {isSelected ? (
            <RadioSelected width={22} height={22} />
          ) : (
            <RadioUnselected width={22} height={22} />
          )}
        </Animated.View>
      </BouncyButton>

      {showSeparator && <View style={styles.divider} />}
    </View>
  );
};

export const AppSelectionScreen: React.FC<AppSelectionScreenProps> = ({
  onBack,
  onFinish,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>(
    FIGMA_APPS.filter((a) => a.defaultSelected).map((a) => a.id)
  );

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

        <Text style={styles.headerTitle}>App Selection</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* Modern Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon width={18} height={18} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search "
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
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            {selectedAppIds.length} of {FIGMA_APPS.length} connected
          </Text>
        </View>
      </View>

      {/* App List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filteredApps.map((item, index) => (
          <AppRowItem
            key={item.id}
            item={item}
            isSelected={selectedAppIds.includes(item.id)}
            onToggle={() => toggleApp(item.id)}
            showSeparator={index < filteredApps.length - 1}
          />
        ))}
      </ScrollView>
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
  searchWrapper: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
  },
  searchBar: {
    height: 48,
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ECEEF2',
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
  counterRow: {
    marginTop: 10,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  appLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  appIcon: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111111',
    letterSpacing: -0.3,
  },
  radioWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F2',
    marginLeft: 58,
  },
});
