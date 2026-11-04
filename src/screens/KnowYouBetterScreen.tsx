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
import { SphereCenterIcon, SphereAura } from '../assets/svgs';

interface KnowYouBetterScreenProps {
  onBack: () => void;
  onNext: (notes: string) => void;
}

const PROMPT_SUGGESTIONS = [
  'Organize my work resources',
  'Take quick voice notes',
  'Curate articles & links',
  'Set daily productivity targets',
];

export const KnowYouBetterScreen: React.FC<KnowYouBetterScreenProps> = ({
  onBack,
  onNext,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSelectSuggestion = (suggestion: string) => {
    setUserInput(suggestion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Animated AI Sphere Hero */}
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
        <View style={styles.textSection}>
          <Text style={styles.mainHeading}>
            Help me to get to{'\n'}know you better.
          </Text>
          <Text style={styles.subHeading}>
            Tell UppLink what you want to achieve or speak directly to customize
            your AI assistant.
          </Text>
        </View>

        {/* Voice Interaction Mic / Pulse Toggle */}
        <TouchableOpacity
          style={[
            styles.micContainer,
            isListening && styles.micContainerListening,
          ]}
          activeOpacity={0.8}
          onPress={() => setIsListening(!isListening)}>
          <View style={styles.micCircle}>
            <Text style={styles.micIcon}>{isListening ? '⏹' : '🎙️'}</Text>
          </View>
          <Text style={styles.micStatusText}>
            {isListening
              ? 'Listening to you... (tap to stop)'
              : 'Tap to speak to UppLink AI'}
          </Text>
        </TouchableOpacity>

        {/* Text Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your preferences or main goals..."
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={3}
            value={userInput}
            onChangeText={setUserInput}
          />
        </View>

        {/* Suggestion Chips */}
        <View style={styles.suggestionsWrapper}>
          <Text style={styles.suggestionTitle}>Or select a common focus:</Text>
          <View style={styles.chipsContainer}>
            {PROMPT_SUGGESTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  userInput === item && styles.chipSelected,
                ]}
                activeOpacity={0.7}
                onPress={() => handleSelectSuggestion(item)}>
                <Text
                  style={[
                    styles.chipText,
                    userInput === item && styles.chipTextSelected,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.85}
          onPress={() => onNext(userInput)}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  headerPlaceholder: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
    alignItems: 'center',
  },
  sphereContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  auraWrapper: {
    position: 'absolute',
    opacity: 0.65,
  },
  aiSphereImage: {
    width: 220,
    height: 220,
  },
  sphereIconOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  micContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F9FD',
    borderWidth: 1,
    borderColor: '#D0E6FC',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 14,
    gap: 12,
  },
  micContainerListening: {
    backgroundColor: '#FFF1F0',
    borderColor: '#FFA39E',
  },
  micCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  micIcon: {
    fontSize: 18,
  },
  micStatusText: {
    fontSize: 14,
    color: '#0288D1',
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 14,
    marginVertical: 8,
  },
  textInput: {
    fontSize: 15,
    color: '#111111',
    minHeight: 64,
    textAlignVertical: 'top',
  },
  suggestionsWrapper: {
    width: '100%',
    marginTop: 10,
  },
  suggestionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#E1F5FE',
    borderColor: '#0288D1',
  },
  chipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#0288D1',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F7',
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
