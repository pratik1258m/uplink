import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import { AppImages } from '../assets/images';
import { RadioSelected } from '../assets/svgs';

interface AppSelectionScreenProps {
  onBack: () => void;
  onFinish: (selectedApps: string[]) => void;
}

interface AppItem {
  id: string;
  name: string;
  category: string;
  icon: any;
}

const APPS_LIST: AppItem[] = [
  {
    id: 'twitter',
    name: 'Twitter (X)',
    category: 'Social & Updates',
    icon: AppImages.twitter,
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'Communities & Discussion',
    icon: AppImages.reddit,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'Messaging & Channels',
    icon: AppImages.telegram,
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    category: 'Web & Bookmarks',
    icon: AppImages.chrome,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Video & Tutorials',
    icon: AppImages.youtube,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Media & Visuals',
    icon: AppImages.instagram,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Social Network',
    icon: AppImages.facebook,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Short Video Clips',
    icon: AppImages.tiktok,
  },
];

export const AppSelectionScreen: React.FC<AppSelectionScreenProps> = ({
  onBack,
  onFinish,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([
    'twitter',
    'reddit',
    'telegram',
  ]);

  const toggleAppSelection = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredApps = APPS_LIST.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Selection</Text>
        <TouchableOpacity
          onPress={() => {
            if (selectedAppIds.length === APPS_LIST.length) {
              setSelectedAppIds([]);
            } else {
              setSelectedAppIds(APPS_LIST.map((a) => a.id));
            }
          }}>
          <Text style={styles.selectAllText}>
            {selectedAppIds.length === APPS_LIST.length ? 'Clear' : 'All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Box */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search apps..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* Apps List */}
      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedAppIds.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.appRow}
              activeOpacity={0.7}
              onPress={() => toggleAppSelection(item.id)}>
              <View style={styles.appInfo}>
                <Image
                  source={item.icon}
                  style={styles.appIcon}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.appName}>{item.name}</Text>
                  <Text style={styles.appCategory}>{item.category}</Text>
                </View>
              </View>

              {/* Radio Button */}
              <View style={styles.radioWrapper}>
                {isSelected ? (
                  <RadioSelected width={22} height={22} />
                ) : (
                  <View style={styles.radioUnselected} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Bottom Finish Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.finishButton}
          activeOpacity={0.85}
          onPress={() => onFinish(selectedAppIds)}>
          <Text style={styles.finishButtonText}>
            Finish Setup ({selectedAppIds.length})
          </Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  selectAllText: {
    fontSize: 14,
    color: '#0288D1',
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111111',
    height: '100%',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  appIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F8F8F8',
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 2,
  },
  appCategory: {
    fontSize: 12,
    color: '#8E8E93',
  },
  radioWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#C7C7CC',
    backgroundColor: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F2',
    marginLeft: 66,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F7',
    backgroundColor: '#FFFFFF',
  },
  finishButton: {
    backgroundColor: '#02A9F4',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02A9F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
