import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { AppImages } from '../assets/images';
import { RadioSelected, RadioUnselected, SearchIcon } from '../assets/svgs';

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

export const AppSelectionScreen: React.FC<AppSelectionScreenProps> = ({
  onBack,
  onFinish,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>(
    FIGMA_APPS.filter((a) => a.defaultSelected).map((a) => a.id)
  );

  const toggleApp = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredApps = FIGMA_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Selection</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Search Bar matching Figma container */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon width={20} height={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search "
            placeholderTextColor="#7C7C7C"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* App Rows matching Figma layout */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filteredApps.map((item, index) => {
          const isSelected = selectedAppIds.includes(item.id);
          const showSeparator = index < filteredApps.length - 1;

          return (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.appRow}
                activeOpacity={0.75}
                onPress={() => toggleApp(item.id)}>
                <View style={styles.appLeft}>
                  <Image
                    source={item.icon}
                    style={styles.appIcon}
                    resizeMode="cover"
                  />
                  <Text style={styles.appName}>{item.name}</Text>
                </View>

                {/* Exact Figma Radio Button */}
                <View style={styles.radioWrapper}>
                  {isSelected ? (
                    <RadioSelected width={16} height={16} />
                  ) : (
                    <RadioUnselected width={16} height={16} />
                  )}
                </View>
              </TouchableOpacity>

              {showSeparator && <View style={styles.separator} />}
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Home Indicator area / Finish Action */}
      {onFinish && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.finishButton}
            activeOpacity={0.85}
            onPress={() => onFinish(selectedAppIds)}>
            <Text style={styles.finishButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: '#FFFFFF',
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
  searchWrapper: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    height: '100%',
  },
  listContent: {
    paddingHorizontal: 9,
    paddingBottom: 24,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 76,
  },
  appLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 38,
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.3,
  },
  radioWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginLeft: 110,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F7',
  },
  finishButton: {
    backgroundColor: '#03A9F4',
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
